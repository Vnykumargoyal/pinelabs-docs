# `Kozen P3`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android · **OS:** Android 11

Compact handheld Android terminal with built-in printer.

The **Kozen P3** is a lightweight Android handheld designed for merchants on the move. With a 5.5″ HD touchscreen, integrated 58 mm thermal printer and 1D/2D scanner, it's well-suited to mobile billing, field sales and delivery COD collection.

## Specifications

| Property    | Value             |
| ----------- | ----------------- |
| OEM         | Kozen             |
| Model       | P3                |
| Form factor | Handheld          |
| OS          | Android 11        |
| CPU         | Quad-core 1.4 GHz |
| RAM         | 2 GB              |
| Storage     | 16 GB             |
| Display     | 5.5 in HD touch   |
| Printer     | Thermal, 58 mm    |
| Battery     | 5,000 mAh         |
| Scanner     | 1D/2D barcode     |
| Dimensions  | 186 × 80 × 56 mm  |
| Weight      | 480 g             |

## Connectivity

- Wi-Fi 802.11 b/g/n
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

- Mobile billing
- Field sales
- Delivery COD

## Detect at runtime

```kotlin
import android.os.Build

val isKozenP3 = Build.MODEL == "P3"
```

## See also

- [`Kozen L200`](./kozen-l200.md) — counter-top sibling from the same OEM
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
