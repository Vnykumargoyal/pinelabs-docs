# `PAX A920 Pro`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Faster CPU, brighter display — A920's flagship successor.

The **PAX A920 Pro** is the flagship successor to the A920, with a faster octa-core CPU, brighter HD+ display, faster 100 mm/s printer and Bluetooth 5.0 + Wi-Fi 5 connectivity.

## Specifications

| Property    | Value                               |
| ----------- | ----------------------------------- |
| OEM         | PAX Technology                      |
| Model       | A920Pro                             |
| Form factor | Handheld                            |
| OS          | PayDroid (Android 10)               |
| CPU         | Octa-core 2.0 GHz                   |
| RAM         | 2 GB                                |
| Storage     | 16 GB                               |
| Display     | 5 in HD+ capacitive touch           |
| Printer     | Thermal, 100 mm/s                   |
| Battery     | 5,250 mAh                           |
| Scanner     | Optional rear 5 MP camera + barcode |
| Dimensions  | 177 × 78 × 56 mm                    |
| Weight      | 460 g                               |

## Connectivity

- Wi-Fi 5
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

- Mobile sales
- Restaurants
- Field collections

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA920Pro = Build.MODEL == "A920Pro"
```

## See also

- [`PAX A920`](./pax-a920.md) — predecessor to the A920 Pro
- [`PAX A910S`](./pax-a910s.md) — alternative modern handheld from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
