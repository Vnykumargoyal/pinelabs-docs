# `PAX A80`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Counter-top · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Counter-top Android POS with built-in customer printer.

The **PAX A80** is a mains-powered PayDroid counter-top with a fast 80 mm/s printer, built for high-volume retail tills, QSR counters and hotel front desks.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A80                   |
| Form factor | Counter-top           |
| OS          | PayDroid (Android 10) |
| CPU         | Quad-core 1.5 GHz     |
| RAM         | 2 GB                  |
| Storage     | 16 GB                 |
| Display     | 4 in colour touch     |
| Printer     | Thermal, 80 mm/s      |
| Battery     | Mains powered         |
| Scanner     | Optional              |
| Dimensions  | 200 × 95 × 80 mm      |
| Weight      | 640 g                 |

## Connectivity

- Wi-Fi
- 4G LTE
- Bluetooth 4.2
- Ethernet

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- High-volume retail
- QSR
- Hotels

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA80 = Build.MODEL == "A80"
```

## See also

- [`PAX A60`](./pax-a60.md) — compact sibling from PAX
- [`PAX A920`](./pax-a920.md) — popular handheld sibling from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
