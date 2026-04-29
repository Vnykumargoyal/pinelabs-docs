# `doTransaction`

> **Stable** · Since `0.1.0` · Category: `transaction` > **Platform:** Android (AAR) · **Language:** Kotlin / Java · **Min SDK:** 21
> **Artifact:** `pinelabs-sdk-0.1.0.aar`

Dispatch a transaction to the connected Pinelabs terminal via the
Pinelabs MasterApp. The call is **non-blocking from the caller's
perspective** — it returns immediately. The SDK runs the actual
MasterApp IPC on its single-threaded worker (`pinelabs-sdk-worker`) and
delivers lifecycle events through the supplied
[`TransactionListener`](#listener).

In SDK 0.1.0, the only supported `TransactionType` is `Sale`. Refunds,
voids, preauth and capture are out of scope.

> **Pre-condition:** [`init`](./init.md) must have completed
> successfully. Call `doTransaction` only on the handle returned (or
> cached) by `init`.

---

## Signature

### Kotlin

```kotlin
fun PinelabsSdk.doTransaction(
    request: TransactionRequest,
    listener: TransactionListener,
)
```

### Java

```java
void PinelabsSdk.doTransaction(
    TransactionRequest request,
    TransactionListener listener
)
```

Returns `Unit` / `void`. The `eventId` for this attempt is delivered
asynchronously via `TransactionListener.onStarted(eventId)` — see
[Listener contract](#listener).

---

## `TransactionRequest`

```kotlin
data class TransactionRequest(
    val amount: ULong,                    // u64
    val billingRefNo: String,
    val invoiceNo: String,
    val transactionType: TransactionType, // = TransactionType.SALE in 0.1.0
)
```

| Field             | Type              | Required | Description                                                                                                                                                                                                                  |
| ----------------- | ----------------- | :------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount`          | `ULong` (u64)     |    ✓     | Transaction amount in the **smallest currency unit** (paise for INR). `10_000UL` = ₹100.00. Must be `> 0` and fit in `u64`. **Never store amounts as floats**; convert from user input to paise once, at the input boundary. |
| `billingRefNo`    | `String`          |    ✓     | Caller-generated unique reference for **this attempt** (not the order). Recommended pattern: `"BR-${UUID.randomUUID()}"`. **Persist before calling the SDK.** Used to key the app-side pending-attempt store.                |
| `invoiceNo`       | `String`          |    ✓     | Merchant invoice number from the order/invoice system. Printed on the charge slip — must match the merchant's books.                                                                                                         |
| `transactionType` | `TransactionType` |    ✓     | `TransactionType.SALE` — the only value supported in 0.1.0.                                                                                                                                                                  |

### `TransactionType`

```kotlin
enum class TransactionType { SALE }
```

`SALE` is currently the only variant the AAR ships. Future variants
will be added as enum cases; switching on this enum should always have
an explicit `else` branch.

### Validation

The SDK validates the request before any IPC. Validation failures fire
on the listener as `TransactionListener.onFailure(SdkException.InvalidInput)`
**after** `onStarted` (an `eventId` is allocated even for invalid
requests, to give every attempt a stable identity for logging /
reconciliation).

| Failure              | Surfaces as                                       |
| -------------------- | ------------------------------------------------- |
| `amount == 0UL`      | `SdkException.InvalidInput("amount must be > 0")` |
| `billingRefNo` blank | `SdkException.InvalidInput(...)`                  |
| `invoiceNo` blank    | `SdkException.InvalidInput(...)`                  |

---

## <a id="listener"></a>`TransactionListener`

```kotlin
interface TransactionListener {
    fun onStarted(eventId: String)              // always fires first
    fun onSuccess(result: TransactionResult)    // terminal-state
    fun onFailure(error: SdkException)          // terminal-state
}
```

### Callback contract

- **`onStarted(eventId)`** — fires once, **before** any IPC, with the
  SDK-allocated UUIDv4 for this attempt. **Persist the `eventId`
  alongside `billingRefNo` immediately**; it is the only handle the
  app gets for logging / reconciliation. Disable the Pay button here.
- Exactly **one** of `onSuccess` / `onFailure` fires per
  `doTransaction` call. Both are terminal — no further callbacks
  follow.
- All callbacks fire on the SDK's single worker thread
  (`pinelabs-sdk-worker`). **Marshal to the main thread** before
  touching any `View`:
  ```kotlin
  Handler(Looper.getMainLooper()).post { /* update UI */ }
  ```
- **Do not block the callback thread.** No network calls, no
  `Thread.sleep`, no synchronous DB writes longer than a few ms.
  Hand off to your own coroutine scope or executor.

---

## `TransactionResult` (delivered to `onSuccess`)

All fields except `eventId` and `status` are nullable — the terminal /
acquirer may omit any of them.

| Field                 | Type                | Description                                                                                                                                     |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `eventId`             | `String`            | Same UUIDv4 reported in `onStarted`.                                                                                                            |
| `status`              | `TransactionStatus` | `SUCCESS` or `FAILED`. `FAILED` here means the terminal returned a final declined / errored result (still a "result", not a transport failure). |
| `transactionId`       | `String?`           | Acquirer transaction id.                                                                                                                        |
| `rrn`                 | `String?`           | Retrieval Reference Number.                                                                                                                     |
| `authCode`            | `String?`           | Issuer auth code.                                                                                                                               |
| `amount`              | `String?`           | Echoed amount (formatted by terminal).                                                                                                          |
| `maskedPan`           | `String?`           | Card number with PAN masked, e.g. `411111******1111`.                                                                                           |
| `cardHolderName`      | `String?`           | As read from the card.                                                                                                                          |
| `cardType`            | `String?`           | e.g. `VISA`, `MASTERCARD`.                                                                                                                      |
| `acquirer`            | `String?`           | Acquiring bank identifier.                                                                                                                      |
| `merchantId`          | `String?`           | Echoed merchant id from the terminal.                                                                                                           |
| `terminalId`          | `String?`           | Echoed terminal id.                                                                                                                             |
| `invoiceNo`           | `String?`           | Echoed `invoiceNo`.                                                                                                                             |
| `batchNo`             | `String?`           | Acquirer batch number.                                                                                                                          |
| `date`                | `String?`           | Terminal-reported date.                                                                                                                         |
| `time`                | `String?`           | Terminal-reported time.                                                                                                                         |
| `chargeSlipPrintData` | `String?`           | Pre-formatted charge-slip text the app may print / email.                                                                                       |
| `responseCode`        | `String?`           | Acquirer response code (pass through verbatim).                                                                                                 |
| `responseMessage`     | `String?`           | Acquirer response message.                                                                                                                      |

---

## Errors (`SdkException`)

`SdkException` is a sealed hierarchy. Map **every** variant to
user-visible copy — never collapse them into a blanket
`catch (Throwable)`.

| Variant                                           | Recoverable | When                                                                                                                                                                                                          | Suggested user copy                                                             |
| ------------------------------------------------- | :---------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `NotInitialized`                                  |      ✕      | `init` was not called, or `init` failed and the app called `doTransaction` anyway.                                                                                                                            | "Payments unavailable — please restart the app."                                |
| `InvalidInput(detail)`                            |      ✕      | Validation failure on `request` (zero amount, blank ref/invoice).                                                                                                                                             | "Invalid payment details."                                                      |
| `TransportUnavailable(detail)`                    |      ✓      | Could not bind to MasterApp (not installed, `<queries>` missing, or service unreachable).                                                                                                                     | "Cannot reach Pinelabs MasterApp. Please ensure it is installed and activated." |
| `Timeout(detail)`                                 |      ✓      | No reply from MasterApp within `timeoutSecs` (configured at `init`).                                                                                                                                          | "Payment timed out. **Reconcile with the terminal before retrying.**"           |
| `TransactionFailed(detail, terminalResponseCode)` |      ✕      | Terminal returned a non-success result and the SDK surfaced it as an error rather than a `TransactionResult` with status `FAILED`. Surface `terminalResponseCode` verbatim — do **not** auto-retry a decline. | "Payment declined (code: `<terminalResponseCode>`)."                            |
| `Internal(detail)`                                |      ✕      | SDK-side bug.                                                                                                                                                                                                 | "Something went wrong. Contact support with reference `<eventId>`."             |

> The Kotlin type is named `SdkException` because UniFFI maps Rust
> errors to a Java `Exception` subclass. The same variants are exposed
> in the underlying UDL as the `SdkError` enum.

### Recoverable vs unrecoverable

- **Unrecoverable** (`NotInitialized`, `InvalidInput`,
  `TransactionFailed`, `Internal`): do not retry. Fix the bug or
  surface the decline.
- **Recoverable** (`TransportUnavailable`, `Timeout`): the **previous
  charge may or may not have settled**. Do **not** auto-retry. Prompt
  the operator to reconcile with the terminal slip / acquirer report
  first.

> **No idempotency key is honoured by the SDK or acquirer in 0.1.0.**
> Reusing the same `billingRefNo` on retry does **not** make the
> attempt idempotent. Treat every `doTransaction` call as a potential
> new charge.

---

## Concurrency

- **Serialise transactions in your UI.** Disable the Pay button on
  `onStarted` and re-enable on `onSuccess` / `onFailure`. The SDK has a
  single worker thread, so a second `doTransaction` call queues behind
  the first — but UX-wise the user must not be allowed to fire two.
- **No client-side cancellation API in 0.1.0.** Once MasterApp has
  accepted the request you cannot abort it from the app. Wait for the
  terminal callback or for `Timeout`.
- **The SDK does not expose a status-polling API.** A previous
  `checkStatus` design has been **dropped**.

---

## Process death and recovery

MasterApp takes the foreground while the cardholder taps / dips / PINs.
Your app process can be killed at any point between `onStarted` and the
terminal callback. The SDK is **stateless across process restarts** —
it cannot tell you what happened to a transaction it dispatched in a
previous process.

The integrating app **must**:

1. Persist a row keyed by `billingRefNo` _before_ calling
   `doTransaction`, with status `pending`.
2. Persist the `eventId` reported in `onStarted` onto the same row.
3. On `onSuccess` / `onFailure`, transition the row to `completed` /
   `failed` and store any acquirer fields (RRN, authCode, maskedPan,
   responseCode, etc.).
4. On the next app launch, after `init`, mark every still-`pending`
   row as **`unknown`** and surface it to the operator / merchant
   back-office for **manual reconciliation** against the acquirer EOD /
   MIS report.
5. **Never** auto-charge the same logical order while a row is
   `pending` or `unknown` — the original may have settled.

Recommended storage: Room or DataStore with `fsync` semantics. **Do
not** use `SharedPreferences` for money-bearing rows.

---

## Calling pattern (Kotlin)

```kotlin
import com.pinelabs.sdk.PinelabsSdk
import uniffi.pinelabs.TransactionRequest
import uniffi.pinelabs.TransactionListener
import uniffi.pinelabs.TransactionResult
import uniffi.pinelabs.TransactionType
import uniffi.pinelabs.SdkException

class CheckoutViewModel(
    private val sdk: PinelabsSdk,
    private val orderStore: OrderStore,
) {
    fun pay(amountPaise: ULong, invoiceNo: String) {
        val billingRefNo = "BR-${UUID.randomUUID()}"
        orderStore.markPending(billingRefNo, amountPaise, invoiceNo)

        val request = TransactionRequest(
            amount          = amountPaise,
            billingRefNo    = billingRefNo,
            invoiceNo       = invoiceNo,
            transactionType = TransactionType.SALE,
        )

        sdk.doTransaction(request, object : TransactionListener {
            override fun onStarted(eventId: String) {
                orderStore.recordEventId(billingRefNo, eventId)
                onMain { ui.showProcessing() }
            }

            override fun onSuccess(result: TransactionResult) {
                orderStore.markCompleted(billingRefNo, result)
                onMain { ui.showApproved(result) }
            }

            override fun onFailure(error: SdkException) {
                orderStore.markFailed(billingRefNo, error)
                onMain { ui.showError(map(error)) }
            }
        })
    }

    private fun onMain(block: () -> Unit) =
        Handler(Looper.getMainLooper()).post(block)

    private fun map(e: SdkException): String = when (e) {
        is SdkException.NotInitialized       -> "Payments unavailable. Please restart the app."
        is SdkException.InvalidInput         -> "Invalid payment details."
        is SdkException.TransportUnavailable -> "Cannot reach Pinelabs MasterApp."
        is SdkException.Timeout              -> "Payment timed out. Reconcile before retry."
        is SdkException.TransactionFailed    ->
            "Payment declined (code: ${e.terminalResponseCode ?: "—"})."
        is SdkException.Internal             -> "Unexpected error. Contact support."
    }
}
```

## Calling pattern (Java)

```java
String billingRefNo = "BR-" + UUID.randomUUID();
orderStore.markPending(billingRefNo, amountPaise, invoiceNo);

TransactionRequest request = new TransactionRequest(
    amountPaise,        // ULong in Kotlin; pass as long
    billingRefNo,
    invoiceNo,
    TransactionType.SALE
);

sdk.doTransaction(request, new TransactionListener() {
    @Override public void onStarted(String eventId) {
        orderStore.recordEventId(billingRefNo, eventId);
    }
    @Override public void onSuccess(TransactionResult result) {
        orderStore.markCompleted(billingRefNo, result);
    }
    @Override public void onFailure(SdkException error) {
        orderStore.markFailed(billingRefNo, error);
    }
});
```

---

## Common mistakes

- **Treating amounts as floats.** Convert to paise (`ULong`) at the
  input boundary; never store / pass `Double`.
- **Touching the UI from `onStarted` / `onSuccess` / `onFailure`
  directly.** All callbacks fire on `pinelabs-sdk-worker`. Marshal to
  the main thread.
- **Reusing one `billingRefNo` across attempts.** Generate a new one
  per attempt and persist _before_ the SDK call.
- **Auto-retrying on `Timeout` / `TransportUnavailable`.** The original
  attempt may have settled. Always reconcile manually.
- **Auto-retrying on `TransactionFailed`.** That is a decline. Never
  re-charge automatically.
- **Allowing concurrent `doTransaction` from the UI.** Disable the Pay
  button on `onStarted`.
- **Skipping `<queries>` in the manifest.** API 30+ silently fails to
  bind to MasterApp; every transaction reports
  `TransportUnavailable`.
- **Using a single `catch (Throwable)`** instead of mapping each
  `SdkException` variant to user-visible copy.

---

## Pre-release checklist (transaction-side)

- [ ] `init` called exactly once in `Application.onCreate`.
- [ ] Pre-flight checks gate the Pay button (MasterApp installed /
      activated, ABI ok).
- [ ] Amounts handled in paise end-to-end; no floats anywhere.
- [ ] `billingRefNo` generated per attempt and persisted **before**
      `doTransaction`.
- [ ] `eventId` from `onStarted` persisted on the same row.
- [ ] All listener callbacks marshalled to the main thread before
      touching UI.
- [ ] Pay button disabled while a transaction is in flight.
- [ ] Pending-attempt store + reconciliation flow on app launch.
- [ ] Every `SdkException` variant mapped to user-visible copy.
- [ ] Release build smoke-tested on a real terminal.

---

## See also

- [`init`](./init.md) — required before calling `doTransaction`.
