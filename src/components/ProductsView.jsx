import { PRODUCTS, PRODUCT_GROUPS } from '../data/products.js'
import { clearAll, STORAGE_BACKEND } from '../lib/storage.js'

export default function ProductsView({ onOpenProduct, pureDiaStart, setPureDiaStart }) {
  const byGroup = PRODUCT_GROUPS.map((g) => ({
    group: g,
    items: Object.values(PRODUCTS).filter((p) => p.group === g)
  })).filter((g) => g.items.length > 0)

  return (
    <div className="page">
      <div className="section-title">Settings</div>
      <div className="card">
        <div className="setting">
          <div className="setting__text">
            <div className="setting__title">PureDia gel — first night</div>
            <div className="setting__note">
              Every other night for week one, then nightly. Set the date and the night routine schedules it for you.
            </div>
          </div>
          <input
            type="date"
            value={pureDiaStart || ''}
            onChange={(e) => setPureDiaStart(e.target.value || null)}
            aria-label="PureDia gel start date"
          />
        </div>
        <div className="setting">
          <div className="setting__text">
            <div className="setting__title">Reset everything</div>
            <div className="setting__note">
              Clears checks, outdoor days and settings from this device's {STORAGE_BACKEND} storage.
            </div>
          </div>
          <button
            className="danger"
            onClick={() => {
              if (confirm('Clear all checks, outdoor days and settings?')) {
                clearAll()
                location.reload()
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {byGroup.map(({ group, items }) => (
        <div key={group}>
          <div className="section-title">{group}</div>
          <div className="card">
            {items.map((p) => (
              <button key={p.id} className="prod" onClick={() => onOpenProduct(p.id)}>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="prod__name" style={{ display: 'block' }}>
                    {p.name}
                  </span>
                  {p.sub && <span className="prod__sub" style={{ display: 'block' }}>{p.sub}</span>}
                  {p.korean && <span className="prod__kr" style={{ display: 'block' }}>{p.korean}</span>}
                </span>
                <span className="prod__chev">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="note" style={{ marginTop: 20 }}>
        Legs take 4–8 weeks before texture visibly changes. Quitting early is the usual failure.
      </div>
    </div>
  )
}
