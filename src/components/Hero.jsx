import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WorldMap from './WorldMap'
import { Button } from './ui'

const stats = [
  { value: '<2 mm', label: 'thin enough for a passport' },
  { value: '18 mo', label: 'on one battery' },
  { value: '1 tap', label: 'to pair' },
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
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-36 pb-20 lg:pt-40">
      {/* faded world map / GPS backdrop */}
      <motion.div
        style={{ y: mapY }}
        className="pointer-events-none absolute top-[4%] left-1/2 aspect-[2/1] w-[min(1360px,106%)] -translate-x-1/2 opacity-70 [mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)] [-webkit-mask-image:radial-gradient(ellipse_76%_70%_at_50%_46%,black_50%,transparent_96%)]"
      >
        <WorldMap className="h-full w-full" />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10">
        <div>
          <motion.p {...reveal(0.05)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            The world&apos;s first sticker tracker
          </motion.p>

          <motion.h1
            {...reveal(0.15)}
            className="mt-7 font-display text-7xl leading-[0.93] font-medium tracking-tight text-cream sm:text-8xl lg:text-[7.6rem]"
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

        <ul className="flex flex-row flex-wrap gap-8 lg:flex-col lg:items-end lg:gap-10 lg:text-right">
          {stats.map((s, i) => (
            <motion.li key={s.value} {...reveal(0.5 + i * 0.12)}>
              <p className="font-sans text-5xl leading-none font-light tracking-tight text-cream/70 sm:text-6xl">
                {s.value}
              </p>
              <p className="mt-2 text-[0.72rem] text-cream/35">{s.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
