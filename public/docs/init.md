# `init`

> **Stable** · Since `0.1.0` · Category: `lifecycle`
> **Platform:** Android (AAR) · **Language:** Kotlin / Java · **Min SDK:** 21
> **Artifact:** `pinelabs-sdk-0.1.0.aar`

Initialise the Pinelabs SDK singleton for the current process. Must be
called exactly once before any other SDK API. Returns a handle that the
app holds for the lifetime of the process and reuses for every
[`doTransaction`](#see-also) call.

`init` performs:

1. Native library load (`libpinelabs_sdk.so` via JNA).
2. Construction of the internal `MasterAppTransport`, which is later
   responsible for `bindService()` against `com.pinelabs.masterapp`.
3. Creation of a single-threaded worker executor
   (`pinelabs-sdk-worker`) on which all listener callbacks fire.

`init` does **not** open a connection to the terminal or to MasterApp —
the bind happens lazily on the first `doTransaction`.

---

## Signature

### Kotlin

```kotlin
fun PinelabsSdk.Companion.init(
    context: Context,
    appId: String,
    userId: String,
    version: String,
    timeoutSecs: Int = 60,
): PinelabsSdk
```

### Java

```java
static PinelabsSdk PinelabsSdk.init(
    Context context,
    String appId,
    String userId,
    String version,
    int timeoutSecs
)
```

`init` is `@Synchronized` and **idempotent**: calling it more than once
in the same process returns the **existing** instance — the supplied
arguments after the first call are ignored. Callers should still treat
"call once from `Application.onCreate`" as the contract.

---

## Parameters

| Name | Type | Required | Default | Description |
|---|---|:---:|---|---|
| `context` | `android.content.Context` | ✓ | — | Any `Context`. The SDK retains only `context.applicationContext`, so passing an `Activity` is safe. Used to bind to MasterApp via `Context.bindService(...)`. |
| `appId` | `String` (non-blank) | ✓ | — | Caller / app identity string agreed with Pinelabs operations before go-live. Sent in the MasterApp request header. **Do not hardcode**; source from build config or remote config. |
| `userId` | `String` (non-blank) | ✓ | — | Operator / cashier / till identifier from the merchant app's login or session layer. Echoed onto the charge slip. |
| `version` | `String` (non-blank) | ✓ | — | Integrating-app version string. Recommended source: `BuildConfig.VERSION_NAME`. Sent in the MasterApp request header for support / diagnostics. |
| `timeoutSecs` | `Int` | ✕ | `60` | Maximum seconds the SDK waits for a final reply from MasterApp on each `doTransaction`. Range `1..600`. |

### Validation (synchronous, throws `IllegalArgumentException`)

- `appId`, `userId`, `version` must each be non-blank.
- `timeoutSecs` must be in `1..600`.

These are caller-input bugs and are **not** wrapped as `SdkException` —
they will surface as `java.lang.IllegalArgumentException` and should be
caught at integration time, not in production.

---

## Returns

| Type | Description |
|---|---|
| `com.pinelabs.sdk.PinelabsSdk` | Process-wide SDK handle. Hold it on your `Application` instance and reuse for every transaction. |

---

## Errors

`init` itself does **not** throw `SdkException`. It can throw:

| Throwable | When |
|---|---|
| `IllegalArgumentException` | Any required string is blank, or `timeoutSecs` is out of range. |
| `UnsatisfiedLinkError` | The JNA `@aar` artifact is missing from the classpath, so `libjnidispatch.so` is not on the device. See [Project setup](#project-setup). |
| `NoClassDefFoundError` | `gson` or `kotlin-stdlib` is missing on the classpath. |

All transport-level failures (MasterApp not installed / not bound /
returned an error) surface later, on `doTransaction`, as
`SdkException.TransportUnavailable` or `SdkException.Timeout`. They
**do not** show up at `init` time.

---

## Project setup

### Drop the AAR in

```
app/libs/pinelabs-sdk-0.1.0.aar
```

### `app/build.gradle`

```gradle
android {
    defaultConfig {
        minSdk 21
        ndk { abiFilters 'arm64-v8a', 'armeabi-v7a' }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    kotlinOptions { jvmTarget = '1.8' }
}

dependencies {
    implementation files('libs/pinelabs-sdk-0.1.0.aar')

    // Required transitive runtime dependencies expected on the classpath:
    implementation 'net.java.dev.jna:jna:5.14.0@aar'   // MUST be @aar — ships per-ABI .so
    implementation 'com.google.code.gson:gson:2.11.0'
    implementation 'org.jetbrains.kotlin:kotlin-stdlib:1.9.24'
}
```

| Dependency | Why | Symptom if missing |
|---|---|---|
| `jna:5.14.0@aar` | Native bridge; the `@aar` variant ships per-ABI `libjnidispatch.so` | `UnsatisfiedLinkError` during `init` |
| `gson` ≥ 2.8 | Internal payload (de)serialisation | `NoClassDefFoundError: com/google/gson/Gson` |
| `kotlin-stdlib` ≥ 1.9 | SDK public API is Kotlin | Build / `NoSuchMethodError` |

### `AndroidManifest.xml` — package visibility (Android 11+)

```xml
<queries>
    <package android:name="com.pinelabs.masterapp" />
    <intent>
        <action android:name="com.pinelabs.masterapp.SERVER" />
    </intent>
</queries>
```

Without the `<queries>` block, `bindService()` to MasterApp silently
fails on API 30+ and every transaction surfaces as
`SdkException.TransportUnavailable`.

The SDK requires **no runtime permissions**. Do **not** declare a
`<service>` for `com.pinelabs.masterapp.SERVER` — your app is a client.

### ProGuard / R8 (release builds)

```pro
-keep class com.pinelabs.sdk.** { *; }
-keep class uniffi.pinelabs.** { *; }
-keep,allowoptimization class uniffi.pinelabs.** { native <methods>; }
-dontwarn com.sun.jna.**
-keep class com.sun.jna.** { *; }
-keep class * implements com.sun.jna.** { *; }
```

---

## Where to call `init`

Call once per process from `Application.onCreate()`. Hold the returned
handle on the `Application` and inject it everywhere else.

```kotlin
class MyApplication : Application() {
    lateinit var pinelabs: PinelabsSdk
        private set

    override fun onCreate() {
        super.onCreate()
        pinelabs = PinelabsSdk.init(
            context     = this,
            appId       = BuildConfig.PINELABS_APP_ID,
            userId      = sessionStore.operatorId(),
            version     = BuildConfig.VERSION_NAME,
            timeoutSecs = 60,
        )
    }
}
```

```xml
<!-- AndroidManifest.xml -->
<application android:name=".MyApplication" ...>
```

### Java

```java
public final class MyApplication extends Application {
    private PinelabsSdk pinelabs;

    @Override public void onCreate() {
        super.onCreate();
        pinelabs = PinelabsSdk.init(
            this,
            BuildConfig.PINELABS_APP_ID,
            sessionStore.operatorId(),
            BuildConfig.VERSION_NAME,
            60
        );
    }

    public PinelabsSdk getPinelabs() { return pinelabs; }
}
```

---

## Threading

`init` itself is fast (a few hundred ms in the worst case — native lib
load is the dominant cost; no IPC happens here). Calling it on the main
thread from `Application.onCreate` is fine for most apps.

If your launch SLA is very tight, run `init` on a background dispatcher
and gate the "Pay" button on completion. Subsequent calls to `init`
return the cached instance instantly.

---

## Pre-flight checks the app should run before enabling pay

These are **not** done by the SDK — they are integrator responsibility.
A failed pre-flight should disable the Pay button and show a guidance
message; do not call `doTransaction` if any of these fail.

```kotlin
val masterAppInstalled = runCatching {
    packageManager.getPackageInfo("com.pinelabs.masterapp", 0)
}.isSuccess

val abiOk = Build.SUPPORTED_ABIS.any {
    it == "arm64-v8a" || it == "armeabi-v7a"
}
```

| Check | User-facing message on failure |
|---|---|
| MasterApp installed | "Please install the Pinelabs MasterApp." |
| MasterApp version ≥ minimum (ask Pinelabs ops) | "Please update Pinelabs MasterApp." |
| Device ABI is `arm64-v8a` / `armeabi-v7a` | "Device unsupported." |
| MasterApp activated / logged in | "Open Pinelabs MasterApp and complete activation." |

---

## Identity values — where they come from

| App-side input | Source |
|---|---|
| `appId` | Agreed with Pinelabs ops before go-live; pinned in `BuildConfig` / remote config. |
| `userId` | App's login / session layer; the operator currently signed in. |
| `version` | `BuildConfig.VERSION_NAME`. |
| `context` | `applicationContext` (passing an `Activity` is safe — only `applicationContext` is retained). |

---

## Common mistakes

- **Calling `init` more than once with different args** — the second
  call's args are silently ignored. Always init from
  `Application.onCreate`.
- **Putting transaction-scoped data on `init`** — `merchantId`,
  `terminalId`, `amount`, `invoiceNo`, `billingRefNo` are *not* `init`
  inputs. They live on each `TransactionRequest`.
- **Forgetting the `<queries>` block** — bind silently fails on API 30+
  and every transaction reports `TransportUnavailable`.
- **Using non-`@aar` JNA** — strips the native `.so` files and crashes
  with `UnsatisfiedLinkError` on first transaction.
- **Hardcoding `appId`** — must be sourced from build config; varies
  per merchant / environment.

---

## Examples

### Kotlin (recommended)

```kotlin
import com.pinelabs.sdk.PinelabsSdk

class MyApplication : Application() {
    lateinit var pinelabs: PinelabsSdk
        private set

    override fun onCreate() {
        super.onCreate()
        pinelabs = PinelabsSdk.init(
            context     = this,
            appId       = BuildConfig.PINELABS_APP_ID,
            userId      = "cashier-42",
            version     = BuildConfig.VERSION_NAME,
            timeoutSecs = 60,
        )
    }
}
```

### Java

```java
PinelabsSdk sdk = PinelabsSdk.init(
    this,
    BuildConfig.PINELABS_APP_ID,
    "cashier-42",
    BuildConfig.VERSION_NAME,
    60
);
```

---

## See also

- [`doTransaction`](./do-transaction.md) — start a transaction once
  `init` has returned.
