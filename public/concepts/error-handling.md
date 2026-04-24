# Error Handling

Every SDK method can surface errors through a typed error enum. Each variant carries a `recoverable` flag that tells you whether retrying is meaningful.

## Recoverable vs Non-Recoverable

| Type                  | Meaning                                        | Action                             |
| --------------------- | ---------------------------------------------- | ---------------------------------- |
| **Recoverable** ↻     | Transient issue (timeout, network blip)        | Retry with exponential back-off    |
| **Non-recoverable** ✕ | Permanent issue (invalid config, SDK not init) | Fix the root cause before retrying |

## Error Variants

Common error variants across APIs:

- `NOT_INITIALIZED` — Called an API before `init()`. Non-recoverable.
- `ALREADY_INITIALIZED` — Called `init()` more than once. Non-recoverable.
- `TRANSPORT_UNAVAILABLE` — No transport could connect. Recoverable.
- `TIMEOUT` — Terminal did not respond within the deadline. Recoverable.
- `INVALID_AMOUNT` — Amount ≤ 0 or exceeds max. Non-recoverable (fix input).
- `MISSING_FIELD` — A required parameter was null/empty. Non-recoverable.
- `TERMINAL_BUSY` — Terminal is processing another transaction. Recoverable.

## Handling Errors (Kotlin)

```kotlin
try {
    val eventId = sdk.doTransaction(request)
} catch (e: SdkError) {
    when {
        e.recoverable -> {
            // Retry with back-off
            delay(1000)
            retry()
        }
        else -> {
            // Show user-friendly message, do NOT retry
            showError("Transaction failed: ${e.variant}")
        }
    }
}
```

## Handling Errors (Python)

```python
try:
    event_id = sdk.do_transaction(request)
except SdkError as e:
    if e.recoverable:
        time.sleep(1)
        retry()
    else:
        print(f"Fatal error: {e.variant}")
```

## Best Practices

1. **Always check the `recoverable` flag** before deciding to retry.
2. Use exponential back-off for recoverable errors (start at 1s, cap at 30s).
3. Log the `variant` string for diagnostics — Pine Labs support may ask for it.
4. On non-recoverable errors, surface a user-friendly message and do **not** retry automatically.

## See Also

- [Getting Started](/pinelabs-docs/concepts/getting-started)
- [Transports](/pinelabs-docs/concepts/transports)
