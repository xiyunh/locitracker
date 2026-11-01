import ScrollReveal from './ScrollReveal'
import WorldMap from './WorldMap'
import { Eyebrow } from './ui'

/**
 * Page hero. `tone`:
 *  - 'default' — light, centered (most pages)
 *  - 'navy'    — brand-navy slab with a faint world map, left-aligned (Why Loci)
 *  - 'ink'     — near-black slab with grid texture and gold glow (Enterprise)
 */
export default function PageHeader({ label, title, emphasis, subtitle, tone = 'default' }) {
  if (tone === 'navy' || tone === 'ink') {
    const isNavy = tone === 'navy'
    return (
      <div className={isNavy ? 'px-3 pt-28 md:px-6 lg:pt-32' : ''}>
        <div
          className={
            isNavy
              ? 'relative overflow-hidden rounded-[2rem] bg-brand px-6 py-16 lg:px-10 lg:py-24'
              : 'relative overflow-hidden bg-[#0a1a29] px-6 pt-36 pb-16 lg:px-10 lg:pt-44 lg:pb-24'
          }
        >
          {isNavy ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_90%_at_72%_45%,black_25%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_75%_90%_at_72%_45%,black_25%,transparent_78%)]"
            >
              <WorldMap className="h-full w-full scale-[1.4]" />
            </div>
          ) : (
            <>
              <div aria-hidden="true" className="grid-texture absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-gradient-to-br from-[#d7bda2]/25 via-brand-light/15 to-transparent blur-3xl"
              />
            </>
          )}

          <div className="relative mx-auto max-w-7xl">
            <ScrollReveal variant="up" delay={0} className="max-w-3xl">
              <p className="flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.35em] text-[#d7bda2] uppercase">
                <span className="h-px w-8 shrink-0 bg-[#d7bda2]/70" aria-hidden="true" />
                {label}
              </p>
              <h1 className="mt-6 font-display text-6xl leading-[0.98] font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
                {title}{' '}
                {emphasis && <em className="font-normal text-[#d7bda2]">{emphasis}</em>}
              </h1>
              {subtitle && (
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">{subtitle}</p>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-charcoal pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <ScrollReveal variant="up" delay={0} className="relative">
          <Eyebrow>{label}</Eyebrow>
          <h1 className="mt-5 font-display text-6xl leading-[1] font-medium tracking-tight text-cream sm:text-7xl lg:text-8xl">
            {title}{' '}
            {emphasis && <em className="font-normal text-gold-light">{emphasis}</em>}
          </h1>
          {subtitle && <p className="mx-auto mt-6 max-w-2xl text-cream-muted">{subtitle}</p>}
        </ScrollReveal>
      </div>
    </div>
  )
}
