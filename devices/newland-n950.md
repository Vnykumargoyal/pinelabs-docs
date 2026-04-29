# `Newland N950`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android · **OS:** Android 10

Reliable Android handheld with all-screen design.

The **Newland N950** is an Android handheld with an all-screen 5.5″ HD+ display, integrated 80 mm/s printer and 1D/2D barcode scanner — well-suited to retail, logistics and field collection workflows.

## Specifications

| Property    | Value             |
| ----------- | ----------------- |
| OEM         | Newland           |
| Model       | N950              |
| Form factor | Handheld          |
| OS          | Android 10        |
| CPU         | Octa-core 1.8 GHz |
| RAM         | 2 GB              |
| Storage     | 16 GB             |
| Display     | 5.5 in HD+ touch  |
| Printer     | Thermal, 80 mm/s  |
| Battery     | 5,000 mAh         |
| Scanner     | 1D/2D barcode     |
| Dimensions  | 180 × 80 × 56 mm  |
| Weight      | 470 g             |

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

- Retail
- Logistics
- Field collections

## Detect at runtime

```kotlin
import android.os.Build

val isNewlandN950 = Build.MODEL == "N950"
```

## See also

- [`Newland N950S`](./newland-n950s.md) — successor with upgraded scanner and CPU
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
