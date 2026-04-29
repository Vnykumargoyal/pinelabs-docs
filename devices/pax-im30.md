# `PAX IM30`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Unattended kiosk · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 7)

Unattended payment module for kiosks and vending.

The **PAX IM30** is an unattended PayDroid payment module designed to be embedded in vending, parking, self-service kiosks and EV chargers. The 5″ vandal-resistant touch screen and Ethernet/Wi-Fi/LTE connectivity make it suitable for indoor and outdoor deployments.

## Specifications

| Property    | Value                                |
| ----------- | ------------------------------------ |
| OEM         | PAX Technology                       |
| Model       | IM30                                 |
| Form factor | Unattended kiosk                     |
| OS          | PayDroid (Android 7)                 |
| CPU         | Quad-core 1.2 GHz                    |
| RAM         | 1 GB                                 |
| Storage     | 8 GB                                 |
| Display     | 5 in colour touch (vandal-resistant) |
| Printer     | External (optional)                  |
| Battery     | Mains powered                        |
| Scanner     | External (optional)                  |
| Dimensions  | 170 × 110 × 75 mm                    |
| Weight      | 850 g                                |

## Connectivity

- Ethernet
- Wi-Fi
- 4G LTE (optional)
- Bluetooth

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 5.x
- EMV L1 & L2

## Typical use cases

- Vending
- Parking
- Self-service kiosks
- EV charging

## Detect at runtime

```kotlin
import android.os.Build

val isPaxIm30 = Build.MODEL == "IM30"
```

## See also

- [`PAX A60`](./pax-a60.md) — compact attended counter-top alternative
- [`PAX A80`](./pax-a80.md) — counter-top attended POS
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
