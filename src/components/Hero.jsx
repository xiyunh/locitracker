import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import productCards from '../assets/product-cards-keyed.webp'
import { Button } from './ui'

const stats = [
  { value: '<2 mm', label: 'thin' },
  { value: '18 mo', label: 'battery' },
  { value: '1 tap', label: 'to pair' },
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, 40])

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-36 pb-16 lg:pt-32">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:px-10">
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

          <motion.ul {...reveal(0.6)} className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <li key={s.value}>
                <p className="font-sans text-2xl leading-none font-light tracking-tight text-cream/70">{s.value}</p>
                <p className="mt-1 text-[0.65rem] tracking-[0.2em] text-cream/35 uppercase">{s.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:-mr-10"
        >
          <img
            src={productCards}
            alt="Two Loci sticker trackers, card-sized, with the compass mark"
            className="w-full drop-shadow-[0_30px_50px_rgba(23,37,60,0.18)]"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
