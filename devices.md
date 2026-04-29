# `Supported devices`

> **Status:** stable · **Since:** 0.1.0 · **Category:** Reference · **Platform:** Android

The Pine Labs in-store SDK runs on a wide range of Android payment terminals from leading OEMs. This page is the canonical index of every device the SDK officially supports — grouped by OEM, with links to per-device specification pages.

For an interactive, filterable view see [`devices.html`](./devices.html).

## At a glance

| OEM            | Devices |
| -------------- | ------- |
| Ingenico       | 1       |
| Kozen          | 2       |
| Wiseasy        | 3       |
| PAX Technology | 12      |
| Newland        | 2       |
| **Total**      | **21**  |

## Ingenico

| Device          | Form factor | OS         | `Build.MODEL` | Spec sheet                                        |
| --------------- | ----------- | ---------- | ------------- | ------------------------------------------------- |
| Ingenico DX8000 | Smart POS   | Android 10 | `DX8000`      | [`ingenico-dx8000`](./devices/ingenico-dx8000.md) |

## Kozen

| Device     | Form factor | OS         | `Build.MODEL` | Spec sheet                              |
| ---------- | ----------- | ---------- | ------------- | --------------------------------------- |
| Kozen P3   | Handheld    | Android 11 | `P3`          | [`kozen-p3`](./devices/kozen-p3.md)     |
| Kozen L200 | Counter-top | Android 11 | `L200`        | [`kozen-l200`](./devices/kozen-l200.md) |

## Wiseasy

| Device       | Form factor | OS         | `Build.MODEL` | Spec sheet                                  |
| ------------ | ----------- | ---------- | ------------- | ------------------------------------------- |
| Wiseasy P052 | Smart POS   | Android 9  | `P052`        | [`wiseasy-p052`](./devices/wiseasy-p052.md) |
| Wiseasy P5   | Smart POS   | Android 9  | `P5`          | [`wiseasy-p5`](./devices/wiseasy-p5.md)     |
| Wiseasy T2   | Tablet POS  | Android 11 | `T2`          | [`wiseasy-t2`](./devices/wiseasy-t2.md)     |

## PAX Technology

| Device       | Form factor      | OS                    | `Build.MODEL` | Spec sheet                                |
| ------------ | ---------------- | --------------------- | ------------- | ----------------------------------------- |
| PAX A60      | Compact          | PayDroid (Android 10) | `A60`         | [`pax-a60`](./devices/pax-a60.md)         |
| PAX A80      | Counter-top      | PayDroid (Android 10) | `A80`         | [`pax-a80`](./devices/pax-a80.md)         |
| PAX A920     | Handheld         | PayDroid (Android 7)  | `A920`        | [`pax-a920`](./devices/pax-a920.md)       |
| PAX A920 Pro | Handheld         | PayDroid (Android 10) | `A920Pro`     | [`pax-a920pro`](./devices/pax-a920pro.md) |
| PAX A910     | Handheld         | PayDroid (Android 10) | `A910`        | [`pax-a910`](./devices/pax-a910.md)       |
| PAX A910S    | Handheld         | PayDroid (Android 12) | `A910S`       | [`pax-a910s`](./devices/pax-a910s.md)     |
| PAX A950     | Handheld         | PayDroid (Android 12) | `A950`        | [`pax-a950`](./devices/pax-a950.md)       |
| PAX A99      | Handheld         | PayDroid (Android 10) | `A99`         | [`pax-a99`](./devices/pax-a99.md)         |
| PAX A77      | mPOS             | PayDroid (Android 10) | `A77`         | [`pax-a77`](./devices/pax-a77.md)         |
| PAX A50      | mPOS             | PayDroid (Android 10) | `A50`         | [`pax-a50`](./devices/pax-a50.md)         |
| PAX A50D     | mPOS             | PayDroid (Android 10) | `A50D`        | [`pax-a50d`](./devices/pax-a50d.md)       |
| PAX IM30     | Unattended kiosk | PayDroid (Android 7)  | `IM30`        | [`pax-im30`](./devices/pax-im30.md)       |

## Newland

| Device        | Form factor | OS         | `Build.MODEL` | Spec sheet                                    |
| ------------- | ----------- | ---------- | ------------- | --------------------------------------------- |
| Newland N950  | Handheld    | Android 10 | `N950`        | [`newland-n950`](./devices/newland-n950.md)   |
| Newland N950S | Handheld    | Android 12 | `N950S`       | [`newland-n950s`](./devices/newland-n950s.md) |

## By form factor

- **Handheld** — `pax-a920`, `pax-a920pro`, `pax-a910`, `pax-a910s`, `pax-a950`, `pax-a99`, `kozen-p3`, `newland-n950`, `newland-n950s`
- **Smart POS** — `ingenico-dx8000`, `wiseasy-p052`, `wiseasy-p5`
- **Counter-top** — `kozen-l200`, `pax-a80`
- **Compact** — `pax-a60`
- **mPOS** — `pax-a77`, `pax-a50`, `pax-a50d`
- **Tablet POS** — `wiseasy-t2`
- **Unattended kiosk** — `pax-im30`

## Detect the device at runtime

Every device's spec sheet lists its `Build.MODEL` value. Branch on it when you need device-specific behaviour:

```kotlin
import android.os.Build

when (Build.MODEL) {
    "A920", "A920Pro", "A910", "A910S", "A950", "A99" -> usePaxHandheldLayout()
    "A50", "A50D", "A77"                              -> useCompactMposLayout()
    "DX8000", "T2"                                    -> useLargeScreenLayout()
    else                                              -> useDefaultLayout()
}
```

## Capabilities matrix

All 21 supported devices accept the same payment instruments:

- **EMV Chip** ✅
- **Magstripe** ✅
- **Contactless (NFC)** ✅

Printer, scanner, battery and connectivity vary by device — see each device's spec sheet for details.

## See also

- [`init`](./init.md) — initialise the SDK before running a transaction
- [`doTransaction`](./do-transaction.md) — start a payment on any supported device
- [`devices.html`](./devices.html) — interactive grid with filters and photos
- [`devices/data.json`](./devices/data.json) — raw device catalogue
