# `Newland N950S`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android · **OS:** Android 12

Successor to N950 with upgraded scanner and CPU.

The **Newland N950S** succeeds the N950 with Android 12, an octa-core 2.0 GHz CPU, 3 GB RAM and a premium 2D scanner. Wi-Fi 5 and Bluetooth 5.0 round out a strong package for modern retail, warehouses and mobile sales.

## Specifications

| Property    | Value              |
| ----------- | ------------------ |
| OEM         | Newland            |
| Model       | N950S              |
| Form factor | Handheld           |
| OS          | Android 12         |
| CPU         | Octa-core 2.0 GHz  |
| RAM         | 3 GB               |
| Storage     | 32 GB              |
| Display     | 5.5 in HD+ touch   |
| Printer     | Thermal, 80 mm/s   |
| Battery     | 5,200 mAh          |
| Scanner     | Premium 2D scanner |
| Dimensions  | 182 × 80 × 56 mm   |
| Weight      | 475 g              |

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

- Modern retail
- Warehouses
- Mobile sales

## Detect at runtime

```kotlin
import android.os.Build

val isNewlandN950S = Build.MODEL == "N950S"
```

## See also

- [`Newland N950`](./newland-n950.md) — predecessor to the N950S
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
