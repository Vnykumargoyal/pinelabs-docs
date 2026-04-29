# `Wiseasy T2`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Tablet POS · **Platform:** Android · **OS:** Android 11

Android tablet POS with rich landscape UI.

The **Wiseasy T2** is an 8″ tablet-form POS that gives merchants a rich landscape UI for menus, orders and payments — ideal for QSR, salons and boutique retail.

## Specifications

| Property    | Value                      |
| ----------- | -------------------------- |
| OEM         | Wiseasy                    |
| Model       | T2                         |
| Form factor | Tablet POS                 |
| OS          | Android 11                 |
| CPU         | Octa-core 2.0 GHz          |
| RAM         | 3 GB                       |
| Storage     | 32 GB                      |
| Display     | 8 in HD+ touch (landscape) |
| Printer     | External (optional)        |
| Battery     | 7,200 mAh                  |
| Scanner     | Optional                   |
| Dimensions  | 232 × 158 × 18 mm          |
| Weight      | 780 g                      |

## Connectivity

- Wi-Fi 5
- Bluetooth 5.0
- 4G LTE

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 6.x
- EMV L1 & L2

## Typical use cases

- Quick-service restaurants
- Salons
- Boutique retail

## Detect at runtime

```kotlin
import android.os.Build

val isWiseasyT2 = Build.MODEL == "T2"
```

## See also

- [`Wiseasy P052`](./wiseasy-p052.md) — all-screen Smart POS from the same OEM
- [`Wiseasy P5`](./wiseasy-p5.md) — compact Smart POS from the same OEM
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
