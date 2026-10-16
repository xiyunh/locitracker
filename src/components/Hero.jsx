import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldMap from './WorldMap'
import productShot from '../assets/product-stickers.webp'
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

  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      {/* world map / GPS backdrop — the glass refracts this */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[-2%] left-1/2 aspect-[2/1] w-[min(1560px,124%)] -translate-x-1/2 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_60%,transparent_100%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid min-h-[94vh] w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-16 lg:grid-cols-[0.9fr_1.2fr_auto] lg:gap-6 lg:px-10 lg:pt-36">
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

        {/* the stickers themselves, floating over the map */}
        <motion.figure
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none lg:scale-110"
        >
          <motion.img
            src={productShot}
            alt="Two Loci sticker trackers, card-sized with the compass mark"
            width={1600}
            height={855}
            fetchPriority="high"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full drop-shadow-[0_30px_50px_rgba(23,37,60,0.22)]"
          />
        </motion.figure>

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
