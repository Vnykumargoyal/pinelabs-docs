# `PAX A910S`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 12)

Refreshed A910 with improved battery and connectivity.

The **PAX A910S** refreshes the A910 with PayDroid 12, a faster octa-core CPU, 3 GB RAM, a larger 5.5″ HD+ display, an 80 mm/s printer and Wi-Fi 5 / Bluetooth 5.0 connectivity.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A910S                 |
| Form factor | Handheld              |
| OS          | PayDroid (Android 12) |
| CPU         | Octa-core 2.0 GHz     |
| RAM         | 3 GB                  |
| Storage     | 32 GB                 |
| Display     | 5.5 in HD+ touch      |
| Printer     | Thermal, 80 mm/s      |
| Battery     | 5,300 mAh             |
| Scanner     | Optional 1D/2D        |
| Dimensions  | 180 × 78 × 56 mm      |
| Weight      | 470 g                 |

## Connectivity

- Wi-Fi 5
- 4G LTE
- Bluetooth 5.0
- NFC

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- Modern retail
- QSR
- Field service

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA910S = Build.MODEL == "A910S"
```

## See also

- [`PAX A910`](./pax-a910.md) — predecessor to the A910S
- [`PAX A920 Pro`](./pax-a920pro.md) — alternative modern handheld from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
