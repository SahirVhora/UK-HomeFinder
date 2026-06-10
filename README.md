# UK Home Intelligence Pro

**A unified UK home-buyer intelligence workspace combining property tracking, postcode intelligence, mortgage-rate monitoring, affordability, SDLT, readiness, maps, and buyer-pack export.**

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Live Site](https://img.shields.io/badge/live-GitHub%20Pages-blue)](https://sahirvhora.github.io/UK-HomeFinder/)

This repository is becoming the merged home for the UK property tools:

| Source tool | What moves into UK Home Intelligence Pro |
|---|---|
| [UK-HomeFinder](https://github.com/SahirVhora/UK-HomeFinder) | Buyer dashboard, property tracker, map view, Rightmove parser, SDLT, readiness checklist, buyer-pack export |
| [PropertyPulse-UK](https://github.com/SahirVhora/PropertyPulse-UK) | Deep postcode intelligence, crime/flood/air-quality style area scoring, richer property-market research |
| [uk-postcode-checker](https://github.com/SahirVhora/uk-postcode-checker) | Fast postcode lookup, ONS census demographics, religion, tenure, crime charts, transport overview |
| [uk-mortgage-rate-monitor](https://github.com/SahirVhora/uk-mortgage-rate-monitor) | Mortgage-rate history, lender movement signals, lock/wait decision signal, Telegram-ready monitoring model |

Current modules:

| Module | Link | Status |
|---|---|---|
| Command Centre / buyer tracker | https://sahirvhora.github.io/UK-HomeFinder/ | Existing HomeFinder app |
| Mortgage Watch | https://sahirvhora.github.io/UK-HomeFinder/mortgage-watch.html | First migrated slice from `uk-mortgage-rate-monitor` |
| Merge blueprint | [docs/uk-home-intelligence-pro.md](docs/uk-home-intelligence-pro.md) | Active migration plan |

---

## Product Direction

UK Home Intelligence Pro should answer one practical question:

> Is this home, at this price, in this area, with today's lending market, a good move for me?

The merged app will be organised around the buyer journey rather than the old separate repos:

| Workspace | Purpose |
|---|---|
| **Command Centre** | Readiness score, affordability, mortgage signal, saved properties, next actions |
| **Area Intelligence** | Postcode search with schools, transport, crime, census, tenure, religion, flood/environment signals |
| **Property Tracker** | Add properties, score dimensions, notes, viewing status, offer strategy, map view |
| **Affordability & SDLT** | Budget, deposit, fees, SDLT, monthly-payment sensitivity, mortgage-rate scenarios |
| **Mortgage Watch** | Rate history, lender comparison, lock/wait signal, best-week signal |
| **Buyer Pack** | Export a clean pack for family, broker, solicitor, or decision review |

---

## Current App

The current `index.html` already includes:

- Overview dashboard
- Rightmove parser
- Property tracker
- Budget and SDLT calculator
- Readiness checklist
- Interactive map view
- CSV export
- Buyer-pack export
- Local-first browser storage
- No account or backend requirement

`mortgage-watch.html` now adds the first migrated mortgage-rate module using local committed data in `data/rate_history.csv` and `data/last_rate.json`.

The next consolidation work is tracked in [docs/uk-home-intelligence-pro.md](docs/uk-home-intelligence-pro.md).

---

## Merge Plan

### Phase 1 - Product Spine

- Rename/reposition the repo as UK Home Intelligence Pro.
- Keep `UK-HomeFinder` as the public URL for continuity.
- Add a single module map, shared data model, and migration checklist.
- Avoid duplicating entire old apps inside the page.

### Phase 2 - Area Intelligence Merge

Bring the strongest `uk-postcode-checker` and `PropertyPulse-UK` capabilities into one `Area Intelligence` workspace:

- Location and postcode details from postcodes.io
- Schools and transport from existing HomeFinder intelligence
- Crime charts from Police API
- Census 2021 ethnicity, tenure, and religion summaries
- Flood/environment/property-market signals from PropertyPulse where stable
- One normalised postcode result object saved against properties

### Phase 3 - Mortgage Watch Merge

Bring `uk-mortgage-rate-monitor` into the buyer context:

- Embed committed `rate_history.csv` or a lightweight copied data snapshot
- Show latest best rate and lender movement on the Command Centre
- Add lock/wait decision signal to affordability planning
- Add monthly-payment sensitivity against the buyer's own budget

### Phase 4 - Buyer Decision Engine

Create a single property decision score using:

- Area score
- Property manual score
- Affordability score
- Mortgage timing score
- Readiness score
- Risk flags and missing-data warnings

### Phase 5 - Repo Consolidation

Once the merged app is working:

- Keep old repos live with clear banners pointing to UK Home Intelligence Pro.
- Archive or freeze old tools only after feature parity is confirmed.
- Move reusable code into small modules when the app becomes too large for one file.

---

## Data And Privacy

The app remains local-first by default:

- Saved properties stay in browser `localStorage`.
- No user account is required.
- Public APIs are called directly from the browser where feasible.
- Buyer-pack exports are generated locally.

If a backend is added later, it should be limited to API proxying, scheduled mortgage data refresh, and optional cross-device sync.

---

## APIs Used Or Planned

| API / source | Purpose | Auth |
|---|---|---|
| postcodes.io | Postcode lookup, coordinates, district, region | None |
| DfE / GIAS | Schools by radius | Public |
| Overpass / OpenStreetMap | Transport and local POIs | None / fair use |
| Police Data API | Street-level crime | None |
| ONS / Nomis / Census 2021 | Demographics, tenure, religion | Public |
| Environment Agency | Flood/environment signals | Public |
| Mortgage monitor data | Rate history and lender movement | Local committed data / scheduled job |

---

## Quick Start

```bash
git clone https://github.com/SahirVhora/UK-HomeFinder.git
cd UK-HomeFinder
open index.html
```

No server or build step is required for the current app. Some browser features and API calls behave more reliably through a local static server:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Development Priorities

1. Normalise the shared data model.
2. Add the Area Intelligence tab and migrate the postcode/census cards.
3. Wire Mortgage Watch summary widgets into the Command Centre.
4. Add a robust buyer decision score.
5. Add smoke tests for critical static app flows.
6. Add legacy banners to the old repos once this app has feature parity.

---

## Licence

MIT - see [LICENSE](LICENSE).
