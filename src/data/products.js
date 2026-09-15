// The Korea haul. One entry per physical product.
// `id` is referenced by the routine builder in src/data/schedule.js.

export const PRODUCTS = {
  // ---------- FACE — treat ----------
  rejuran: {
    id: 'rejuran',
    code: 'RJ',
    name: 'Rejuran Turnover Ampoule',
    sub: 'Dual Effect · DOT Dual PDRN · 10ml + 5ml',
    korean: '리쥬란 턴오버 앰플',
    brand: 'Rejuran',
    group: 'Face — treat',
    what: 'PDRN ampoule (salmon-DNA-derived). Repair, firmness, barrier.',
    use: 'PM, after cleansing, before Torriden. Gentle — goes on the nights between retinol and pads.',
    notes: ['Pioneered PDRN in Korean clinics.']
  },
  poreAmpoule: {
    id: 'poreAmpoule',
    code: 'RP',
    name: 'Rejuran Pore Tightening Ampoule',
    sub: 'PDRx 5% · c-PDRN 0.5%',
    brand: 'Rejuran',
    group: 'Face — treat',
    what: 'PDRN ampoule aimed at pore appearance rather than general repair. Same family as the Turnover ampoule, higher PDRx.',
    use: 'PM, in place of the Turnover ampoule on a PDRN night. Nose and cheeks rather than the whole face.',
    notes: [
      'Not a second active — PDRN is repair, not exfoliation, so it breaks no rule by sitting in the Turnover ampoule\'s slot.',
      'Small bottle. Swapping it in on some PDRN nights makes it last; adding it as a nightly extra step does not.',
      'Wednesday is the natural night for it — the Abib pads clear the pore on Tuesday, this follows the next night.'
    ]
  },
  retinol: {
    id: 'retinol',
    code: 'CX',
    name: 'COSRX The Retinol 0.1 Cream',
    korean: '코스알엑스 레티놀 0.1',
    brand: 'COSRX',
    group: 'Face — treat',
    what: 'Entry-strength retinol, 20ml. The only wrinkle treatment I own.',
    use: 'PM, after cleansing, before Torriden. 2 nights/week for month one, then 3.',
    notes: [
      'Never the same night as the Abib pads.',
      'Sunscreen every morning once started.',
      'Flaking or stinging → drop to 1 night/week for two weeks.'
    ]
  },
  abibPads: {
    id: 'abibPads',
    code: 'AB',
    name: 'Abib Green LHA Pore Pad',
    sub: 'Clear Touch',
    korean: '아비브 그린 LHA 포어 패드',
    brand: 'Abib',
    group: 'Face — treat',
    what: '60 pads, LHA + BHA at two molecular sizes. Clears sebum inside the pore and surface buildup.',
    use: 'PM, 2 nights/week, after cleansing. Embossed side to wipe, smooth side to pat.'
  },
  vitaminC: {
    id: 'vitaminC',
    code: 'DA',
    name: 'Dr. Althea Vitamin C Boosting Serum',
    brand: 'Dr. Althea',
    group: 'Face — treat',
    what: 'Vitamin C serum. Brightening, antioxidant, supports collagen.',
    use: 'AM ONLY, after cleansing, before Torriden.',
    notes: ['Morning only — avoids all conflict with the retinol and acids at night.']
  },
  torridenSerum: {
    id: 'torridenSerum',
    code: 'TD',
    name: 'Torriden Dive-In Serum',
    sub: 'Not in the haul — the routine skips it',
    owned: false,
    korean: '토리든 다이브인 세럼',
    brand: 'Torriden',
    group: 'Face — treat',
    what: 'Lightweight hydrating serum. #1 selling skincare item at Olive Young.',
    use: 'Would sit AM and PM after any active, before moisturizer — if you had it.',
    notes: [
      "You own the Dive-In Sun Cream, not this. Torriden sells both under the Dive-In name, which is exactly what made the night routine look like it contained sunscreen.",
      'Until you buy it, the Aestura lotion goes on damp skin and carries the hydration on its own.'
    ]
  },

  // ---------- FACE — cleanse ----------
  gokujyunOil: {
    id: 'gokujyunOil',
    code: 'HL',
    name: 'Hada Labo Gokujyun Cleansing Oil',
    brand: 'Hada Labo (Rohto, Japan)',
    group: 'Face — cleanse',
    what: 'First-cleanse oil.',
    use: 'PM on DRY skin, massage 30–60 sec, emulsify with water, rinse. Best for heavy sunscreen days.'
  },
  bojBalm: {
    id: 'bojBalm',
    code: 'BJ',
    name: 'Beauty of Joseon Radiance Cleansing Balm',
    brand: 'Beauty of Joseon',
    group: 'Face — cleanse',
    what: 'First-cleanse balm. Same job as the oil.',
    use: "Interchangeable with the oil — balm for travel (won't leak) and for nights when skin feels retinol-irritated."
  },
  dokdo: {
    id: 'dokdo',
    code: 'RL',
    name: 'Round Lab 1025 Dokdo Cleanser',
    korean: '라운드랩 1025 독도 클렌저',
    brand: 'Round Lab',
    group: 'Face — cleanse',
    what: 'Low-pH water-based gel cleanser. Blue tube.',
    use: 'AM alone. PM as the second cleanse after oil or balm.',
    notes: ["Never skip it — oil alone doesn't remove sunscreen."]
  },

  // ---------- FACE — moisturize ----------
  aestura: {
    id: 'aestura',
    code: 'AE',
    name: 'Aestura Atobarrier365 Lotion',
    sub: '×2 — one for face, one for legs',
    brand: 'Aestura (Amorepacific)',
    group: 'Face — moisturize',
    what: 'Ceramide barrier lotion. Lotion, not cream — right weight for oily skin. #1 cream at Olive Young.',
    use: 'AM and PM, last step before sunscreen. Second bottle lives with the body products.'
  },

  // ---------- FACE — protect ----------
  skin1004Sun: {
    id: 'skin1004Sun',
    code: 'SK',
    name: 'SKIN1004 Hyalu-Cica Water-Fit Sun Serum',
    sub: 'SPF50+ PA++++ · ×4',
    korean: '스킨천사 히알루 시카 워터핏 선세럼',
    brand: 'SKIN1004',
    group: 'Face — protect',
    what: 'Watery sun serum, semi-matte, no white cast. 50ml.',
    use: 'DAILY DRIVER. Every morning, last step, two finger-lengths for face and neck.'
  },
  torridenSun: {
    id: 'torridenSun',
    code: 'TS',
    name: 'Torriden Dive-In Sun Cream',
    sub: 'SPF — mornings only',
    brand: 'Torriden',
    group: 'Face — protect',
    what: 'Chemical SPF, semi-matte. Built for hot weather and oily skin.',
    use: 'Rotation / backup for the SKIN1004. Morning only — never a night step.',
    notes: ['Not the Dive-In HA Serum. Same product line, different job.']
  },
  lrp: {
    id: 'lrp',
    code: 'LR',
    name: 'La Roche-Posay Anthelios UV Mune 400',
    sub: 'SPF50+',
    brand: 'La Roche-Posay (France)',
    group: 'Face — protect',
    what: 'Strongest filter set of the three. Water resistant.',
    use: 'HEAVY OUTDOOR DAYS. Long hikes, water, full sun exposure.'
  },
  bojStick: {
    id: 'bojStick',
    code: 'BJ',
    name: 'Beauty of Joseon Matte Sun Stick',
    sub: 'Mugwort + Camellia · SPF50+',
    brand: 'Beauty of Joseon',
    group: 'Face — protect',
    what: 'Matte-finish twist-up stick.',
    use: 'FACE reapplication, every 2 hours outdoors. Works over sweat, no rubbing in.'
  },
  birchStick: {
    id: 'birchStick',
    code: 'RL',
    name: 'Round Lab Birch Juice Sun Stick',
    sub: 'SPF50+ · 19g',
    korean: '자작나무 수분 선스틱',
    brand: 'Round Lab',
    group: 'Face — protect',
    what: 'Moisturizing stick.',
    use: 'LEGS. One swipe down each shin before going out in shorts.'
  },

  // ---------- TEETH ----------
  euthymol: {
    id: 'euthymol',
    code: 'EU',
    name: 'Euthymol Whitening Purple Toothpaste',
    korean: '유시몰',
    brand: 'Euthymol (since 1898)',
    group: 'Teeth',
    what: 'Purple = tone-correcting. Cancels yellow the way purple shampoo cancels brass.',
    use: 'Twice daily as normal toothpaste.',
    notes: ['Olive Young Awards winner.']
  },
  pureDia: {
    id: 'pureDia',
    code: 'PD',
    name: 'Liveorals PureDia Whitening Gel',
    korean: '퓨어디아',
    brand: 'Liveorals',
    group: 'Teeth',
    what: 'Whitening gel, no harsh abrasives. ~2 week supply.',
    use: 'Every other night for week one, then nightly if no sensitivity.',
    notes: [
      'Visible difference around a week; 2–3 weeks for full effect.',
      'STOP at any sharp pain.',
      'Korean-only instructions — translate before first use.'
    ]
  },

  // ---------- HAIR ----------
  unoveMask: {
    id: 'unoveMask',
    code: 'UN',
    name: 'UNOVE Deep Damage Repair Hair Mask',
    sub: 'Tender Bloom · 320ml ×2',
    korean: '어노브 딥 데미지 리페어 헤어 마스크',
    brand: 'UNOVE (Dr.FORHAIR)',
    group: 'Hair',
    what: 'Protein mask. 30,000ppm Keratin-PF, 31 proteins and amino acids, 5-oil complex.',
    use: 'After shampoo on damp hair, squeeze out excess water. MID-LENGTHS TO ENDS ONLY — keep off the scalp. 3–5 min, lukewarm rinse.',
    notes: [
      '2×/week. Capped at 2 because the leave-in is also protein — more risks protein overload (stiff, straw-like hair).',
      '#1 Olive Young hair care 4 years running.'
    ]
  },
  unoveLeaveIn: {
    id: 'unoveLeaveIn',
    code: 'UN',
    name: 'UNOVE Frizz Calming Sleek Leave-in',
    brand: 'UNOVE',
    group: 'Hair',
    what: 'Leave-in protein conditioner.',
    use: 'Damp hair after showering, mid-lengths to ends.',
    notes: ['Lower protein load than a rinse-off, but it counts toward the weekly total.']
  },
  miseEnScene: {
    id: 'miseEnScene',
    code: 'MS',
    name: 'Mise-en-scène Perfect Serum',
    sub: 'Original (gold)',
    korean: '미장센 퍼펙트 세럼',
    brand: 'Mise-en-scène',
    group: 'Hair',
    what: 'Leave-in oil serum. The Korean classic hair oil.',
    use: 'Two pumps on damp ends. Layer after the leave-in.'
  },
  curlCream: {
    id: 'curlCream',
    code: 'CC',
    name: 'Dashu Wet Curl Cream',
    sub: 'The wave definer',
    brand: 'Dashu',
    group: 'Hair',
    what: 'Water-based cream styler, light to medium hold, glossy finish. Clumps the wave pattern and holds it while it dries.',
    use: 'Wash days. Soaking wet hair, not damp — rake through, then scrunch upward and hold. Air dry untouched.',
    notes: [
      'This is the defining product the kit was missing. Salt spray gives grit and volume; it does not clump a wave.',
      'Light-to-medium hold is enough for a wave. Hold is rarely what makes a wave drop — touching it while it dries is.',
      'Too much turns greasy and drops the wave. Start with less than feels right and add on the next wash.',
      'Water-based, so it washes out with the Dokdo cleanser or plain water. No buildup to strip.'
    ]
  },
  matteWax: {
    id: 'matteWax',
    code: 'MW',
    name: 'Matte wax',
    sub: 'Not in the wave routine',
    inRoutine: false,
    group: 'Hair',
    what: 'Dry-hair wax for separation and piece-y texture.',
    use: 'Not for waves — it clumps sections flat and breaks the pattern, which is why the notes say to avoid wax.',
    notes: [
      'Keep it for a different look entirely — slicked back, or short piece-y styling.',
      'The one exception: a trace warmed between the palms, smoothed over dry flyaways at the end. Nowhere near the lengths.'
    ]
  },
  seaSalt: {
    id: 'seaSalt',
    code: 'SS',
    name: 'Sea Salt Spray',
    korean: '씨솔트 스프레이',
    group: 'Hair',
    what: 'Texturizing spray, light hold, matte finish.',
    use: 'Non-wash mornings. Mist hair damp again, scrunch upward, air dry — this is the refresher, not the definer.',
    notes: [
      'Demoted from wave-maker to refresher now the curl cream is in the routine. Salt adds grit and volume; cream makes the clump.',
      'Salt is drying. Every morning on top of wash-day cream is too much — keep it for day two and three.'
    ]
  },

  // ---------- BODY ----------
  bodyMist: {
    id: 'bodyMist',
    code: 'SM',
    name: 'SOME BY MI Miracle Body Toner Mist',
    sub: 'AHA·BHA·PHA · 140ml',
    korean: '썸바이미 미라클 바디 토너 미스트',
    brand: 'SOME BY MI',
    group: 'Body',
    what: 'Leave-on mist. AHA/BHA/PHA + succinic acid, niacinamide 20,000ppm (2%) for post-blemish marks.',
    use: 'Dry legs, 3–4 nights/week. Let dry 1 minute, then moisturizer over it.',
    notes: ['Mist over lotion: stays on all night instead of 60 seconds, and spraying avoids rubbing inflamed bumps.']
  },
  bodyCleanser: {
    id: 'bodyCleanser',
    code: 'SM',
    name: 'SOME BY MI Acne Clear Body Cleanser',
    sub: 'AHA·BHA·PHA · 400g',
    korean: '썸바이미 기적의 바디 클렌저',
    brand: 'SOME BY MI',
    group: 'Body',
    what: 'Tea tree leaf water, centella, salicylic acid. Exfoliates and regulates sebum.',
    use: 'Daily in the shower, let it sit a minute before rinsing. Also covers back and shoulders.'
  },
  aesturaLegs: {
    id: 'aesturaLegs',
    code: 'AE',
    name: 'Aestura Atobarrier365 Lotion — legs',
    sub: 'The second bottle',
    brand: 'Aestura (Amorepacific)',
    group: 'Body',
    what: 'Ceramide barrier lotion doing occlusive duty over the mist.',
    use: 'Over the mist on treatment nights. Alone on off nights.',
    notes: ['The mist adds no moisture — without this, legs go tight and flaky, which reads as worse texture.']
  }
}

export const PRODUCT_GROUPS = [
  'Face — cleanse',
  'Face — treat',
  'Face — moisturize',
  'Face — protect',
  'Body',
  'Hair',
  'Teeth'
]

export const HARD_RULES = [
  'One face active per night. Never retinol + Abib pads together.',
  'Vitamin C is morning only.',
  'Sunscreen every single morning, indoors or out.',
  'Reapply with the BoJ matte stick every 2 hours outdoors.',
  "Redness or peeling → one active night per week for two weeks, keep the PDRN, it's soothing.",
  'Never a loofah or physical scrub on the leg bumps.',
  'Legs take 4–8 weeks to visibly change. Quitting early is the usual failure.'
]
