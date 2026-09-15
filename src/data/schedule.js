import { DAY_SHORT, daysBetween } from '../lib/date.js'

// Day index: 0 = Sunday … 6 = Saturday. The routine table starts on Sunday.

/**
 * Face-active phases.
 *  month1    — the starting schedule: retinol 2 nights, pads Tuesday.
 *  month2    — after 4 clean weeks: third retinol night on Tuesday, pads move to Monday.
 *  sensitive — redness or peeling: one active night, PDRN everywhere else because it soothes.
 * Friday and Saturday nights stay calm in every phase.
 */
export const PHASES = {
  month1: {
    id: 'month1',
    label: 'Month 1',
    blurb: 'Retinol 2 nights · pads Tuesday',
    actives: ['retinol', 'rejuran', 'abibPads', 'rejuran', 'retinol', 'rejuran', 'rejuran']
  },
  month2: {
    id: 'month2',
    label: 'Month 2+',
    blurb: 'Retinol 3 nights · pads Monday',
    actives: ['retinol', 'abibPads', 'retinol', 'rejuran', 'retinol', 'rejuran', 'rejuran']
  },
  sensitive: {
    id: 'sensitive',
    label: 'Sensitive',
    blurb: 'One active night · PDRN the rest',
    actives: ['retinol', 'rejuran', 'rejuran', 'rejuran', 'rejuran', 'rejuran', 'rejuran']
  }
}

export const PHASE_ORDER = ['month1', 'month2', 'sensitive']

// Constant across phases.
const MIST_NIGHTS = [true, false, true, false, true, false, true]   // Sun Tue Thu Sat — 4 nights/week
const MASK_NIGHTS = [true, false, false, false, true, false, false] // Sun Thu — capped at 2, the leave-in is protein too

const ACTIVE_LABEL = {
  retinol: 'Retinol',
  rejuran: 'Rejuran PDRN',
  abibPads: 'Abib pads'
}

export function activeFor(phaseId, dayIndex) {
  return PHASES[phaseId].actives[dayIndex]
}

export function activeLabel(phaseId, dayIndex) {
  const id = activeFor(phaseId, dayIndex)
  // Saturday in the base schedule is the recovery night before the weekend sun.
  if (id === 'rejuran' && dayIndex === 6) return 'Rejuran PDRN (recovery)'
  return ACTIVE_LABEL[id]
}

export const mistNight = (dayIndex) => MIST_NIGHTS[dayIndex]
export const maskNight = (dayIndex) => MASK_NIGHTS[dayIndex]

export function legsLabel(dayIndex) {
  return MIST_NIGHTS[dayIndex] ? 'Mist + Aestura' : 'Aestura'
}

export function hairLabel(dayIndex) {
  return MASK_NIGHTS[dayIndex] ? 'Mask' : '—'
}

export const isCalmNight = (dayIndex) => dayIndex === 5 || dayIndex === 6

/**
 * PureDia whitening gel: every other night for week one, then nightly.
 * Returns 'on' | 'off' | 'unset'.
 */
export function pureDiaTonight(startKey, key) {
  if (!startKey) return 'unset'
  const n = daysBetween(startKey, key)
  if (n < 0) return 'off'
  if (n < 7) return n % 2 === 0 ? 'on' : 'off'
  return 'on'
}

/**
 * Build the full set of steps for one date.
 * `outdoor` swaps the sunscreen, forces the leg stick, and adds reapplication.
 */
