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

## A note on storage

You asked for session storage. `src/lib/storage.js` defaults to **localStorage**
instead, because `sessionStorage` is wiped the moment the Safari tab closes and iOS
discards background tabs aggressively — the morning's checks and the outdoor days
flagged for next week would be gone by evening, which defeats the point of the app.

One constant at the top of that file switches it back:

```js
const BACKEND = 'local' // 'local' | 'session'
```

Everything else goes through that module, so nothing else has to change. It falls back
to in-memory storage if the browser blocks both (Safari private mode).

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
