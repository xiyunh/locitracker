import { Key, Luggage, Dog, Bike, Users, Radar } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const features = [
  {
    icon: Key,
    category: 'Keys, Wallet & Passport',
    title: 'Never wonder where your',
    emphasis: 'keys went',
    gradient: 'from-brand/90 to-charcoal',
  },
  {
    icon: Luggage,
    category: 'Bags & Luggage',
    title: 'Track your bags from',
    emphasis: 'check-in to pickup',
    gradient: 'from-brand/70 to-charcoal-mid',
  },
  {
    icon: Dog,
    category: 'Pets',
    title: 'Keep tabs on collars',
    emphasis: 'and carriers',
    gradient: 'from-charcoal-mid to-charcoal',
  },
  {
    icon: Bike,
    category: 'Bike & Gear',
    title: 'Secure what you ride',
    emphasis: 'and wear',
    gradient: 'from-brand/80 to-charcoal',
  },
  {
    icon: Users,
    category: 'Shared Items',
    title: 'Share location with',
    emphasis: 'family & friends',
    gradient: 'from-brand/60 to-charcoal-mid',
  },
  {
    icon: Radar,
    category: 'Find nearby',
    title: 'Sound and distance cues',
    emphasis: 'right to your Loci',
    gradient: 'from-brand to-charcoal',
  },
]

function FeatureCard({ feature, index, featured = false, wide = false }) {
  const Icon = feature.icon
  const layout = featured
    ? 'min-h-[360px] p-8 lg:col-span-2 lg:row-span-2 lg:min-h-[560px] lg:p-12'
    : wide
      ? 'min-h-[220px] p-8 lg:col-span-4 lg:p-10'
      : 'min-h-[260px] p-8'
  return (
    <ScrollReveal
      as="article"
      variant="up"
      delay={index}
      className={`vignette card-lift group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.gradient} hover:border-gold/30 ${layout}`}
    >
      <div className="absolute inset-0 bg-charcoal/25 transition-opacity duration-700 group-hover:opacity-0" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="numeral text-3xl">{String(index + 1).padStart(2, '0')}</span>
          <Icon size={featured ? 34 : 24} strokeWidth={1.1} className="text-gold/80" />
        </div>
        <div>
          <p className="text-[0.65rem] tracking-[0.3em] text-cream/55 uppercase">{feature.category}</p>
          <h3
            className={`mt-3 font-display leading-[1.05] font-medium text-cream ${
              featured ? 'text-4xl lg:text-6xl' : wide ? 'max-w-3xl text-3xl lg:text-5xl' : 'text-3xl'
            }`}
          >
            {feature.title} <em className="font-normal text-gold-light">{feature.emphasis}</em>
          </h3>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Features() {
  return (
    <section id="features" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.category}
              feature={feature}
              index={i}
              featured={i === 0}
              wide={i === features.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
