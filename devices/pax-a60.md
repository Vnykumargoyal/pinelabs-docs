# `PAX A60`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Compact · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Compact Android terminal for low-counter footprints.

The **PAX A60** is a compact PayDroid terminal that fits neatly on tight retail counters, pharmacies and service desks while still offering full Wi-Fi, LTE, Bluetooth and Ethernet connectivity.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A60                   |
| Form factor | Compact               |
| OS          | PayDroid (Android 10) |
| CPU         | Quad-core 1.5 GHz     |
| RAM         | 2 GB                  |
| Storage     | 16 GB                 |
| Display     | 4 in HD touch         |
| Printer     | Thermal, 50 mm/s      |
| Battery     | Mains powered         |
| Scanner     | Optional              |
| Dimensions  | 180 × 80 × 70 mm      |
| Weight      | 520 g                 |

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

- Retail counter
- Pharmacy
- Service counters

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA60 = Build.MODEL == "A60"
```

## See also

- [`PAX A80`](./pax-a80.md) — counter-top sibling from PAX
- [`PAX A920`](./pax-a920.md) — popular handheld sibling from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
