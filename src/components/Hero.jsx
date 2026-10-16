import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldMap from './WorldMap'
import productCards from '../assets/product-cards-keyed.webp'
import { Button } from './ui'

// side notes beside the cards — real dimensions, nothing invented
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
  const cardsY = useTransform(scrollY, [0, 700], [0, 30])

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-36 pb-16 lg:pt-32">
      {/* faded world map / GPS backdrop */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[4%] left-1/2 aspect-[2/1] w-[min(1360px,106%)] -translate-x-1/2 opacity-70 [mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-10">
        <div>
          <motion.p {...reveal(0.05)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            The world&apos;s first sticker tracker
          </motion.p>

          <motion.h1
            {...reveal(0.15)}
            className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.4rem]"
          >
            Find
            <br />
            <span className="text-[#8d97a9]">anything.</span>
          </motion.h1>

          <motion.p {...reveal(0.3)} className="mt-8 max-w-sm text-base leading-relaxed text-cream/55">
            Peel, stick, and stop losing things.
          </motion.p>

          <motion.div {...reveal(0.42)} className="mt-10 flex flex-wrap items-center gap-6">
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
        </div>

        {/* cards floating on the map, dimension notes beside them */}
        <motion.div
          style={{ y: cardsY }}
          initial={{ opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:pr-28"
        >
          <img
            src={productCards}
            alt="Two Loci sticker trackers, card-sized, with the compass mark"
            className="w-full"
            fetchPriority="high"
          />
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:flex-col lg:gap-6 lg:-translate-y-1/2">
            {notes.map(([value, label], i) => (
              <motion.li key={label} {...reveal(0.7 + i * 0.08)}>
                <div className="hairline-gold hidden w-9 lg:block" />
                <p className="mt-2 font-sans text-xl leading-none font-light tracking-tight text-cream/75">{value}</p>
                <p className="mt-1 text-[0.6rem] tracking-[0.25em] text-cream/40 uppercase">{label}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
