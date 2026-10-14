import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import StickerTag from './StickerTag'
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
    accent: 'from-brand/60',
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
    accent: 'from-brand/50',
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
    accent: 'from-brand/70',
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
    accent: 'from-brand/40',
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
    accent: 'from-brand/55',
  },
]

function FindMyMockup({ metrics, accent }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accent} to-charcoal-mid p-6 shadow-2xl shadow-black/30`}
    >
      <ScrollReveal variant="fade" delay={0}>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs tracking-widest text-cream/60 uppercase">Loci</span>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-gold/60" />
            <div className="h-2 w-2 rounded-full bg-white/20" />
          </div>
        </div>
      </ScrollReveal>
      <ScrollReveal variant="scale" delay={1}>
        <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-brand/30">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-2 border-brand-muted/50" />
            <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(210,180,120,0.6)]" />
          </div>
        </div>
      </ScrollReveal>
      <div className="space-y-3">
        {metrics.map((m, i) => (
          <ScrollReveal key={m.label} variant="left" delay={i + 2}>
            <div className="glass-soft rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-cream/60">{m.label}</span>
                <span className="text-lg font-medium text-cream">{m.value}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full w-3/4 rounded-full ${m.color}`} />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal variant="up" delay={5} className="mt-6 flex justify-center">
        <StickerTag size={48} />
      </ScrollReveal>
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
            <FindMyMockup metrics={moment.metrics} accent={moment.accent} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
