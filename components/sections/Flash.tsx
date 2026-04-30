import { FLASH_CARDS } from '@/content/flash'

export default function Flash() {
  return (
    <section id="flash" className="section-border">
      <div className="flash-header">
        <div className="section-header">
          <h2 className="section-title">FLASH.</h2>
          <p className="section-sub">即兴短文 · 碎片思绪 · THOUGHTS IN PASSING</p>
        </div>
      </div>
      <div className="flash-grid">
        {FLASH_CARDS.map((card) => (
          <div
            key={card.id}
            className={[
              'flash-card',
              card.accent ? 'accent-card' : '',
              card.wide ? 'wide' : '',
            ].filter(Boolean).join(' ')}
          >
            <div className="flash-tag">{card.tag}</div>
            <p className="flash-body">{card.body}</p>
            <span className="flash-date">{card.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
