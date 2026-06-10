# UK Home Intelligence Pro Merge Blueprint

This document turns the four separate UK property tools into one product plan and implementation map.

Base repo: `SahirVhora/UK-HomeFinder`

Source repos:

- `SahirVhora/UK-HomeFinder`
- `SahirVhora/PropertyPulse-UK`
- `SahirVhora/uk-postcode-checker`
- `SahirVhora/uk-mortgage-rate-monitor`

## North Star

UK Home Intelligence Pro should help a buyer make a grounded decision:

> Is this specific home, in this area, at this price, with today's mortgage market, a sensible move?

The app should feel like a quiet, practical buying workspace, not a collection of demos.

## Product Modules

### 1. Command Centre

Purpose: show the buyer's current position at a glance.

Inputs:

- Saved properties
- Budget and deposit
- Readiness checklist
- Latest mortgage-rate signal
- Area intelligence completion status

Outputs:

- Overall readiness score
- Current affordability headroom
- Mortgage lock/wait signal
- Top properties by decision score
- Missing actions
- Buyer-pack export

Current source: `UK-HomeFinder` overview.

Upgrade from source tools:

- Add mortgage signal from `uk-mortgage-rate-monitor`.
- Add area-data completeness from `PropertyPulse-UK` and `uk-postcode-checker`.

### 2. Area Intelligence

Purpose: one postcode/search workspace for local evidence.

Inputs:

- Postcode
- Optional property address/listing
- Search radius settings

Outputs:

- Location and ward/district/region
- Schools
- Transport
- Crime
- Census demographics
- Housing tenure
- Religion
- Flood/environment signals
- Area score and risk flags

Current sources:

- `UK-HomeFinder`: schools, transport, postcodes.io, area scoring hooks
- `PropertyPulse-UK`: deeper local intelligence and market-style scoring
- `uk-postcode-checker`: ONS census cards, crime charts, transport card

Implementation notes:

- Create one normalised `areaIntel` object on each saved property.
- Prefer the existing HomeFinder card styling over importing three visual systems.
- Wrap API rendering with safe text helpers before migrating `innerHTML`-heavy cards.
- Keep API failures partial; one failed public API should not block the postcode result.

Proposed data shape:

```js
areaIntel: {
  postcode: "",
  location: {
    lat: null,
    lon: null,
    ward: "",
    district: "",
    region: "",
    lsoa: ""
  },
  schools: [],
  transport: {
    rail: [],
    bus: []
  },
  crime: {
    latestMonth: "",
    total: null,
    categories: []
  },
  census: {
    ethnicity: [],
    tenure: [],
    religion: []
  },
  environment: {
    floodRisk: null,
    airQuality: null
  },
  score: {
    overall: null,
    schools: null,
    transport: null,
    safety: null,
    environment: null
  },
  fetchedAt: ""
}
```

### 3. Property Tracker

Purpose: manage actual candidate homes.

Current source: `UK-HomeFinder`.

Keep:

- Listing parser
- Saved properties
- Manual scoring dimensions
- Viewing status
- Notes
- Offer strategy
- Map view
- CSV export

Upgrade:

- Attach a reusable area-intel snapshot to each property.
- Add decision score components, not just a single composite score.
- Add missing-data warnings such as `No crime data fetched` or `No mortgage scenario selected`.

### 4. Affordability And SDLT

Purpose: convert buyer budget into real purchase feasibility.

Current source: `UK-HomeFinder`.

Keep:

- SDLT calculator
- Purchase cost calculator
- First-time-buyer handling
- Readiness checklist relationship

Upgrade from mortgage monitor:

- Add rate scenario selector using latest monitored best rate.
- Add monthly payment and two-year cost sensitivity.
- Add simple stress-test rates.

Proposed fields:

```js
budget: {
  propertyPrice: 0,
  deposit: 0,
  mortgageRate: null,
  mortgageTermYears: 25,
  buyerType: "first-time-buyer",
  fees: {
    solicitor: 0,
    survey: 0,
    moving: 0,
    mortgageProduct: 0
  }
}
```

