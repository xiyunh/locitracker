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
  const mapY = useTransform(scrollY, [0, 700], [0, 50])

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-36 pb-16 lg:pt-32">
      {/* faded world map / GPS backdrop */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[4%] left-1/2 aspect-[2/1] w-[min(1360px,106%)] -translate-x-1/2 opacity-80 [mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:px-10">
        {/* frosted column lifts the headline off the map */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass max-w-xl rounded-[2rem] px-8 py-12 sm:px-12 sm:py-14 lg:px-14 lg:py-16"
        >
          <motion.p {...reveal(0.15)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            The world&apos;s first sticker tracker
          </motion.p>

          <motion.h1
            {...reveal(0.25)}
            className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7rem]"
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
              className="text-sm text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              See the sticker
            </Link>
          </motion.div>
        </motion.div>

        {/* dimension side notes */}
        <ul className="flex flex-wrap gap-x-8 gap-y-5 lg:flex-col lg:items-end lg:gap-7 lg:text-right">
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
