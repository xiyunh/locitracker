import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import Placeholder from './Placeholder'

const featuredProducts = [
  {
    kicker: 'single',
    name: 'Loci Sticker',
    detail: 'For keys, passports, wallets, and everyday carry.',
    price: '$29',
    to: '/product/loci-sticker-single',
    photo: 'PHOTO — single sticker on house keys',
  },
  {
    kicker: 'four pack',
    name: 'Loci Sticker 4-Pack',
    detail: 'Cover luggage, bags, remotes, and the stuff you share.',
    price: '$99',
    badge: 'Save $17',
    to: '/product/loci-sticker-four-pack',
    photo: 'PHOTO — 4-pack spread on a table',
  },
  {
    kicker: 'reserve',
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
    <section className="my-6 bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {featuredProducts.map((product, index) => (
              <ScrollReveal
                key={product.name}
                to={product.to}
                variant="up"
                delay={index}
                className="card-lift group flex flex-col rounded-2xl bg-[#eef0f5] p-6 lg:p-7"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-display text-5xl leading-none text-cream lowercase">{product.kicker}</span>
                  {product.badge && (
                    <span className="rounded-full bg-cream px-3 py-1 text-[0.6rem] font-semibold tracking-wide text-white">
                      {product.badge}
                    </span>
                  )}
                </span>

                <Placeholder label={product.photo} aspect="aspect-[4/5]" className="my-7 rounded-xl border-0 bg-white/70" />

                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-bold tracking-[0.08em] text-cream uppercase">{product.name}</span>
                  <span className="text-sm font-semibold text-cream">{product.price}</span>
                </span>
                <span className="mt-1 text-sm text-cream-muted">{product.detail}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-widest text-cream/60 uppercase transition-colors group-hover:text-cream">
                  {product.cta ?? 'Shop'}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
