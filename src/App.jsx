import { useCallback, useMemo, useState } from 'react'
import DailyView from './components/DailyView.jsx'
import WeeklyView from './components/WeeklyView.jsx'
import ProductsView from './components/ProductsView.jsx'
import ProductSheet from './components/ProductSheet.jsx'
import { useStored } from './lib/storage.js'
import { dateKey, formatLong, startOfWeek } from './lib/date.js'

const TABS = [
  { id: 'daily', icon: '🧴', label: 'Today' },
  { id: 'weekly', icon: '🗓️', label: 'Week' },
  { id: 'products', icon: '📋', label: 'Products' }
]

export default function App() {
  const [tab, setTab] = useState('daily')
  const [selectedKey, setSelectedKey] = useState(() => dateKey(new Date()))
  const [weekOffset, setWeekOffset] = useState(0)
  const [sheet, setSheet] = useState(null)

  const [phaseId, setPhaseId] = useStored('phase', 'month1')
  const [outdoorDays, setOutdoorDays] = useStored('outdoor', {})
  const [checks, setChecks] = useStored('checks', {})
  const [pureDiaStart, setPureDiaStart] = useStored('pureDiaStart', null)

  // Stable identity so the routine builder's memo actually holds between renders.
  const date = useMemo(() => {
    const [y, m, d] = selectedKey.split('-').map(Number)
    return new Date(y, m - 1, d)
  }, [selectedKey])

  const toggleOutdoor = useCallback(
    (key) => {
      setOutdoorDays((prev) => {
        const next = { ...prev }
        if (next[key]) delete next[key]
        else next[key] = true
        return next
      })
    },
    [setOutdoorDays]
  )

  const toggleCheck = useCallback(
    (key, stepId) => {
      setChecks((prev) => {
        const day = { ...(prev[key] || {}) }
        if (day[stepId]) delete day[stepId]
        else day[stepId] = true
        const next = { ...prev }
        if (Object.keys(day).length === 0) delete next[key]
        else next[key] = day
        return next
      })
    },
    [setChecks]
  )

  const pickDate = useCallback((d) => {
    setSelectedKey(dateKey(d))
    setTab('daily')
  }, [])

  const todayKey = dateKey(new Date())
  const subtitle =
    tab === 'daily'
      ? selectedKey === todayKey
        ? `Today · ${formatLong(date)}`
        : formatLong(date)
      : tab === 'weekly'
      ? 'Week starting Sunday'
      : 'Everything in the haul'

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar__row">
          <h1 className="topbar__title">
            {tab === 'daily' ? 'Daily routine' : tab === 'weekly' ? 'Weekly routine' : 'Products'}
          </h1>
          {tab === 'daily' && selectedKey !== todayKey && (
            <button className="iconbtn" style={{ width: 'auto', padding: '0 12px' }} onClick={() => setSelectedKey(todayKey)}>
              Today
            </button>
          )}
        </div>
        <div className="topbar__sub">{subtitle}</div>
      </header>

      {tab === 'daily' && (
        <DailyView
          date={date}
          onPickDate={(d) => setSelectedKey(dateKey(d))}
          phaseId={phaseId}
          outdoorDays={outdoorDays}
          toggleOutdoor={toggleOutdoor}
          pureDiaStart={pureDiaStart}
          checks={checks}
          toggleCheck={toggleCheck}
          onOpenProduct={setSheet}
        />
      )}

      {tab === 'weekly' && (
        <WeeklyView
          weekOffset={weekOffset}
          setWeekOffset={setWeekOffset}
          phaseId={phaseId}
          setPhaseId={setPhaseId}
          outdoorDays={outdoorDays}
          toggleOutdoor={toggleOutdoor}
          onPickDate={pickDate}
        />
      )}

      {tab === 'products' && (
        <ProductsView onOpenProduct={setSheet} pureDiaStart={pureDiaStart} setPureDiaStart={setPureDiaStart} />
      )}

      <nav className="tabbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab${tab === t.id ? ' tab--on' : ''}`}
            onClick={() => {
              setTab(t.id)
              if (t.id === 'weekly') setWeekOffset(0)
              window.scrollTo({ top: 0 })
            }}
            aria-current={tab === t.id ? 'page' : undefined}
          >
            <span className="tab__icon">{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <ProductSheet productId={sheet} onClose={() => setSheet(null)} />
    </div>
  )
}
