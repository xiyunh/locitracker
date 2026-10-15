import { Bell, Bluetooth, MapPinned, Navigation, Radar, ShieldCheck, Volume2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { Eyebrow } from './ui'

const deviceFeatures = [
  {
    icon: Radar,
    title: 'Nearby guidance',
    text: 'Follow distance and sound cues when your item is close by.',
  },
  {
    icon: Volume2,
    title: 'Sound alerts',
    text: 'Ping the device from the app when it slips under cushions or into bags.',
  },
  {
    icon: Bluetooth,
    title: 'Peel, stick, pair',
    text: 'Thin enough for a passport. Pairs with your phone in a tap.',
  },
]

const appFeatures = [
  {
    icon: MapPinned,
    title: 'Live item view',
    text: 'See essentials grouped by location, status, and last-seen time.',
  },
  {
    icon: Bell,
    title: 'Left-behind alerts',
    text: 'Get a nudge when important items stop moving with you.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    text: 'Location signals stay encrypted, anonymous, and built for trust.',
  },
]

function FeatureRow({ feature, index }) {
  const Icon = feature.icon

  return (
    <ScrollReveal
      as="li"
      variant="left"
      delay={index}
      className="flex gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-white/10">
        <Icon size={20} strokeWidth={1.5} />
      </span>
      <span>
        <span className="block font-display text-xl font-medium text-cream">{feature.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-cream/65">{feature.text}</span>
      </span>
    </ScrollReveal>
  )
}

function AppMockup() {
  return (
    <ScrollReveal
      variant="right"
      delay={1}
      className="glass relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40"
    >
      <div className="border-b border-white/10 bg-brand/10 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.25em] text-cream/70 uppercase">Loci App</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
        </div>
        <h3 className="mt-5 font-display text-3xl font-medium text-cream">Your essentials</h3>
      </div>

      <div className="p-5">
        <div className="relative mb-5 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand/15 to-charcoal-mid">
          <div className="absolute h-36 w-36 rounded-full border border-gold/20" />
          <div className="absolute h-24 w-24 rounded-full border border-gold/30" />
          <div className="absolute h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_rgba(210,180,120,0.9)]" />
          <Navigation size={38} strokeWidth={1.2} className="relative z-10 text-cream/80" />
        </div>

        <div className="space-y-3">
          {[
            ['Keys', '3 ft away', 'Nearby'],
            ['Backpack', 'With you', 'Connected'],
            ['Carry-on', 'Terminal 2', 'Last seen 2m ago'],
          ].map(([name, location, status]) => (
            <div key={name} className="glass-soft rounded-lg p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-cream">{name}</span>
                <span className="text-xs text-gold-light">{location}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-cream/55">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function DeviceAppShowcase() {
  return (
    <section className="border-y border-white/5 bg-charcoal py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <AppMockup />

        <div>
          <ScrollReveal variant="up" delay={0}>
            <Eyebrow>Device + App</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] font-medium text-cream sm:text-6xl">
              Built for finding fast, then getting back to your day.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70">
              Loci combines a sticker-thin tracker with a clear companion app, so every item has a
              status, a sound, and a way home.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ul>
              {deviceFeatures.map((feature, index) => (
                <FeatureRow key={feature.title} feature={feature} index={index} />
              ))}
            </ul>
            <ul>
              {appFeatures.map((feature, index) => (
                <FeatureRow key={feature.title} feature={feature} index={index + 2} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
