# `Wiseasy P5`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Smart POS · **Platform:** Android · **OS:** Android 9

Compact Android Smart POS for everyday merchants.

The **Wiseasy P5** is a compact, value-priced Android smart-POS aimed at small retailers and mobile billing scenarios. It packs LTE, Wi-Fi, NFC and a 58 mm printer into a 410 g body.

## Specifications

| Property    | Value             |
| ----------- | ----------------- |
| OEM         | Wiseasy           |
| Model       | P5                |
| Form factor | Smart POS         |
| OS          | Android 9         |
| CPU         | Quad-core 1.3 GHz |
| RAM         | 1 GB              |
| Storage     | 8 GB              |
| Display     | 5 in touch        |
| Printer     | Thermal, 58 mm    |
| Battery     | 3,200 mAh         |
| Scanner     | Optional          |
| Dimensions  | 175 × 76 × 52 mm  |
| Weight      | 410 g             |

## Connectivity

- Wi-Fi
- 4G LTE
- Bluetooth 4.2

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 5.x
- EMV L1 & L2

## Typical use cases

- Small retail
- Mobile billing

## Detect at runtime

```kotlin
import android.os.Build

val isWiseasyP5 = Build.MODEL == "P5"
```

## See also

- [`Wiseasy P052`](./wiseasy-p052.md) — all-screen sibling from the same OEM
- [`Wiseasy T2`](./wiseasy-t2.md) — tablet sibling from the same OEM
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
