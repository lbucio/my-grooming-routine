import Thumb from './Thumb.jsx'

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8.5 6 12.5 14 3.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function badgeClass(badge) {
  if (/outdoor|every 2|required/i.test(badge)) return 'pill--sun'
  if (/active|pdrn|mask night|treatment|tonight/i.test(badge)) return 'pill--accent'
  if (/am only|every morning/i.test(badge)) return 'pill--am'
  return 'pill--quiet'
}

export default function StepList({ groups, isDone, onToggle, onOpenProduct }) {
  return (
    <>
      {groups.map((group) => {
        if (group.steps.length === 0) return null
        const done = group.steps.filter((s) => isDone(s.id)).length
        return (
          <section className="group" key={group.id}>
            <div className="group__head">
              <h3 className="group__title">{group.title}</h3>
              <span className="group__meta">
                {done}/{group.steps.length}
              </span>
            </div>
            <div className="card">
              {group.steps.map((step) => (
                <div className={`step${isDone(step.id) ? ' step--done' : ''}`} key={step.id}>
                  <button className="step__main" onClick={() => onToggle(step.id)} aria-pressed={isDone(step.id)}>
                    <span className={`check${isDone(step.id) ? ' check--on' : ''}`} aria-hidden="true">
                      <Tick />
                    </span>
                    <span className="step__body">
                      <span className="step__top">
                        <span className="step__title">{step.title}</span>
                        {step.badge && <span className={`pill ${badgeClass(step.badge)}`}>{step.badge}</span>}
                        {step.optional && <span className="step__opt">{step.optionalNote || 'optional'}</span>}
                      </span>
                      <span className="step__detail">{step.detail}</span>
                    </span>
                  </button>
                  {step.productId && (
                    <button
                      className="step__thumb"
                      onClick={() => onOpenProduct(step.productId)}
                      aria-label={`About ${step.title}`}
                    >
                      <Thumb productId={step.productId} size="sm" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {group.note && <p className="group__note">{group.note}</p>}
          </section>
        )
      })}
    </>
  )
}
