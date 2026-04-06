# UK Home Finder Hub 🏡

A free, single-file property search companion for UK home buyers. No backend, no API keys, no runtime costs — everything runs in your browser and saves to localStorage. Deploy to GitHub Pages in under 5 minutes.

---

## What It Does

The hub combines five tools into one `index.html`:

| Tab | Purpose |
|---|---|
| **Overview** | At-a-glance dashboard — readiness score, top properties, next actions |
| **Rightmove Parser** | Paste a listing URL → auto-extracts postcode → fetches area intelligence |
| **My Properties** | Track, score and compare every listing with notes and offer strategy |
| **Budget & SDLT** | Full purchase cost calculator with first-time buyer SDLT rules (April 2025) |
| **Readiness Checklist** | Stage-by-stage buying checklist from AIP to completion |

---

## Area Intelligence

When you paste a Rightmove or Zoopla URL (or enter a postcode manually), the hub runs three free API calls in parallel:

### Schools — DfE GIAS API
- Finds all schools within your configured radius (default **2 miles**)
- Filter by All / Secondary only / Primary only
- Direct link to each school's **Ofsted inspection report**
- Auto-scores the *School Quality* dimension in the property scorer

> **Note on Ofsted ratings:** The DfE removed Ofsted ratings from the GIAS API in January 2025. The hub links directly to `reports.ofsted.gov.uk` for each school's latest report. For catchment boundary maps, use [Locrating](https://www.locrating.com/) (paid subscription).

### Transport — Overpass API (OpenStreetMap)
- **Train stations / halts** within your configured radius (default **1.5 miles**)
- **Bus stops** within your configured radius (default **0.5 miles**), with route references where tagged
- Auto-scores the *Transport Links* dimension in the property scorer

### Postcode Lookup — postcodes.io
- Converts any UK postcode to lat/lon
- Returns district and region name for display

All three APIs are **free with no API key required**.

---

## Property Scoring

Each property gets a **composite score out of 100** based on eight dimensions:

| Dimension | Weight | Notes |
|---|---|---|
| School quality | ×2 | Double-weighted; auto-filled from area intel |
| Transport links | ×1.5 | Auto-filled from area intel |
| Value for money | ×1.5 | Manual assessment |
| Condition / no work needed | ×1 | Manual assessment |
| Size & layout | ×1 | Manual assessment |
| Location / commute | ×1 | Manual assessment |
| Garden & parking | ×0.75 | Manual assessment |
| Broadband quality | ×0.5 | Check via [Ofcom checker](https://checker.ofcom.org.uk/) |

Score ≥ 70 = strong candidate. School quality is double-weighted intentionally — proximity to good schools is the primary non-negotiable for most family buyers.

---

## SDLT Calculator

Implements **April 2025 First-Time Buyer rules** for England:

| Price band | FTB rate |
|---|---|
| Up to £300,000 | 0% |
| £300,001 – £500,000 | 5% on portion above £300k |
| Above £500,000 | Standard rates apply (FTB relief removed) |

The SDLT cliff comparison table shows the exact cost at key price points (£300k, £380k, £450k, £480k, £499,999, £500k, £520k, £540k) so you can factor it into offer negotiations.

> The **£500k cliff** is a critical negotiation lever: a property listed at £510k costs ~£8,750 more in SDLT than one at £499,999. Use this in offer strategy notes.

---

## Rightmove / Zoopla URL Parsing

The parser extracts the postcode from the URL slug automatically for most listings:

```
https://www.rightmove.co.uk/properties/12345678#/?channel=RES_BUY
  → extracts property ID

https://www.rightmove.co.uk/property-for-sale/property-12345678/b90-2qs.html
  → extracts B90 2QS from slug
```

If the postcode cannot be auto-detected (some listing URLs don't include it), you are prompted to enter it manually. The URL and listing ID are still pre-filled in the Add to Tracker form.

Zoopla URLs in the format `zoopla.co.uk/for-sale/details/12345678` are also supported.

---

## Quick Links Per Postcode

After every area intelligence run, the hub surfaces direct links to:

- [Locrating](https://www.locrating.com/) — school catchment maps (paid, recommended)
- [Gov.uk Flood Map](https://www.gov.uk/check-flood-risk)
- [EPC Certificate Lookup](https://find-energy-certificate.service.gov.uk/)
- [Ofcom Broadband Checker](https://checker.ofcom.org.uk/)
- [Police.uk Crime Statistics](https://www.police.uk/)

---

## Deploy to GitHub Pages

1. Create a new public repository, e.g. `uk-home-hub`
2. Upload `index.html` to the root of the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your hub will be live at `https://yourusername.github.io/uk-home-hub/`

All data is stored in **localStorage** — it stays in your browser and is never sent anywhere. Each device/browser will have its own separate data store.

---

## Configuration (Settings ⚙)

Click the **⚙ Settings** button in the top-right to configure:

| Setting | Default | Description |
|---|---|---|
| Search label | — | Your name or search description (shown in dashboard header) |
| Target postcode area | — | Label for your search area (e.g. B90, B91) |
| Priority school name | — | Appears in scoring labels (e.g. Tudor Grange Academy) |
| School search radius | 2 miles | How far to search for schools |
| Train station radius | 1.5 miles | How far to search for stations |
| Bus stop radius | 0.5 miles | How far to search for bus stops |

Settings are saved to localStorage and persist across sessions.

---

## Data & Privacy

- **All data is local.** Nothing is sent to any server except the three free API calls (postcodes.io, DfE GIAS, Overpass) when you explicitly trigger an area intelligence lookup.
- **No tracking, no ads, no analytics.**
- **Data persists in `localStorage`** — clearing your browser storage will erase your saved properties and checklist. Export a backup by opening DevTools → Application → Local Storage and copying the `uk-home-hub` key value.
- The app works fully offline except for area intelligence lookups and the Google Fonts stylesheet.

---

## APIs Used

| API | Provider | Auth | Rate limit |
|---|---|---|---|
| Postcode lookup | [postcodes.io](https://postcodes.io/) | None | Generous free tier |
| Schools by radius | [DfE GIAS](https://get-information-schools.service.gov.uk/) | None | Public |
| Bus stops & stations | [Overpass API](https://overpass-api.de/) | None | Fair use |

---

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No build step, no npm, no dependencies beyond a Google Fonts stylesheet and the three API calls above.

---

## Licence

MIT — free to use, fork, and adapt. If you find it useful, a ⭐ on the repo is appreciated.
