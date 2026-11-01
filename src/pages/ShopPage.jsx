import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import Placeholder from '../components/Placeholder'
import { Button } from '../components/ui'
import { productImages } from '../data/productImages'
import { catalog } from '../data/catalog'

const packs = catalog.filter((product) => product.category === 'Tracker')

const compareRows = [
  { label: 'In the box', single: '1 Loci Sticker', four: '4 Loci Stickers' },
  { label: 'Best for', single: 'Keys, a wallet, or a passport', four: 'Luggage, bags, remotes, and shared items' },
  { label: 'Size', single: '40 × 40 mm, under 2 mm thin', four: '40 × 40 mm, under 2 mm thin' },
  { label: 'Battery', single: '22 months', four: '22 months' },
  { label: 'Re-stickable', single: 'Yes, with refill pads', four: 'Yes, with refill pads' },
  { label: 'Pricing', single: 'Announced at launch', four: 'Announced at launch' },
]

export default function ShopPage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#compare') {
      document.getElementById('compare')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <div className="bg-white">
      <header className="pt-36 pb-14 lg:pt-44 lg:pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal variant="up" delay={0}>
            <p className="text-[0.65rem] font-medium tracking-[0.35em] text-[#a6adb9] uppercase">
              Shop
            </p>
            <h1 className="mt-5 text-4xl font-light tracking-tight text-[#8b93a0] sm:text-5xl">
              The Loci Sticker
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed font-light text-[#9aa2ae]">
              Peel, stick, and pair with the Loci app. Track keys, passports, luggage, and
              everything that matters.
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {packs.map((product, index) => {
              const image = productImages[product.id]
              return (
                <ScrollReveal
                  key={product.id}
                  variant="up"
                  delay={index}
                  className="card-lift group flex flex-col rounded-2xl bg-[#eef0f5] p-6 lg:p-7"
                >
                  <span className="font-display text-5xl leading-none text-cream lowercase">
                    {product.variant}
                  </span>

                  {image ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={1200}
                      height={1200}
                      loading="lazy"
                      className="my-7 aspect-square w-full rounded-xl object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <Placeholder
                      label={`PHOTO — ${product.name} ${product.variant}`}
                      aspect="aspect-square"
                      className="my-7 rounded-xl border-0 bg-white/70"
                    />
                  )}

                  <span className="text-sm font-bold tracking-[0.08em] text-cream uppercase">
                    {product.name} {product.variant}
                  </span>
                  <span className="mt-1 flex-1 text-sm text-cream-muted">{product.description}</span>

                  <span className="mt-6 flex flex-wrap items-center gap-3">
                    <Button to={`/product/${product.id}`} variant="secondary" size="sm">
                      View
                    </Button>
                    <Button to={`/waitlist?product=${product.id}`} size="sm">
                      Join waitlist
                      <ArrowRight size={14} />
                    </Button>
                  </span>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="compare" className="scroll-mt-28 pb-20 lg:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <ScrollReveal variant="up" delay={0}>
            <p className="text-[0.65rem] font-medium tracking-[0.35em] text-[#a6adb9] uppercase">
              Compare packs
            </p>
            <h2 className="mt-4 text-3xl font-light tracking-tight text-[#8b93a0] sm:text-4xl">
              Which one fits your setup?
            </h2>
          </ScrollReveal>

          <ScrollReveal
            variant="up"
            delay={1}
            className="mt-10 overflow-hidden rounded-2xl border border-cream/10"
          >
            <div className="grid grid-cols-[0.8fr_1fr_1fr] border-b border-cream/10 bg-[#eef0f5]">
              <div className="p-4 lg:p-5" />
              {packs.map((product) => (
                <div key={product.id} className="p-4 lg:p-5">
                  <p className="font-display text-2xl leading-none text-cream lowercase">
                    {product.variant}
                  </p>
                  <p className="mt-1 text-xs text-cream-muted">{product.name}</p>
                </div>
              ))}
            </div>

            {compareRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[0.8fr_1fr_1fr] ${
                  i < compareRows.length - 1 ? 'border-b border-cream/8' : ''
                }`}
              >
                <div className="p-4 text-xs font-medium tracking-wide text-cream/45 uppercase lg:p-5">
                  {row.label}
                </div>
                <div className="p-4 text-sm text-cream/75 lg:p-5">{row.single}</div>
                <div className="p-4 text-sm text-cream/75 lg:p-5">{row.four}</div>
              </div>
            ))}

            <div className="grid grid-cols-[0.8fr_1fr_1fr] border-t border-cream/10 bg-[#f7f8fb]">
              <div className="p-4 lg:p-5" />
              {packs.map((product) => (
                <div key={product.id} className="p-4 lg:p-5">
                  <Button to={`/waitlist?product=${product.id}`} size="sm">
                    Join waitlist
                    <ArrowRight size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