### 5. Mortgage Watch

Purpose: bring the live lending market into the buying decision.

Current source: `uk-mortgage-rate-monitor`.

MVP integration:

- Copy/read a static `data/rate_history.csv` snapshot into this repo.
- Add summary cards:
  - latest best rate
  - best lender
  - 7-day/30-day trend
  - lock/wait signal
  - monthly payment impact for the user's budget
- Link to the full mortgage monitor while parity is being built.

Later integration:

- Move the scheduled GitHub Action into this repo.
- Commit refreshed mortgage data here.
- Generate buyer-specific mortgage watch summaries.

### 6. Buyer Pack

Purpose: create a clean decision artifact.

Current source: `UK-HomeFinder` buyer-pack export.

Upgrade:

- Include mortgage signal.
- Include postcode intelligence summary.
- Include property comparison table.
- Include missing-data caveats.
- Include action list for broker/solicitor/family review.

## Migration Checklist

### Phase A - Repo Repositioning

- [x] Rename product narrative to UK Home Intelligence Pro.
- [x] Add merge blueprint.
- [ ] Update `index.html` title, metadata, header, and nav copy.
- [ ] Add legacy-link section for old tools.

### Phase B - Area Intelligence

- [ ] Extract safe render helpers for user/API strings.
- [ ] Add `Area Intelligence` nav tab.
- [ ] Port postcode-checker crime card.
- [ ] Port postcode-checker census cards: ethnicity, tenure, religion.
- [ ] Add Chart.js only if charts remain materially useful.
- [ ] Port PropertyPulse flood/environment signals.
- [ ] Save one `areaIntel` object per property.

### Phase C - Mortgage Watch

- [ ] Add `Mortgage Watch` nav tab or Command Centre panel.
- [ ] Add data directory for mortgage rate history snapshot.
- [ ] Port rate parsing/enrichment helpers.
- [ ] Add lock/wait signal card.
- [ ] Add monthly payment sensitivity using buyer budget.
- [ ] Decide whether to move scheduled rate workflow into this repo.

### Phase D - Decision Engine

- [ ] Define decision-score formula.
- [ ] Show score breakdown for each property.
- [ ] Add risk flags.
- [ ] Add missing-data warnings.
- [ ] Add property comparison export.

### Phase E - Legacy Repos

- [ ] Add banner to `PropertyPulse-UK` pointing to UK Home Intelligence Pro.
- [ ] Add banner to `uk-postcode-checker` pointing to UK Home Intelligence Pro.
- [ ] Add banner to `uk-mortgage-rate-monitor` once Mortgage Watch is integrated.
- [ ] Archive old repos only after feature parity and working links are confirmed.

## Implementation Principles

- Keep the first merged version static and local-first.
- Do not import each old UI wholesale; use one design system.
- Public API failures must degrade gracefully.
- Any user-entered or API-provided text should be escaped before display.
- Keep the old public URLs working until the merged app is better than each source tool.
- Do not hide caveats: school catchments, mortgage rates, public API data, and crime/census summaries all need context.

## Suggested Decision Score

Initial formula out of 100:

| Component | Weight |
|---|---:|
| Property manual score | 30 |
| Area intelligence score | 25 |
| Affordability headroom | 20 |
| Mortgage timing signal | 10 |
| Readiness completion | 10 |
| Risk/caveat penalty | -5 to -20 |

This should be shown as a breakdown, not just one opaque number.

## First Code Change After This Doc

Update `index.html` to:

- Rename the header to UK Home Intelligence Pro.
- Add nav placeholders for `Area Intelligence` and `Mortgage Watch`.
- Add a Command Centre card summarising the merge status.
- Keep the existing HomeFinder functionality intact.

That gives the merged product a visible shell without breaking the working buyer tracker.
