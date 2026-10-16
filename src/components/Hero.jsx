import { useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldMap from './WorldMap'
import { Button } from './ui'

// side notes — real dimensions, nothing invented
const notes = [
  ['85.6 mm', 'card width'],
  ['54 mm', 'card height'],
  ['<2 mm', 'profile'],
  ['18 mo', 'battery'],
  ['1 tap', 'to pair'],
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const mapY = useTransform(scrollY, [0, 700], [0, 60])

  // the sheen follows the pointer, like real glass catching light
  const trackSheen = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }, [])

  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      {/* refraction filter for the glass sheet (chromium) — gently warps whatever sits behind it */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <filter id="glass-refract" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0032 0.0048" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
          <feDisplacementMap in="SourceGraphic" in2="soft" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      {/* world map / GPS backdrop — the glass refracts this */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[-2%] left-1/2 aspect-[2/1] w-[min(1560px,124%)] -translate-x-1/2 [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,black_70%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,black_70%,transparent_100%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      {/* one sheet of glass over the left half, top edge to bottom edge */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={trackSheen}
        className="liquid-glass band absolute inset-y-0 left-0 w-full lg:w-[54%]"
      />

      <div className="relative z-10 mx-auto grid min-h-[94vh] w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-10 lg:pt-36">
        <div className="lg:pr-10">
          <motion.p {...reveal(0.15)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            The world&apos;s first sticker tracker
          </motion.p>

          <motion.h1
            {...reveal(0.25)}
            className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.4rem]"
          >
            Find
            <br />
            <span className="text-[#8d97a9]">anything.</span>
          </motion.h1>

          <motion.p {...reveal(0.38)} className="mt-8 max-w-sm text-base leading-relaxed text-cream/55">
            Peel, stick, and stop losing things.
          </motion.p>

          <motion.div {...reveal(0.5)} className="mt-10 flex flex-wrap items-center gap-6">
            <Button to="/pre-order" size="lg" className="group min-w-48 text-base">
              Pre Order
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Link
              to="/product/loci-sticker-single"
              className="btn-glass inline-flex min-h-[3.25rem] items-center rounded-md px-7 text-sm font-medium text-cream"
            >
              See the sticker
            </Link>
          </motion.div>
        </div>

        {/* dimension side notes, out on the map */}
        <ul className="flex flex-wrap gap-x-8 gap-y-5 lg:flex-col lg:items-end lg:gap-8 lg:text-right">
          {notes.map(([value, label], i) => (
            <motion.li key={label} {...reveal(0.6 + i * 0.08)}>
              <div className="hairline-gold hidden w-9 lg:ml-auto lg:block" />
              <p className="mt-2 font-sans text-3xl leading-none font-light tracking-tight text-cream/75 sm:text-4xl">{value}</p>
              <p className="mt-1.5 text-[0.62rem] tracking-[0.25em] text-cream/40 uppercase">{label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
