# `PAX A950`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 12)

Premium Android handheld with large display and ruggedised build.

The **PAX A950** is a premium ruggedised handheld with a 6″ HD+ display, 6,000 mAh battery and 100 mm/s printer — ideal for outdoor merchants, logistics and hospitality.

## Specifications

| Property    | Value                 |
| ----------- | --------------------- |
| OEM         | PAX Technology        |
| Model       | A950                  |
| Form factor | Handheld              |
| OS          | PayDroid (Android 12) |
| CPU         | Octa-core 2.0 GHz     |
| RAM         | 3 GB                  |
| Storage     | 32 GB                 |
| Display     | 6 in HD+ touch        |
| Printer     | Thermal, 100 mm/s     |
| Battery     | 6,000 mAh             |
| Scanner     | Optional 2D           |
| Dimensions  | 190 × 82 × 58 mm      |
| Weight      | 520 g                 |

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

- Outdoor merchants
- Logistics
- Hospitality

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA950 = Build.MODEL == "A950"
```

## See also

- [`PAX A920 Pro`](./pax-a920pro.md) — flagship 5″ handheld from PAX
- [`PAX A910S`](./pax-a910s.md) — alternative modern handheld from PAX
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
