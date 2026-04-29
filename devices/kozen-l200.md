# `Kozen L200`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Counter-top · **Platform:** Android · **OS:** Android 11

Counter-top Android POS with full-size keypad and printer.

The **Kozen L200** is a mains-powered counter-top terminal with a 4″ touchscreen plus customer display, built for retail tills, petrol pumps and quick-service restaurants.

## Specifications

| Property    | Value                                |
| ----------- | ------------------------------------ |
| OEM         | Kozen                                |
| Model       | L200                                 |
| Form factor | Counter-top                          |
| OS          | Android 11                           |
| CPU         | Quad-core 1.4 GHz                    |
| RAM         | 2 GB                                 |
| Storage     | 16 GB                                |
| Display     | 4 in colour touch + customer display |
| Printer     | Thermal, 80 mm/s                     |
| Battery     | Mains powered                        |
| Scanner     | Optional                             |
| Dimensions  | 210 × 85 × 75 mm                     |
| Weight      | 620 g                                |

## Connectivity

- Wi-Fi
- Ethernet
- Bluetooth 4.2
- 4G (optional)

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 5.x
- EMV L1 & L2

## Typical use cases

- Retail tills
- Petrol pumps
- QSR

## Detect at runtime

```kotlin
import android.os.Build

val isKozenL200 = Build.MODEL == "L200"
```

## See also

- [`Kozen P3`](./kozen-p3.md) — handheld sibling from the same OEM
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
