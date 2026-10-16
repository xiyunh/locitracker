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
    <section className="relative overflow-hidden pt-28 lg:pt-32">
      {/* world map / GPS backdrop — the glass refracts this */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[-6%] left-1/2 aspect-[2/1] w-[min(1500px,120%)] -translate-x-1/2 [mask-image:radial-gradient(ellipse_80%_75%_at_50%_50%,black_55%,transparent_98%)] [-webkit-mask-image:radial-gradient(ellipse_80%_75%_at_50%_50%,black_55%,transparent_98%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[86vh] w-full max-w-7xl items-stretch gap-10 px-3 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-10">
        {/* a single tall glass column, only behind the text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={trackSheen}
          className="liquid-glass flex items-center rounded-[2.5rem] px-8 py-14 sm:px-12 lg:px-16 lg:py-20"
        >
          <div className="relative z-10">
            <motion.p {...reveal(0.15)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
              The world&apos;s first sticker tracker
            </motion.p>

            <motion.h1
              {...reveal(0.25)}
              className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.2rem]"
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
        </motion.div>

        {/* dimension side notes, out on the map */}
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-5 px-4 pb-10 lg:flex-col lg:items-end lg:justify-center lg:gap-8 lg:pb-0 lg:text-right">
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
