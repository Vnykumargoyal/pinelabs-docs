# `PAX A77`

> **Status:** stable · **Since:** 0.1.0 · **Category:** mPOS · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

mPOS pocket terminal — small, fast, contactless-first.

The **PAX A77** is a pocket-sized PayDroid mPOS designed for mobile attendants, pop-up retail and delivery. At only 220 g, it's ideal for staff that move with customers all day.

## Specifications

| Property    | Value                             |
| ----------- | --------------------------------- |
| OEM         | PAX Technology                    |
| Model       | A77                               |
| Form factor | mPOS                              |
| OS          | PayDroid (Android 10)             |
| CPU         | Quad-core 1.3 GHz                 |
| RAM         | 1 GB                              |
| Storage     | 8 GB                              |
| Display     | 4 in colour touch                 |
| Printer     | None (companion printer optional) |
| Battery     | 2,600 mAh                         |
| Scanner     | Optional                          |
| Dimensions  | 146 × 70 × 18 mm                  |
| Weight      | 220 g                             |

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

- Mobile attendants
- Pop-up retail
- Delivery

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA77 = Build.MODEL == "A77"
```

## See also

- [`PAX A50`](./pax-a50.md) — ultra-portable mPOS sibling
- [`PAX A50D`](./pax-a50d.md) — dual-screen mPOS sibling
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
