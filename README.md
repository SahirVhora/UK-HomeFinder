# 🏡 UK Home Finder Hub

**Property comparison tracker, SDLT calculator, and readiness checklist for active UK home buyers.**

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Toolkit](https://img.shields.io/badge/part%20of-UK%20Property%20Toolkit-blue)](https://github.com/SahirVhora?tab=repositories&q=uk-property+OR+PropertyPulse+OR+HomeFinder+OR+postcode-checker)

Part of the **[UK Property Toolkit](https://github.com/SahirVhora?tab=repositories&q=uk-property+OR+PropertyPulse+OR+HomeFinder+OR+postcode-checker)** — three free tools for UK home buyers.

| Tool | Purpose | Best For |
|---|---|---|
| [PropertyPulse-UK](https://github.com/SahirVhora/PropertyPulse-UK) | Postcode intelligence + scoring + map | Deep area research |
| **UK-HomeFinder** ← you are here | Property tracking + SDLT + checklist | Active buyers comparing properties |
| [uk-postcode-checker](https://github.com/SahirVhora/uk-postcode-checker) | Quick demographic lookup | Fast postcode overview |

👉 **[Launch UK-HomeFinder](https://sahirvhora.github.io/UK-HomeFinder)**

---

## What It Does

Five tools in one `index.html`:

| Tab | Purpose |
|---|---|
| **Overview** | Dashboard — readiness score, top properties, next actions |
| **Rightmove Parser** | Paste listing URL → extracts postcode → fetches area intelligence |
| **My Properties** | Track, score, and compare listings with notes and offer strategy |
| **Budget & SDLT** | Full purchase cost calculator with FTB SDLT rules (April 2025) |
| **Readiness Checklist** | Stage-by-stage buying checklist from AIP to completion |

---

## Area Intelligence

Fetches three free APIs in parallel when you search a postcode:

### Schools — DfE GIAS API
- All schools within configurable radius (default 2 miles)
- Filter by All / Secondary / Primary
- Direct link to each school's Ofsted inspection report
- Auto-scores the *School Quality* dimension

### Transport — Overpass API (OpenStreetMap)
- Train stations within radius (default 1.5 miles)
- Bus stops within radius (default 0.5 miles), with route references
- Auto-scores the *Transport Links* dimension

### Postcode Lookup — postcodes.io
- Converts postcode to lat/lon, district, and region

All three APIs are free with no API key required.

---

## Property Scoring

Composite score out of 100 across eight dimensions:

| Dimension | Weight | Source |
|---|---|---|
| School quality | ×2 | Auto-filled from area intel |
| Transport links | ×1.5 | Auto-filled from area intel |
| Value for money | ×1.5 | Manual |
| Condition | ×1 | Manual |
| Size & layout | ×1 | Manual |
| Location / commute | ×1 | Manual |
| Garden & parking | ×0.75 | Manual |
| Broadband quality | ×0.5 | [Ofcom checker](https://checker.ofcom.org.uk/) |

---

## SDLT Calculator

Implements **April 2025 First-Time Buyer rules** for England:

| Price band | FTB rate |
|---|---|
| Up to £300,000 | 0% |
| £300,001 – £500,000 | 5% on portion above £300k |
| Above £500,000 | Standard rates apply (FTB relief removed) |

Includes comparison table at key price points and the **£500k cliff** warning.

---

## Quick Start

```bash
git clone https://github.com/SahirVhora/UK-HomeFinder.git
cd UK-HomeFinder
open index.html
```

No server, no build step. Data saved to localStorage — nothing sent to any server.

---

## APIs Used

| API | Provider | Auth |
|---|---|---|
| Postcode lookup | [postcodes.io](https://postcodes.io/) | None |
| Schools by radius | [DfE GIAS](https://get-information-schools.service.gov.uk/) | Public |
| Bus stops & stations | [Overpass API](https://overpass-api.de/) | Fair use |

---

## 🔗 Also in the UK Property Toolkit

- **[PropertyPulse-UK](https://github.com/SahirVhora/PropertyPulse-UK)** — Deep area intelligence: crime trends, flood risk, air quality, schools, composite scoring with interactive map
- **[uk-postcode-checker](https://github.com/SahirVhora/uk-postcode-checker)** — Fast demographics: census charts (ethnicity, religion, tenure), crime stats, schools, transport

---

## Licence

MIT — see [LICENSE](LICENSE)
