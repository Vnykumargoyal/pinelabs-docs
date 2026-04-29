# `PAX A910`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 10)

Slim handheld Android payment device.

The **PAX A910** is a slim handheld PayDroid terminal aimed at retail, F&B and mobile billing. It pairs a 5″ HD touchscreen with a 50 mm/s printer and a 5,100 mAh battery for full-day use.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A910                  |
| Form factor | Handheld              |
| OS          | PayDroid (Android 10) |
| CPU         | Quad-core 1.5 GHz     |
| RAM         | 2 GB                  |
| Storage     | 16 GB                 |
| Display     | 5 in HD touch         |
| Printer     | Thermal, 50 mm/s      |
| Battery     | 5,100 mAh             |
| Scanner     | Optional              |
| Dimensions  | 172 × 76 × 55 mm      |
| Weight      | 440 g                 |

## Connectivity

- Wi-Fi
- 4G LTE
- Bluetooth 4.2

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- Retail
- F&B
- Mobile billing

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA910 = Build.MODEL == "A910"
```

## See also

- [`PAX A910S`](./pax-a910s.md) — refreshed successor to the A910
- [`PAX A920`](./pax-a920.md) — popular alternative handheld from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
