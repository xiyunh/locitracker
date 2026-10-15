import appHistory from '../assets/app-history.png'
import appProfile from '../assets/app-profile.png'
import ScrollReveal from './ScrollReveal'
import { Eyebrow } from './ui'

const deviceFeatures = [
  {
    title: 'Nearby guidance',
    text: 'Follow distance and sound cues when your item is close by.',
  },
  {
    title: 'Sound alerts',
    text: 'Ping the device from the app when it slips under cushions or into bags.',
  },
  {
    title: 'Peel, stick, pair',
    text: 'Thin enough for a passport. Pairs with your phone in a tap.',
  },
]

const appFeatures = [
  {
    title: 'Live item view',
    text: 'See essentials grouped by location, status, and last-seen time.',
  },
  {
    title: 'Left-behind alerts',
    text: 'Get a nudge when important items stop moving with you.',
  },
  {
    title: 'Private by design',
    text: 'Location signals stay encrypted, anonymous, and built for trust.',
  },
]

function FeatureRow({ feature, index }) {
  return (
    <ScrollReveal
      as="li"
      variant="left"
      delay={index}
      className="flex gap-4 border-t border-white/10 py-5 first:border-t-0 first:pt-0 last:pb-0"
    >
      <span className="w-8 shrink-0 pt-1 font-display text-sm tracking-wider text-gold">
        {String(index + 1).padStart(2, '0')}
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
    <ScrollReveal variant="right" delay={1} className="relative mx-auto w-full max-w-sm">
      <img
        src={appProfile}
        alt="Loci app — profile and settings"
        className="absolute -right-4 top-10 hidden w-52 -rotate-6 rounded-[1.6rem] border border-white/15 opacity-70 shadow-2xl shadow-black/20 sm:block"
        loading="lazy"
      />
      <img
        src={appHistory}
        alt="Loci app — sighting history and the sightings dial"
        className="relative z-10 mx-auto w-64 rounded-[1.8rem] border border-white/15 shadow-2xl shadow-black/25"
        loading="lazy"
      />
      <p className="relative z-10 mt-5 text-center text-[0.6rem] tracking-[0.3em] text-cream-muted uppercase">
        Screens from the Loci app beta
      </p>
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
