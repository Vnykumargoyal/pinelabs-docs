# Getting Started

Welcome to the Pine Labs Common SDK. This guide walks you through installation, initialization, and your first transaction.

## Installation

Add the SDK dependency for your platform. See the per-language setup guides for details.

### Kotlin (Android)

```kotlin
// build.gradle.kts
dependencies {
    implementation("com.pinelabs:sdk:0.1.0")
}
```

### Swift (iOS)

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/nicepay/pinelabs-sdk-ios", from: "0.1.0")
]
```

### Python

```bash
pip install pinelabs-sdk
```

### Node.js

```bash
npm install @pinelabs/sdk
```

### Java

```xml
<dependency>
    <groupId>com.pinelabs</groupId>
    <artifactId>sdk</artifactId>
    <version>0.1.0</version>
</dependency>
```

### C

```bash
# Download from releases
wget https://github.com/nicepay/pinelabs-sdk-c/releases/download/v0.1.0/libpinelabs.tar.gz
tar -xzf libpinelabs.tar.gz
```

## Quick Start

1. Call `init()` once at app startup.
2. Use `doTransaction()` to send a payment.
3. Use `checkStatus()` to poll results if needed.

### Example (Kotlin)

```kotlin
// 1. Initialize
val sdk = PinelabsSdk.init(SdkConfig(
    transportPreference = listOf(TransportKind.TCP)
))

// 2. Start a transaction
val eventId = sdk.doTransaction(TransactionRequest(
    amount = 10000,
    type = TransactionType.SALE,
    merchantId = "M12345",
    terminalId = "T67890"
))

// 3. Check status
val status = sdk.checkStatus(eventId)
println("Transaction status: $status")
```

## Next Steps

- Learn about [Transports](/pinelabs-docs/concepts/transports) to configure communication channels.
- Read [Error Handling](/pinelabs-docs/concepts/error-handling) to handle failures gracefully.
- Explore the API reference in the sidebar for detailed per-method docs.
