# `PAX A99`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Compact handheld for high-throughput retail.

The **PAX A99** is a compact PayDroid handheld optimised for high-throughput retail and restaurants. It pairs an octa-core CPU with an 80 mm/s printer for fast checkouts.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A99                   |
| Form factor | Handheld              |
| OS          | PayDroid (Android 10) |
| CPU         | Octa-core 1.6 GHz     |
| RAM         | 2 GB                  |
| Storage     | 16 GB                 |
| Display     | 5 in HD touch         |
| Printer     | Thermal, 80 mm/s      |
| Battery     | 4,500 mAh             |
| Scanner     | Optional              |
| Dimensions  | 170 × 76 × 55 mm      |
| Weight      | 430 g                 |

## Connectivity

- Wi-Fi
- 4G LTE
- Bluetooth 5.0

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- Retail
- Restaurants
- Mobile cashiering

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA99 = Build.MODEL == "A99"
```

## See also

- [`PAX A920 Pro`](./pax-a920pro.md) — flagship handheld from PAX
- [`PAX A910S`](./pax-a910s.md) — alternative modern handheld from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
