# `PAX A920`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Handheld · **Platform:** Android (PayDroid) · **OS:** PayDroid (Android 7)

Best-selling Android handheld payment terminal.

The **PAX A920** is one of the world's most widely deployed Android payment handhelds. Its 5″ HD+ touchscreen, built-in 50 mm/s thermal printer and 5,150 mAh battery make it a reliable workhorse for mobile sales, table-side ordering and delivery.

## Specifications

| Property    | Value                     |
| ----------- | ------------------------- |
| OEM         | PAX Technology            |
| Model       | A920                      |
| Form factor | Handheld                  |
| OS          | PayDroid (Android 7)      |
| CPU         | Quad-core 1.1 GHz         |
| RAM         | 1 GB                      |
| Storage     | 8 GB                      |
| Display     | 5 in HD+ capacitive touch |
| Printer     | Thermal, 50 mm/s          |
| Battery     | 5,150 mAh                 |
| Scanner     | Optional rear 5 MP camera |
| Dimensions  | 175 × 77 × 56 mm          |
| Weight      | 450 g                     |

## Connectivity

- Wi-Fi 802.11 a/b/g/n
- 4G LTE
- Bluetooth 4.0

## Card support

- EMV Chip
- Magstripe
- Contactless (NFC)

## Certifications

- PCI PTS 5.x
- EMV L1 & L2
- Mastercard Contactless

## Typical use cases

- Mobile sales
- Restaurants table-side
- Delivery

## Detect at runtime

```kotlin
import android.os.Build

val isPaxA920 = Build.MODEL == "A920"
if (isPaxA920) {
    // Use the A920's 5" portrait layout
}
```

## See also

- [`PAX A920 Pro`](./pax-a920pro.md) — flagship successor to the A920
- [`PAX A910`](./pax-a910.md) — slimmer handheld alternative
- [`init`](../init.md) — initialise the SDK before running a transaction
- [`doTransaction`](../do-transaction.md) — start a payment on this device
- [All devices](../devices.html)
