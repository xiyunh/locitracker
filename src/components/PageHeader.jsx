import ScrollReveal from './ScrollReveal'
import { Eyebrow } from './ui'

export default function PageHeader({ label, title, emphasis, subtitle }) {
  return (
    <div className="glow-top relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-brand/30 via-charcoal to-charcoal pt-36 pb-16 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <div className="spotlight -top-[30%] left-1/2 -translate-x-1/2" />
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
