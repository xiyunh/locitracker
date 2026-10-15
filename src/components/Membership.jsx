import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { Button, SectionHeading } from './ui'
import { badgeClass } from '../lib/ui'
import Placeholder from './Placeholder'

const featuredProducts = [
  {
    name: 'Loci Sticker',
    detail: 'For keys, passports, wallets, and everyday carry.',
    price: '$29',
    to: '/shop',
    photo: 'PHOTO — single sticker on house keys',
  },
  {
    name: 'Loci Sticker 4-Pack',
    detail: 'Cover luggage, bags, remotes, and the stuff you share.',
    price: '$99',
    badge: 'Save $17',
    to: '/shop',
    photo: 'PHOTO — 4-pack spread on a table',
  },
  {
    name: 'Pre Order',
    detail: 'Reserve your place in the first drop. No payment today.',
    price: 'From $29',
    cta: 'Reserve',
    to: '/pre-order',
    photo: 'PHOTO — first-drop packaging',
  },
]

export default function Membership() {
  return (
    <section className="border-y border-white/5 bg-gradient-to-b from-charcoal via-brand/10 to-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            eyebrow="The collection"
            title="Start with the tracker. Build the setup around it."
            copy="Choose a single Loci for one essential or a bundle for everything you carry — then reserve your place in the first drop."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <ScrollReveal
                key={product.name}
                to={product.to}
                variant="up"
                delay={index}
                className="glass card-lift group flex min-h-64 flex-col justify-between rounded-xl p-6 hover:border-gold/40"
              >
                <span>
                  <span className="flex items-start justify-between gap-4">
                    <span className="numeral">{String(index + 1).padStart(2, '0')}</span>
                    {product.badge && <span className={badgeClass}>{product.badge}</span>}
                  </span>
                  <span className="mt-8 block font-display text-3xl font-medium text-cream">{product.name}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-cream/65">
                    {product.detail}
                  </span>
                  <Placeholder label={product.photo} aspect="aspect-[16/9]" className="mt-5" />
                </span>

                <span className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="text-sm font-medium text-gold-light">{product.price}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-cream/70 uppercase transition-colors group-hover:text-cream">
                    {product.cta ?? 'Shop'}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal variant="subtle" delay={4} className="mt-12 border-t border-white/10 pt-6">
          <Button to="/shop" variant="ghost" size="none" className="text-sm">
            Compare all products
            <ArrowRight size={15} />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
