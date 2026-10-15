import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import appMap from '../assets/app-map.png'
import { popUpTransition } from '../lib/scrollAnimations'

const moments = [
  {
    id: 'morning',
    label: 'Leaving home',
    quote: 'I used to tear the house apart for my keys. Now I just open the Loci app.',
    author: 'Jussi L., Loci Customer',
    metrics: [
      { label: 'Keys', value: 'Home', color: 'bg-emerald-500' },
      { label: 'Wallet', value: 'Home', color: 'bg-emerald-500' },
      { label: 'Backpack', value: 'With you', color: 'bg-brand-light' },
    ],
    accent: 'from-brand/15',
  },
  {
    id: 'airport',
    label: 'At the airport',
    quote: null,
    author: null,
    metrics: [
      { label: 'Carry-on', value: 'Gate B12', color: 'bg-brand-light' },
      { label: 'Checked bag', value: 'Carousel 4', color: 'bg-emerald-500' },
      { label: 'Passport pouch', value: 'With you', color: 'bg-brand-muted' },
    ],
    accent: 'from-brand/12',
  },
  {
    id: 'lost',
    label: 'Keys misplaced',
    quote: 'The sound and distance cues led me straight to the couch cushions.',
    author: 'Linda D., Loci Customer',
    metrics: [
      { label: 'Distance', value: '6 ft away', color: 'bg-brand-light' },
      { label: 'Direction', value: '→ Left', color: 'bg-brand-muted' },
      { label: 'Play Sound', value: 'Enabled', color: 'bg-emerald-500' },
    ],
    accent: 'from-brand/18',
  },
  {
    id: 'park',
    label: 'Kids at the park',
    quote: 'Peace of mind knowing the stroller tag is always trackable.',
    author: 'Rhonda C., Loci Customer',
    metrics: [
      { label: 'Stroller', value: 'Playground', color: 'bg-emerald-500' },
      { label: 'Last seen', value: '2 min ago', color: 'bg-brand-light' },
      { label: 'Notify When Left', value: 'On', color: 'bg-brand-muted' },
    ],
    accent: 'from-brand/10',
  },
  {
    id: 'travel',
    label: 'On a trip',
    quote: null,
    author: null,
    metrics: [
      { label: 'Luggage', value: 'Hotel room', color: 'bg-emerald-500' },
      { label: 'Camera bag', value: 'Lobby', color: 'bg-amber-500' },
      { label: 'Shared with', value: '3 people', color: 'bg-brand-light' },
    ],
    accent: 'from-brand/14',
  },
]

function FindMyMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xs">
      <img
        src={appMap}
        alt="Loci app — map view with tagged items pinned around campus"
        className="w-full rounded-[1.8rem] border border-white/15 shadow-2xl shadow-black/25"
        loading="lazy"
      />
      <p className="mt-4 text-center text-[0.6rem] tracking-[0.3em] text-cream-muted uppercase">
        Map view · Loci app beta
      </p>
    </div>
  )
}

export default function DayInLife() {
  const [active, setActive] = useState(0)
  const moment = moments[active]

  return (
    <section id="experience" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal variant="fade" delay={0}>
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 lg:gap-0">
            {moments.map((m, i) => (
              <ScrollReveal
                key={m.id}
                as="button"
                type="button"
                variant="up"
                delay={i}
                onClick={() => setActive(i)}
                className={`-mb-[1.5rem] border-b-2 px-4 py-3 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors lg:flex-1 lg:text-center ${
                  active === i
                    ? 'border-gold text-cream'
                    : 'border-transparent text-cream-muted hover:text-cream'
                }`}
              >
                {m.label}
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={moment.id}
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={popUpTransition(0)}
            >
              <h3 className="font-display text-5xl font-medium text-cream lg:text-6xl">
                {moment.label}
              </h3>
              {moment.quote && (
                <blockquote className="mt-8 border-l-2 border-gold/50 pl-6">
                  <p className="font-display text-3xl leading-snug text-cream/80 italic lg:text-4xl">
                    {moment.quote}
                  </p>
                  <cite className="mt-4 block text-[0.7rem] tracking-[0.2em] text-cream-muted uppercase not-italic">
                    {moment.author}
                  </cite>
                </blockquote>
              )}
              {!moment.quote && (
                <p className="mt-6 text-cream-muted">
                  The Loci network helps you locate items even when they&apos;re far away.
                </p>
              )}
            </motion.div>
            <FindMyMockup />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
