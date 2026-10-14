import { Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BatteryFull, Ruler, Sticker } from 'lucide-react'
import WorldMap from './WorldMap'

// three.js is heavy; load the model chunk in parallel without blocking the hero.
const HeroModel = lazy(() => import('./HeroModel'))
import { Button } from './ui'

const proof = [
  { icon: Ruler, text: '<2 mm thick' },
  { icon: BatteryFull, text: '18 months battery life' },
  { icon: Sticker, text: 'Sticks on anything' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const mapY = useTransform(scrollY, [0, 700], [0, 50])
  const sceneY = useTransform(scrollY, [0, 700], [0, 90])

  return (
    <section className="vignette relative min-h-screen overflow-hidden bg-charcoal pt-32 pb-14 lg:pt-36">
      {/* Soft, faded world map / GPS backdrop */}
      <motion.div
        style={{ y: mapY }}
        className="absolute top-[3%] left-1/2 aspect-[2/1] w-[min(1360px,106%)] -translate-x-1/2 [mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_55%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_55%,transparent_96%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>
      <div className="spotlight -top-[22%] -left-[14%]" />
      <div className="spotlight spotlight-gold -right-[18%] top-[12%]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center lg:px-10">

        <motion.h1
          {...reveal(0.15)}
          className="mt-6 font-sans text-7xl leading-[0.98] font-semibold tracking-tight text-cream sm:text-8xl lg:text-[7.5rem]"
        >
          Find <em className="font-normal text-gold-light">anything.</em>
        </motion.h1>

        <motion.p
          {...reveal(0.3)}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg"
        >
          The world&apos;s first sticker tracker.
        </motion.p>

        <motion.div {...reveal(0.42)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button to="/pre-order" size="lg" className="group">
            Pre Order
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.ul
          {...reveal(0.55)}
          className="relative z-10 mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 rounded-full border border-white/10 bg-charcoal/65 px-7 py-3 backdrop-blur-md"
        >
          {proof.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-[0.7rem] tracking-[0.15em] text-cream-muted uppercase"
            >
              <Icon size={13} className="text-gold" />
              {text}
            </li>
          ))}
        </motion.ul>

        {/* 3D scene pops in the moment the page opens */}
        <motion.div
          style={{ y: sceneY }}
          initial={{ opacity: 0, scale: 0.7, y: 70, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 110, damping: 15, mass: 0.9, delay: 0.1 }}
          className="relative -z-[1] -mt-10 w-full sm:-mt-12"
        >
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold/25 via-brand-light/25 to-transparent blur-3xl sm:h-80 sm:w-80" />
            <Suspense fallback={<div className="h-[22rem] sm:h-[26rem] lg:h-[29rem]" />}>
              <HeroModel className="relative h-[22rem] cursor-grab [mask-image:linear-gradient(to_bottom,transparent_1%,black_22%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_1%,black_22%)] active:cursor-grabbing sm:h-[26rem] lg:h-[29rem]" />
            </Suspense>
            <p className="mt-1 text-center text-[0.6rem] tracking-[0.3em] text-cream-muted/70 uppercase">
              Drag to spin
            </p>

            {/* Card dimension callouts */}
            <div className="pointer-events-none absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 flex-col gap-7 lg:flex xl:-right-14">
              {[
                ['85.6 mm', 'Card width'],
                ['54 mm', 'Card height'],
                ['<2 mm', 'Profile'],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="hairline-gold w-9" />
                  <p className="mt-2 font-display text-xl leading-none text-gold-light">{value}</p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.3em] text-cream-muted uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
