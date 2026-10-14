import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import WorldMap from './WorldMap'
import { Button } from './ui'

const stats = [
  { value: '<2 mm', label: 'profile — thin enough for a passport' },
  { value: '18 mo', label: 'battery life on one coin cell' },
  { value: '1 tap', label: 'to pair with the Loci app' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const mapY = useTransform(scrollY, [0, 700], [0, 50])

  return (
    <section className="vignette relative flex min-h-screen flex-col overflow-hidden bg-charcoal pt-36 pb-10 lg:pt-40">
      {/* Soft, faded world map / GPS backdrop */}
      <motion.div
        style={{ y: mapY }}
        className="absolute top-[6%] left-1/2 aspect-[2/1] w-[min(1360px,106%)] -translate-x-1/2 opacity-80 [mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_55%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_55%,transparent_96%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      {/* Vertical hairline stripes over the left half */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full opacity-45 lg:w-[58%] [mask-image:linear-gradient(to_right,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_right,black_70%,transparent)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(245,240,232,0.07) 0 1px, transparent 1px 86px)',
        }}
      />
      <div className="spotlight -top-[22%] -left-[14%]" />
      <div className="spotlight spotlight-gold -right-[18%] top-[12%]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        {/* Left: badge, headline, intro */}
        <div className="flex flex-col justify-center">
          <motion.p
            {...reveal(0.05)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[0.62rem] tracking-[0.22em] text-cream/70 uppercase backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
            The world&apos;s first sticker tracker
          </motion.p>

          <motion.h1
            {...reveal(0.15)}
            className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.6rem]"
          >
            Find
            <br />
            <span className="text-gold-light">anything.</span>
          </motion.h1>

          <motion.p
            {...reveal(0.3)}
            className="mt-8 max-w-sm text-sm leading-relaxed text-cream/60"
          >
            Loci is a tracker thin enough to live on a passport, a remote, or a
            bike frame — and a finding network that brings it back when it
            wanders. Peel, stick, and stop losing things.
          </motion.p>

          <motion.p
            {...reveal(1.0)}
            className="mt-auto hidden items-center gap-2 pt-16 text-[0.65rem] tracking-[0.25em] text-cream-muted uppercase lg:inline-flex"
          >
            Discover how it works
            <ArrowDownRight size={13} className="text-gold" />
          </motion.p>
        </div>

        {/* Right: stat stack + CTA */}
        <div className="flex flex-col justify-center gap-10 lg:items-end lg:text-right">
          <ul className="flex flex-row flex-wrap gap-8 lg:flex-col lg:gap-9">
            {stats.map((s, i) => (
              <motion.li key={s.value} {...reveal(0.4 + i * 0.12)}>
                <p className="font-display text-5xl leading-none text-cream sm:text-6xl">
                  {s.value}
                </p>
                <p className="mt-2 max-w-[13rem] text-xs leading-relaxed text-cream-muted lg:ml-auto">
                  {s.label}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.div {...reveal(0.85)} className="flex flex-col gap-5 lg:items-end">
            <p className="max-w-xs text-sm leading-relaxed text-cream/60">
              Pre-order the first run, and be first on the network when Loci
              ships.
            </p>
            <Button to="/pre-order" size="lg" className="group w-fit">
              Pre Order
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
