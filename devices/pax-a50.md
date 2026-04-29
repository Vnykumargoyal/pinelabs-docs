# `PAX A50`

> **Status:** stable · **Since:** 0.1.0 · **Category:** mPOS · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Ultra-portable mPOS for in-aisle and queue-busting.

The **PAX A50** is an ultra-portable PayDroid mPOS, weighing just 180 g. It's perfect for in-aisle checkout, queue-busting and field sales where speed matters more than printing.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A50                   |
| Form factor | mPOS                  |
| OS          | PayDroid (Android 10) |
| CPU         | Quad-core 1.3 GHz     |
| RAM         | 1 GB                  |
| Storage     | 8 GB                  |
| Display     | 3.5 in colour touch   |
| Printer     | None                  |
| Battery     | 2,400 mAh             |
| Scanner     | None                  |
| Dimensions  | 138 × 68 × 17 mm      |
| Weight      | 180 g                 |

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

- Quick payments
- Field sales
- Couriers

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA50 = Build.MODEL == "A50"
```

## See also

- [`PAX A50D`](./pax-a50d.md) — dual-screen variant of the A50
- [`PAX A77`](./pax-a77.md) — larger mPOS sibling from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