export function buildDay({ date, phaseId, outdoor, pureDiaStart }) {
  const d = date.getDay()
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  const active = activeFor(phaseId, d)
  const mist = mistNight(d)
  const mask = maskNight(d)
  const gel = pureDiaTonight(pureDiaStart, key)

  const am = [
    {
      id: 'am-face',
      title: 'Face',
      steps: [
        { id: 'am-cleanse', productId: 'dokdo', title: 'Round Lab Dokdo cleanser', detail: 'Alone in the morning. Low pH, no stripping.' },
        { id: 'am-vitc', productId: 'vitaminC', title: 'Dr. Althea Vitamin C serum', detail: 'Morning only — never alongside the night actives.', badge: 'AM only' },
        { id: 'am-aestura', productId: 'aestura', title: 'Aestura Atobarrier365 lotion', detail: 'Onto skin still damp from cleansing — that is where the hydration comes from without a separate serum.' },
        outdoor
          ? {
              id: 'am-spf',
              productId: 'lrp',
              title: 'La Roche-Posay UV Mune 400',
              detail: 'Strongest filter set and water resistant. Two finger-lengths, face and neck.',
              badge: 'Outdoor day'
            }
          : {
              id: 'am-spf',
              productId: 'skin1004Sun',
              title: 'SKIN1004 Hyalu-Cica sun serum',
              detail: 'Two finger-lengths, face and neck. Torriden Dive-In Sun Cream — the SPF one — if you want the rotation.',
              badge: 'Every morning'
            }
      ]
    },
    {
      id: 'am-body',
      title: 'Body',
      steps: [
        { id: 'am-bodywash', productId: 'bodyCleanser', title: 'SOME BY MI body cleanser', detail: 'Let it sit a minute before rinsing. Back and shoulders too.', optional: true, optionalNote: 'if you shower this morning' },
        {
          id: 'am-legs-spf',
          productId: 'birchStick',
          title: 'Round Lab birch sun stick — legs',
          detail: 'One swipe down each shin.',
          badge: outdoor ? 'Required today' : undefined,
          optional: !outdoor,
          optionalNote: 'if your legs are out'
        }
      ]
    },
    {
      id: 'am-hair',
      title: 'Hair',
      note: 'Wash at night instead? Do the mask, leave-in and oil then — but save the salt spray and the scrunch for the morning, on hair re-dampened with water.',
      steps: [
        ...(mask
          ? [{ id: 'am-mask', productId: 'unoveMask', title: 'UNOVE deep damage repair mask', detail: 'In the shower. Squeeze the water out first. Mid-lengths to ends only, off the scalp. 3–5 min, lukewarm rinse.', badge: 'Mask day' }]
          : []),
        { id: 'am-leavein', productId: 'unoveLeaveIn', title: 'UNOVE frizz calming leave-in', detail: 'Mid-lengths to ends while hair is still dripping. Protein — wash days only, not every morning.', optional: !mask, optionalNote: mask ? undefined : 'wash day only' },
        { id: 'am-salt', productId: 'seaSalt', title: 'Sea salt spray — scrunch', detail: 'Damp hair, spray through the mids, scrunch upward in your palm and hold. This is the step that makes the wave.', badge: 'Styling' },
        { id: 'am-oil', productId: 'miseEnScene', title: 'Mise-en-scène Perfect Serum', detail: 'One or two pumps, ends only, after the scrunch. More than that and the wave drops.' },
        { id: 'am-airdry', title: 'Air dry — hands off', detail: 'Do the rest of your routine while it dries. Touching a drying wave is what turns it into frizz.' }
      ]
    },
    {
      id: 'am-teeth',
      title: 'Teeth',
      steps: [
        { id: 'am-teeth-paste', productId: 'euthymol', title: 'Euthymol purple toothpaste', detail: 'Tone-correcting. Twice daily as normal toothpaste.' }
      ]
    }
  ]

  if (outdoor) {
    am.push({
      id: 'am-reapply',
      title: 'While you are out',
      steps: [
        { id: 'am-reapply-1', productId: 'bojStick', title: 'BoJ matte stick — reapply', detail: 'Every 2 hours. Works over sweat, no rubbing in.', badge: 'Every 2 h' }
      ]
    })
  }

  const faceActiveStep =
    active === 'retinol'
      ? { id: 'pm-active', productId: 'retinol', title: 'COSRX Retinol 0.1', detail: 'Thin layer on DRY skin — wait until the cleanse has fully dried. Flaking or stinging → a thin layer of Aestura first, then the retinol over it.', badge: 'Active' }
      : active === 'abibPads'
      ? { id: 'pm-active', productId: 'abibPads', title: 'Abib Green LHA pore pad', detail: 'Embossed side to wipe, smooth side to pat.', badge: 'Active' }
      : { id: 'pm-active', productId: 'rejuran', title: 'Rejuran Turnover ampoule', detail: isCalmNight(d)
            ? 'Calm night — barrier recovery before the weekend sun.'
            : d === 3
            ? 'PDRN repair night. Good night to swap in the Pore Tightening ampoule instead — the pads cleared the pores last night.'
            : 'PDRN repair night between the stronger actives. The Pore Tightening ampoule can take this slot instead.', badge: 'PDRN' }

  const pm = [
    {
      id: 'pm-face',
      title: 'Face',
      steps: [
        {
          id: 'pm-cleanse-1',
          productId: outdoor ? 'gokujyunOil' : 'bojBalm',
          title: outdoor ? 'Gokujyun cleansing oil' : 'Gokujyun oil or BoJ balm',
          detail: outdoor
            ? 'Heavy sunscreen day — the oil. On DRY skin, 30–60 sec, emulsify, rinse.'
            : "Interchangeable. Balm on nights skin feels retinol-irritated. On DRY skin.",
          badge: 'First cleanse'
        },
        { id: 'pm-cleanse-2', productId: 'dokdo', title: 'Round Lab Dokdo cleanser', detail: "Second cleanse. Never skip — oil alone doesn't remove sunscreen.", badge: 'Second cleanse' },
        faceActiveStep,
        { id: 'pm-aestura', productId: 'aestura', title: 'Aestura Atobarrier365 lotion', detail: 'Last face step. Straight over the active.' }
      ]
    },
    {
      id: 'pm-legs',
      title: 'Body & legs',
      steps: [
        { id: 'pm-bodywash', productId: 'bodyCleanser', title: 'SOME BY MI body cleanser', detail: 'In the shower. Let it sit a minute. Never a loofah or scrub on the bumps.' },
        ...(mist
          ? [
              { id: 'pm-mist', productId: 'bodyMist', title: 'Miracle body toner mist', detail: 'Dry legs. Let it dry a full minute before the lotion.', badge: 'Treatment night' },
              { id: 'pm-legs-lotion', productId: 'aesturaLegs', title: 'Aestura lotion over the mist', detail: 'The mist adds no moisture — this is what stops the tight, flaky look.' }
            ]
          : [{ id: 'pm-legs-lotion', productId: 'aesturaLegs', title: 'Aestura lotion — legs', detail: 'Off night. Lotion alone.' }])
      ]
    },
    {
      id: 'pm-teeth',
      title: 'Teeth',
      steps: [
        { id: 'pm-teeth-paste', productId: 'euthymol', title: 'Euthymol purple toothpaste', detail: 'Second of the two daily brushes.' },
        ...(gel === 'on'
          ? [{ id: 'pm-gel', productId: 'pureDia', title: 'PureDia whitening gel', detail: 'Stop at any sharp pain.', badge: 'Tonight' }]
          : gel === 'off'
          ? []
          : [{ id: 'pm-gel', productId: 'pureDia', title: 'PureDia whitening gel', detail: 'Set a start date in Products to get the every-other-night schedule.', optional: true, optionalNote: 'no start date set' }])
      ]
    }
  ]

  return { am, pm, active, mist, mask, dayIndex: d }
}

export function weekSummary(phaseId, dayIndex) {
  return {
    day: DAY_SHORT[dayIndex],
    active: activeLabel(phaseId, dayIndex),
    activeId: activeFor(phaseId, dayIndex),
    legs: legsLabel(dayIndex),
    hair: hairLabel(dayIndex),
    calm: isCalmNight(dayIndex)
  }
}
