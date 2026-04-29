# `Wiseasy P052`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Smart POS · **Platform:** Android · **OS:** Android 9

Smart POS with sleek all-screen design.

The **Wiseasy P052** is an all-screen Android smart-POS designed for retail, F&B and services merchants. The 5.5″ HD+ display gives it a modern smartphone-like feel while a built-in 58 mm printer keeps receipts fast.

## Specifications

| Property    | Value             |
| ----------- | ----------------- |
| OEM         | Wiseasy           |
| Model       | P052              |
| Form factor | Smart POS         |
| OS          | Android 9         |
| CPU         | Quad-core 1.3 GHz |
| RAM         | 2 GB              |
| Storage     | 8 GB              |
| Display     | 5.5 in HD+ touch  |
| Printer     | Thermal, 58 mm    |
| Battery     | 4,000 mAh         |
| Scanner     | Optional 1D/2D    |
| Dimensions  | 184 × 78 × 55 mm  |
| Weight      | 445 g             |

## Connectivity

- Wi-Fi 802.11 a/b/g/n
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

- Retail
- F&B
- Services

## Detect at runtime

```kotlin
import android.os.Build

val isWiseasyP052 = Build.MODEL == "P052"
```

## See also

- [`Wiseasy P5`](./wiseasy-p5.md) — compact sibling from the same OEM
- [`Wiseasy T2`](./wiseasy-t2.md) — tablet sibling from the same OEM
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
