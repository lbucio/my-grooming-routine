# My Grooming Routine

An iOS-first web app for the skin, hair and body routine built around my Korea haul.
React + Vite, no backend — everything lives in the browser's own storage on the device.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173 — also served on the LAN for phone testing
npm run build
npm run preview
```

To use it on the phone: run `npm run dev`, open the LAN address Vite prints in Safari,
then **Share → Add to Home Screen**. It launches standalone, with no browser chrome,
and respects the notch and home indicator.

## The two views

**Daily** — the morning and night routine for one day, as a checklist. The segmented
control defaults to Night after 4pm. Every step has an ⓘ that opens the product's full
card: brand, Korean name, what it is, how to use it, and its rules. Progress and the
per-group counts update as you tick things off.

**Weekly** — the seven nights with their face active, legs and hair, plus the ☀️ flag
for each day and the source routine table. Tapping a day opens it in the daily view.
Arrows move between weeks, so outdoor days can be flagged ahead.

A third **Products** tab lists the whole haul by category and holds the two settings
(PureDia gel start date, and a reset).

## Outdoor days

Tap ☀️ on any day — in the week view for planning ahead, or on the card in the daily
view. A flagged day changes four things:

| | Office day | Outdoor day |
|---|---|---|
| Morning SPF | SKIN1004 Hyalu-Cica sun serum | La Roche-Posay UV Mune 400 |
| Legs | Birch stick if legs are out | Birch stick required |
| Midday | — | BoJ matte stick, every 2 hours |
| Night first cleanse | Oil or balm, your call | Gokujyun oil (heavy sunscreen) |

## Face active schedule

Three phases, switched from the week view. Friday and Saturday nights stay calm in all
three, so skin goes into weekend sun with an intact barrier.

| Night | Month 1 | Month 2+ | Sensitive |
|---|---|---|---|
| Sun | Retinol | Retinol | Retinol |
| Mon | Rejuran PDRN | Abib pads | Rejuran PDRN |
| Tue | Abib pads | Retinol | Rejuran PDRN |
| Wed | Rejuran PDRN | Rejuran PDRN | Rejuran PDRN |
| Thu | Retinol | Retinol | Rejuran PDRN |
| Fri | Rejuran PDRN | Rejuran PDRN | Rejuran PDRN |
| Sat | Rejuran PDRN (recovery) | Rejuran PDRN (recovery) | Rejuran PDRN |

Legs get the mist Sun/Tue/Thu/Sat (4 nights) and lotion alone on the other three.
The hair mask is Sun and Thu, capped at 2 because the leave-in is protein too.

Move to **Month 2+** after four weeks with no irritation. Switch to **Sensitive** on
redness or peeling, hold it two weeks, then go back.

## Storage

Everything is per-device and client-side; there is no backend and no account.
`src/lib/storage.js` is the only module that touches persistence, so swapping the
backend means changing that one file.

**Today: localStorage.** Survives tab closes, reboots and app updates. Capacity is
~5MB per origin, which this app will never approach — a year of daily checks is well
under 200KB. It is per-device and per-browser: Safari on the phone and Chrome on a
laptop are separate stores, and Safari evicts it after ~7 days of no visits unless the
app is installed to the Home Screen. Install it and that eviction rule doesn't apply.

**sessionStorage** — what was originally asked for. Same API, but scoped to one tab and
cleared when that tab closes, which iOS does aggressively to background tabs. Flip the
constant at the top of `storage.js` to use it:

```js
const BACKEND = 'local' // 'local' | 'session'
```

### If the current backend stops being enough

| Option | Gets you | Costs |
|---|---|---|
| **IndexedDB** (via `idb-keyval`) | Async, no 5MB ceiling, structured queries | Still one device. Worth it only for photos — progress shots of legs or skin over the 4–8 week window |
| **Export / import JSON** | A file you can AirDrop to a new phone, and a backup | Manual. ~30 lines: serialize the same keys, download and re-read them |
| **iCloud / File-based sync** | Automatic backup across your own Apple devices | Needs a real app (Swift, or Capacitor wrapping this) — not reachable from a web page |
| **Cloud DB** (Supabase, Firebase) | Real multi-device sync, history that outlives the phone | An account, a login screen, a schema, and your routine data on someone else's server |

The honest read for this app: localStorage plus a JSON export covers everything short of
wanting the same checkmarks on a second device. Reach for a cloud DB only when you
actually want the history to survive losing the phone.

## Deploying

`.github/workflows/deploy.yml` builds on every push and publishes `dist/` to GitHub
Pages. Two one-time settings changes are needed before the first run can succeed:

1. **Settings → General → Danger Zone → Change visibility → Public.**
   Pages is not available for private repositories on the free plan.
2. **Settings → Pages → Source → GitHub Actions.**

The second step can't be automated: creating a Pages site through the API needs
`administration: write`, and the default `GITHUB_TOKEN` cannot be granted that, so
`configure-pages` with `enablement: true` fails with "Resource not accessible by
integration".

After both, push anything (or re-run the workflow) and it deploys to
`https://lbucio.github.io/my-grooming-routine/`.

Making the repository public exposes the code and the product list. It does not expose
anything you check off — that stays in your browser's own storage and never leaves the
device.

## Layout

```
src/
  data/products.js    every product, with its Korean name, notes and rules
  data/schedule.js    phases, the weekly table, and the day-to-steps builder
  lib/storage.js      the persistence layer
  lib/date.js         local-time date keys (never toISOString — it shifts the day)
  components/         DailyView, WeeklyView, ProductsView, StepList, ProductSheet
```

Adding a product means one entry in `products.js` and one step in `schedule.js`.
