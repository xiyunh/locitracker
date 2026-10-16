import { ArrowRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { productImages } from '../data/productImages'

const featuredProducts = [
  {
    kicker: 'single',
    name: 'Loci Sticker',
    detail: 'For keys, passports, wallets, and everyday carry.',
    price: '$29',
    to: '/product/loci-sticker-single',
    image: productImages['loci-sticker-single'],
  },
  {
    kicker: 'four pack',
    name: 'Loci Sticker 4-Pack',
    detail: 'Cover luggage, bags, remotes, and the stuff you share.',
    price: '$99',
    badge: 'Save $17',
    to: '/product/loci-sticker-four-pack',
    image: productImages['loci-sticker-four-pack'],
  },
  {
    kicker: 'reserve',
    name: 'Pre Order',
    detail: 'Reserve your place in the first drop. No payment today.',
    price: 'From $29',
    cta: 'Reserve',
    to: '/pre-order',
    image: productImages['pre-order'],
  },
]

export default function Membership() {
  return (
    <section className="bg-white pt-4 lg:pt-6">
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

                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  width={1200}
                  height={1200}
                  loading="lazy"
                  className="my-7 aspect-square w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

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

      {/* ease back out to the page tone */}
      <div aria-hidden="true" className="h-28 bg-gradient-to-b from-white to-charcoal lg:h-36" />
    </section>
  )
}
