import { useMemo, useState } from 'react'
import StepList from './StepList.jsx'
import { buildDay, activeLabel, isCalmNight } from '../data/schedule.js'
import { DAY_SHORT, addDays, dateKey, formatLong, isToday, startOfWeek } from '../lib/date.js'

const AM_LABEL = { key: 'am', icon: '☀️', label: 'Morning' }
const PM_LABEL = { key: 'pm', icon: '🌙', label: 'Night' }

export default function DailyView({
  date,
  onPickDate,
  phaseId,
  outdoorDays,
  toggleOutdoor,
  pureDiaStart,
  checks,
  toggleCheck,
  onOpenProduct
}) {
  const [part, setPart] = useState(() => (new Date().getHours() >= 16 ? 'pm' : 'am'))
  const key = dateKey(date)
  const outdoor = !!outdoorDays[key]

  const day = useMemo(
    () => buildDay({ date, phaseId, outdoor, pureDiaStart }),
    [date, phaseId, outdoor, pureDiaStart]
  )

  const groups = part === 'am' ? day.am : day.pm
  const dayChecks = checks[key] || {}
  const isDone = (stepId) => !!dayChecks[stepId]

  const count = (gs) => {
    const all = gs.flatMap((g) => g.steps)
    return { done: all.filter((s) => isDone(s.id)).length, total: all.length }
  }
  const amCount = count(day.am)
  const pmCount = count(day.pm)
  const now = count(groups)
  const pct = now.total ? Math.round((now.done / now.total) * 100) : 0

  // A week of chips starting from this week's Sunday, so the strip matches the routine table.
  const weekStart = startOfWeek(date)
  const chips = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <>
      <div className="datestrip">
        {chips.map((d) => {
          const k = dateKey(d)
          const on = k === key
          return (
            <button
              key={k}
              className={`daychip${on ? ' daychip--on' : ''}${isToday(d) ? ' daychip--today' : ''}`}
              onClick={() => onPickDate(d)}
            >
              <div className="daychip__dow">{DAY_SHORT[d.getDay()]}</div>
              <div className="daychip__num">{d.getDate()}</div>
              <div className={`daychip__dot${outdoorDays[k] ? ' daychip__dot--sun' : ''}`} />
            </button>
          )
        })}
      </div>

      <div className="page" style={{ paddingTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span className="pill pill--accent">{activeLabel(phaseId, day.dayIndex)}</span>
          {isCalmNight(day.dayIndex) && <span className="pill pill--calm">Calm night</span>}
          {day.mask && <span className="pill pill--quiet">Hair mask</span>}
          {day.mist && <span className="pill pill--quiet">Leg mist</span>}
          {outdoor && <span className="pill pill--sun">☀️ Outdoors</span>}
        </div>

        <button
          className={`outdoor${outdoor ? ' outdoor--on' : ''}`}
          onClick={() => toggleOutdoor(key)}
          aria-pressed={outdoor}
        >
          <span className="outdoor__icon">{outdoor ? '🏞️' : '🏢'}</span>
          <span className="outdoor__text">
            <span className="outdoor__title">{outdoor ? 'Outdoors today' : 'Office day'}</span>
            <span className="outdoor__note">
              {part === 'am'
                ? outdoor
                  ? 'La Roche-Posay instead of the SKIN1004, birch stick on the shins, BoJ stick every 2 hours.'
                  : 'SKIN1004 sun serum — sunscreen every morning, indoors or out. Tap if you will be in the sun.'
                : outdoor
                ? 'Sun today, so tonight starts with the Gokujyun oil to get that sunscreen off. No SPF at night.'
                : 'Tonight starts with the oil or the balm, your call. Tap if you were in the sun today.'}
            </span>
          </span>
          <span className={`switch${outdoor ? ' switch--on' : ''}`} aria-hidden="true" />
        </button>

        <div className="seg" style={{ marginTop: 16 }}>
          {[AM_LABEL, PM_LABEL].map((p) => {
            const c = p.key === 'am' ? amCount : pmCount
            return (
              <button
                key={p.key}
                className={`seg__btn${part === p.key ? ' seg__btn--on' : ''}`}
                onClick={() => setPart(p.key)}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
                <span className="seg__count">
                  {c.done}/{c.total}
                </span>
              </button>
            )
          })}
        </div>

        <div className="progress" style={{ marginBottom: 18 }}>
          <div className="progress__fill" style={{ width: `${pct}%` }} />
        </div>

        <StepList groups={groups} isDone={isDone} onToggle={(id) => toggleCheck(key, id)} onOpenProduct={onOpenProduct} />

        {now.total > 0 && now.done === now.total && (
          <div className="donecard">
            {part === 'am' ? 'Morning done. Reapply if you head outside.' : 'Night done. One active a night, nothing more.'}
          </div>
        )}

        <div className="note">
          {formatLong(date)} · {part === 'am' ? 'Morning' : 'Night'} routine.{' '}
          {part === 'pm'
            ? 'One face active per night — the schedule already picked it.'
            : 'Vitamin C is morning only, so it never meets the retinol or the acids.'}
        </div>
      </div>
    </>
  )
}
