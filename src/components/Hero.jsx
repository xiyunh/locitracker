import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroPoster from '../assets/hero-poster.webp'
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
  return (
    <section className="relative min-h-[94vh] overflow-hidden">
      {/* product film as the backdrop */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[68%_50%]"
        poster={heroPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/hero-loop-v2.webm" type="video/webm" />
        <source src="/video/hero-loop-v2.mp4" type="video/mp4" />
      </video>
      {/* soft scrim behind the side notes */}
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-gradient-to-l from-charcoal/70 via-charcoal/30 to-transparent lg:block" />
      {/* keep the header readable over the darker shots */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-charcoal/90 to-transparent" />
      {/* a soft scrim on the text side so the words stay legible over the film */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/20 lg:via-charcoal/75 lg:to-transparent" />

      {/* the map dissolves into the white collection band below */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-white/60 to-white lg:h-64" />

      <div className="relative z-10 mx-auto grid min-h-[94vh] w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-16 lg:grid-cols-[1fr_auto] lg:gap-10 lg:px-10 lg:pt-36">
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

        {/* dimension side notes, out on the film */}
        <ul className="flex flex-wrap gap-x-8 gap-y-5 lg:flex-col lg:items-end lg:gap-8 lg:text-right">
          {notes.map(([value, label], i) => (
            <motion.li key={label} {...reveal(0.6 + i * 0.08)} className="[text-shadow:0_1px_12px_rgba(227,229,237,0.9)]">
              <div className="hairline-gold hidden w-9 lg:ml-auto lg:block" />
              <p className="mt-2 font-sans text-3xl leading-none font-light tracking-tight text-cream/80 sm:text-4xl">{value}</p>
              <p className="mt-1.5 text-[0.62rem] tracking-[0.25em] text-cream/55 uppercase">{label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
