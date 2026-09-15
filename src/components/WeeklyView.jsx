import { PHASES, PHASE_ORDER, weekSummary, maskNight, mistNight } from '../data/schedule.js'
import { HARD_RULES } from '../data/products.js'
import { DAY_SHORT, addDays, dateKey, formatShort, isToday, startOfWeek } from '../lib/date.js'

export default function WeeklyView({
  weekOffset,
  setWeekOffset,
  phaseId,
  setPhaseId,
  outdoorDays,
  toggleOutdoor,
  onPickDate
}) {
  const base = startOfWeek(addDays(new Date(), weekOffset * 7))
  const days = Array.from({ length: 7 }, (_, i) => addDays(base, i))
  const outdoorCount = days.filter((d) => outdoorDays[dateKey(d)]).length

  const label =
    weekOffset === 0
      ? 'This week'
      : weekOffset === 1
      ? 'Next week'
      : weekOffset === -1
      ? 'Last week'
      : `${formatShort(days[0])} – ${formatShort(days[6])}`

  return (
    <div className="page">
      <div className="weeknav">
        <button className="iconbtn" onClick={() => setWeekOffset(weekOffset - 1)} aria-label="Previous week">
          ‹
        </button>
        <span className="weeknav__label">
          {label} · {formatShort(days[0])} – {formatShort(days[6])}
        </span>
        <button className="iconbtn" onClick={() => setWeekOffset(weekOffset + 1)} aria-label="Next week">
          ›
        </button>
      </div>

      <div className="section-title">Face active schedule</div>
      <div className="phases">
        {PHASE_ORDER.map((id) => (
          <button key={id} className={`phase${phaseId === id ? ' phase--on' : ''}`} onClick={() => setPhaseId(id)}>
            <div className="phase__label">{PHASES[id].label}</div>
            <div className="phase__blurb">{PHASES[id].blurb}</div>
          </button>
        ))}
      </div>
      <div className="note">
        {phaseId === 'month1' &&
          'Actives land Sunday–Thursday, the office days — if skin reacts, it happens at a desk. After 4 weeks with no irritation, switch to Month 2+.'}
        {phaseId === 'month2' &&
          'Third retinol night on Tuesday, pads moved to Monday. Friday and Saturday stay clear regardless.'}
        {phaseId === 'sensitive' &&
          'Redness or peeling → one active night per week for two weeks. The PDRN stays, it is soothing. Go back to Month 1 after two calm weeks.'}
      </div>

      <div className="section-title">
        Days · tap ☀️ for a day in the sun
        {outdoorCount > 0 && ` · ${outdoorCount} flagged`}
      </div>
      <div className="card">
        {days.map((d) => {
          const i = d.getDay()
          const s = weekSummary(phaseId, i)
          const k = dateKey(d)
          const out = !!outdoorDays[k]
          return (
            <div
              key={k}
              className={`weekrow${isToday(d) ? ' weekrow--today' : ''}${s.calm ? ' weekrow--calm' : ''}`}
            >
              <button
                className="weekrow__day"
                onClick={() => onPickDate(d)}
                aria-label={`Open ${DAY_SHORT[i]} ${d.getDate()}`}
                style={{ background: 'none' }}
              >
                <div className="weekrow__dow">{DAY_SHORT[i]}</div>
                <div className="weekrow__num">{d.getDate()}</div>
              </button>

              <button className="weekrow__main" onClick={() => onPickDate(d)} style={{ background: 'none', textAlign: 'left' }}>
                <div className="weekrow__active">
                  {s.active}
                  {s.calm && <span className="pill pill--calm">Calm</span>}
                  {out && <span className="pill pill--sun">☀️</span>}
                </div>
                <div className="weekrow__sub">
                  <span>
                    <b>Legs</b> {s.legs}
                  </span>
                  <span>
                    <b>Hair</b> {maskNight(i) ? 'Mask' : '—'}
                  </span>
                </div>
              </button>

              <button
                className={`sunbtn${out ? ' sunbtn--on' : ''}`}
                onClick={() => toggleOutdoor(k)}
                aria-pressed={out}
                aria-label={`${out ? 'Clear' : 'Flag'} outdoor day for ${DAY_SHORT[i]}`}
              >
                ☀️
              </button>
            </div>
          )
        })}
      </div>
      <div className="note">
        A flagged day swaps the morning sunscreen to La Roche-Posay UV Mune 400, makes the birch stick on your shins
        required, adds BoJ matte stick reapplication every 2 hours, and puts the Gokujyun oil first in that night's
        cleanse. Flag them ahead for the whole week — the daily view picks it up.
      </div>

      <div className="section-title">The week at a glance</div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="glance">
          <thead>
            <tr>
              <th>Day</th>
              <th>Face active</th>
              <th>Legs</th>
              <th>Hair</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 7 }, (_, i) => {
              const s = weekSummary(phaseId, i)
              return (
                <tr key={i}>
                  <td>{s.day}</td>
                  <td>{s.active}</td>
                  <td>{mistNight(i) ? 'Mist + lotion' : 'Lotion'}</td>
                  <td>{maskNight(i) ? 'Mask' : '—'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="section-title">Hard rules</div>
      <div className="card">
        <ul className="rules">
          {HARD_RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

