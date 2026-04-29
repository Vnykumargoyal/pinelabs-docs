# `PAX A50D`

> **Status:** stable · **Since:** 0.1.0 · **Category:** mPOS · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Dual-screen mPOS with customer-facing display.

The **PAX A50D** adds a 2.4″ customer-facing display to the A50 form-factor, ideal for tip prompts, customer confirmation and counter-side mPOS where transparency matters.

## Specifications

| Property    | Value                         |
| ----------- | ----------------------------- |
| OEM         | PAX Technology                |
| Model       | A50D                          |
| Form factor | mPOS                          |
| OS          | PayDroid (Android 10)         |
| CPU         | Quad-core 1.3 GHz             |
| RAM         | 1 GB                          |
| Storage     | 8 GB                          |
| Display     | 3.5 in main + 2.4 in customer |
| Printer     | None                          |
| Battery     | 2,500 mAh                     |
| Scanner     | None                          |
| Dimensions  | 140 × 70 × 19 mm              |
| Weight      | 200 g                         |

## Connectivity

- Wi-Fi
- 4G LTE
- Bluetooth 4.2

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- Tip prompts
- Counter mPOS

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA50D = Build.MODEL == "A50D"
```

## See also

- [`PAX A50`](./pax-a50.md) — single-screen variant of the A50D
- [`PAX A77`](./pax-a77.md) — larger mPOS sibling from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
