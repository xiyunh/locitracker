import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import StickerTag from './StickerTag'
import { Button } from './ui'
import { badgeClass } from '../lib/ui'
import { catalog } from '../data/catalog'

function ProductCard({ product, index }) {
  return (
    <ScrollReveal
      as="article"
      variant="up"
      delay={index}
      className={`vignette card-lift group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${product.gradient} p-8 hover:border-gold/30 lg:min-h-[520px] lg:p-10`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {product.badge && <span className={`${badgeClass} mb-3`}>{product.badge}</span>}
          <h3 className="font-display text-4xl font-medium text-cream">
            <Link to={`/product/${product.id}`} className="transition-colors hover:text-gold">
              {product.name} <em className="font-normal text-gold-light">{product.variant}</em>
            </Link>
          </h3>
          <p className="mt-2 text-sm text-cream/70">{product.description}</p>
        </div>
        <Link
          to={`/product/${product.id}`}
          aria-label={`Explore ${product.name} ${product.variant}`}
          className="shrink-0 text-cream/60 transition-colors hover:text-gold-light"
        >
          <ArrowUpRight
            size={22}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        {product.tagStyle === 'single' ? (
          <div className="relative transition-transform duration-500 group-hover:scale-105">
            <div className="h-28 w-40 rounded-xl border border-cream/20 bg-cream/10">
              <div className="absolute top-4 left-4 h-1.5 w-16 rounded-full bg-cream/30" />
              <div className="absolute top-8 left-4 h-1.5 w-10 rounded-full bg-cream/20" />
            </div>
            <StickerTag size={64} peel sheen className="absolute right-3 bottom-3" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 transition-transform duration-500 group-hover:scale-105">
            <StickerTag size={56} />
            <StickerTag size={56} />
            <StickerTag size={56} />
            <StickerTag size={56} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-white/10 pt-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button to={`/product/${product.id}`} variant="secondary" size="sm">
            View
          </Button>
          <Button to={`/waitlist?product=${product.id}`} size="sm">
            Join waitlist
            <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Products() {
  const products = catalog.filter((product) => product.category === 'Tracker')

  return (
    <section id="products" className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
