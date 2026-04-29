# Pine Labs SDK — Overview

> **Audience:** Merchant-side application developers integrating Pinelabs
> in‑store / billing terminals into their own POS, restaurant, retail
> or unattended-checkout software.

---

## What the SDK is

The **Pine Labs SDK** is a single, language‑idiomatic library that
your application uses to drive a Pinelabs payment terminal. From your
code's point of view, you call:

```text
PineBillingSdk.doTransaction(request, listener)
```

…and the SDK takes care of:

* Choosing the right **transport** for your environment
  (App‑to‑App / Cloud REST / PADController over Bluetooth, USB or
  Serial).
* Serializing the request into the on‑the‑wire format the terminal
  understands (you never see CSV, JSON, framing bytes, etc.).
* Bind / connect / send / wait‑for‑reply / unbind — every
  per‑transport ceremony that previously had to live in your app.
* Surfacing a normalized `TransactionResult` (or a typed `SdkError`)
  back to your UI.

Internally the SDK is written in **Rust** and wrapped with
[UniFFI](https://mozilla.github.io/uniffi-rs/) so that every supported
language sees the same contract — same names (in language idiom),
same validation rules, same error semantics.

---

## Languages and platforms in v1

| Language | Distribution | v1 status |
|---|---|---|
| **Kotlin / Java** (Android) | `pine-billing-sdk-<semver>.aar` (AAR) | **Shipping** — App‑to‑App transport ready. |
| **Swift** (iOS / iPadOS) | `PineBillingSdk-<semver>.xcframework.zip` | **Preview** — full release in Phase 7. |
| **Python ≥ 3.9** (Linux / macOS / Windows) | `pine_billing_sdk-<semver>-*.whl` | **Preview** — full release in Phase 7. |
| **Node.js ≥ 18** (Linux / macOS / Windows) | `@pinelabs/billing-sdk-<semver>.tgz` | **Preview** — full release in Phase 7. |
| **C / C++** (Linux / Windows / embedded) | `pine_billing_sdk-<semver>.tar.gz` (header + shared lib) | **Preview** — full release in Phase 7. |

> **Distribution channel — there is one.** Every artifact above is
> published exclusively on the **Pinelabs Developer Portal**
> (download) and via the Pinelabs **MCP `getSDK` tool**. The SDK is
> **not** published to Maven Central, CocoaPods.org, PyPI, npmjs.com,
> or any private registry. Each artifact ships as a zip containing
> the binary plus a copy of these docs.

---

## Transports in v1

| Transport | Where the terminal lives | Where your code runs |
|---|---|---|
| **App‑to‑App** | Pinelabs Android terminal running MasterApp | Same Android device (e.g. Pinelabs all‑in‑one) |
| **Cloud REST** | Anywhere reachable from the Pinelabs cloud | Any device with HTTPS egress |
| **PADController** | Same device as the host (Bluetooth / USB / Serial) | Any platform supported by PADController |
| **TCP direct** | LAN‑connected terminal | Reachable host on the same LAN |

> **TCP direct is a v1 placeholder.** The wire protocol is greenfield
> and unspecified at the time of writing; calls may raise
> `NotSupported` until the adapter ships in a later 7.x release.
> Use App‑to‑App, Cloud, or PADController in v1.

See [`transports.md`](./transports.md) for when to pick which.

---

## What is *not* in v1

The following items are deliberately out of scope for v1 and will
ship — if at all — in a later phase. **Do not design your integration
around them.**

* **Direct‑from‑SDK Bluetooth scanning / pairing.** Bluetooth
  terminals are reached through PADController only. The SDK does not
  expose a Bluetooth radio API.
* **Direct USB enumeration on platforms other than Android.**
  PADController is the supported path.
* **A typed enum for "Pinelabs cloud allowed‑payment‑mode".** The
  Cloud transport accepts an opaque `allowed_payment_mode` string
  (commonly `"10"`) until the typed mapping is published.
* **Wire‑format APIs.** CSV, JSON, framing — none of these are
  exposed in any binding. They are an internal implementation detail
  per [delta D15](../development_requirements.md). If you need to
  pass a transport‑specific extra, use the typed
  `TransportOptions::*` variants on the request.
* **Maven Central / CocoaPods.org / PyPI / npmjs.com publication.**
  See "Distribution channel" above.

---

## End‑to‑end flow at a glance

```text
   ┌──────────────────────────────┐
   │   Your app  (UI thread)      │
   │                              │
   │   sdk.doTransaction(req,     │
   │      listener)               │ ─── 1. dispatch to worker thread
   └──────────────┬───────────────┘
                  │
   ┌──────────────▼───────────────┐
   │   PineBillingSdk             │   2. validate the request
   │   (Rust core via UniFFI)     │   3. allocate event_id (UUIDv4)
   │                              │   4. fire listener.onStarted(id)
   │                              │   5. route to active transport
   └──────────────┬───────────────┘
                  │
        ┌─────────┴──────────┐
        │  Active transport  │
        │  (one of)          │
        │   • App‑to‑App     │
        │   • Cloud REST     │
        │   • PADController  │
        │   • TCP            │
        └─────────┬──────────┘
                  │ on‑the‑wire (CSV / JSON / framed bytes / HTTPS)
                  │
   ┌──────────────▼───────────────┐
   │   Pinelabs terminal          │   user taps / inserts / swipes
   │                              │   acquirer / cloud round‑trip
   │                              │   approval slip / printer
   └──────────────┬───────────────┘
                  │
   ┌──────────────▼───────────────┐
   │   PineBillingSdk             │   6. parse reply
   │   (Rust core)                │   7. fire listener.onSuccess /
   │                              │      onFailure on a worker thread
   └──────────────────────────────┘
```

The same picture holds for `testPrint`, `cancel`, `checkStatus`,
`discoverTerminals`, `connect`, `disconnect`, `ping`,
`runSelfTest`, `getLogs` and `getTerminalInfo`. Every transport‑touching
method is governed by the
[capability matrix](./capabilities.md).

---

## Where to go next

* New to the SDK? Start with the per‑language **quickstart** under
  [`per-language/<your-lang>/quickstart.md`](../per-language/).
* Designing a real integration? Read the four "load‑bearing"
  concepts in order:
  1. [Lifecycle and threading](./lifecycle.md)
  2. [Transports](./transports.md) and the
     [capability matrix](./capabilities.md)
  3. [`event_id` and reconciliation](./eventid-and-reconciliation.md)
  4. [Error handling](./error-handling.md)
* Curious about the result fields? See
  [`result-payload.md`](./result-payload.md).
* Pinning a version for production? Read
  [`versioning-and-support.md`](./versioning-and-support.md).
