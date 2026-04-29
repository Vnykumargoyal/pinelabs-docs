# `Ingenico DX8000`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Smart POS · **Platform:** Android · **OS:** Android 10

Premium Android smart-POS for high-traffic retail.

The **Ingenico DX8000** is Ingenico's flagship Android smart-POS, built for high-volume environments such as supermarkets, large-format retail and full-service restaurants. It pairs a 5.5″ HD+ display with a fast thermal printer and full LTE/Wi-Fi connectivity.

## Specifications

| Property    | Value                       |
| ----------- | --------------------------- |
| OEM         | Ingenico                    |
| Model       | DX8000                      |
| Form factor | Smart POS                   |
| OS          | Android 10                  |
| CPU         | Octa-core 1.6 GHz           |
| RAM         | 2 GB                        |
| Storage     | 16 GB                       |
| Display     | 5.5 in HD+ capacitive touch |
| Printer     | Thermal, 80 mm/s            |
| Battery     | 5,250 mAh                   |
| Scanner     | Optional 1D/2D              |
| Dimensions  | 192 × 84 × 64 mm            |
| Weight      | 560 g                       |

## Connectivity

- Wi-Fi 802.11 a/b/g/n/ac
- 4G LTE
- Bluetooth 5.0
- Ethernet (cradle)

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2
- Mastercard Contactless
- Visa payWave

## Typical use cases

- Retail counter
- Restaurants
- Pharmacies

## Detect at runtime

```kotlin
import android.os.Build

val isDx8000 = Build.MODEL == "DX8000"
if (isDx8000) {
    // Tune UI for the DX8000's 5.5" HD+ display
}
```

## See also

- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
