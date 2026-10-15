import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import WorldMap from './WorldMap'
import StickerTag from './StickerTag'
import appMap from '../assets/app-map.png'
import { Button } from './ui'

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

const chips = [
  { value: '<2 mm', label: 'thin', className: '-left-6 top-14 lg:-left-16' },
  { value: '18 mo', label: 'battery', className: '-right-4 top-1/2 lg:-right-14' },
  { value: '1 tap', label: 'to pair', className: '-left-2 bottom-16 lg:-left-10' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const mapY = useTransform(scrollY, [0, 700], [0, 40])
  const phoneY = useTransform(scrollY, [0, 700], [0, -30])

  return (
    <section className="relative mx-3 mt-28 overflow-hidden rounded-[2rem] bg-white pt-16 pb-24 md:mx-6 lg:mt-32 lg:pt-20 lg:pb-32">
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[-4%] left-1/2 aspect-[2/1] w-[min(1200px,110%)] -translate-x-1/2 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black_45%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_70%_70%_at_50%_45%,black_45%,transparent_95%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <motion.p {...reveal(0.05)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            The world&apos;s first sticker tracker
          </motion.p>
          <motion.h1
            {...reveal(0.15)}
            className="mt-6 font-display text-7xl leading-[0.92] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.4rem]"
          >
            Find
            <br />
            <span className="text-[#c9ab6e]">anything.</span>
          </motion.h1>
          <motion.p {...reveal(0.3)} className="mt-7 max-w-md text-base leading-relaxed text-cream/60">
            A tracker thin enough to stick to a passport, a remote, or a bike frame — and a
            finding network that brings it back when it wanders.
          </motion.p>
          <motion.div {...reveal(0.42)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button to="/product/loci-sticker-single" size="lg" className="group">
              Shop the sticker
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button to="/pre-order" variant="secondary" size="lg" className="group">
              Pre order
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
          <motion.p {...reveal(0.6)} className="mt-6 text-xs text-cream-muted">
            From $29 · first drop ships to pre-orders first
          </motion.p>
        </div>

        <motion.div
          style={{ y: phoneY }}
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[18rem] lg:max-w-[20rem]"
        >
          <img
            src={appMap}
            alt="Loci app map view with tagged items pinned nearby"
            className="w-full rounded-[2rem] border border-white/15 shadow-[0_40px_80px_rgba(23,37,60,0.28)]"
          />
          {chips.map((chip, i) => (
            <motion.div
              key={chip.value}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`glass absolute flex items-baseline gap-2 rounded-full px-4 py-2 ${chip.className}`}
            >
              <span className="font-display text-xl leading-none text-cream">{chip.value}</span>
              <span className="text-[0.6rem] tracking-[0.2em] text-cream-muted uppercase">{chip.label}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 16, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 12 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -right-10 -bottom-6 hidden lg:block"
          >
            <StickerTag size={96} peel sheen />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
