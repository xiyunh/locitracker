import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import Placeholder from '../components/Placeholder'
import { productImages } from '../data/productImages'
import ScrollReveal from '../components/ScrollReveal'
import { Button, Eyebrow } from '../components/ui'
import { badgeClass } from '../lib/ui'
import { catalog, formatCurrency, getProductById } from '../data/catalog'
import { useStore } from '../context/store'

const trackerSpecs = ['Under 2 mm thin', '18-month battery', 'Pairs in one tap', 'Finds through the Loci network']
const accessorySpecs = ['Fits every Loci Sticker', 'Ships with the first drop']

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useStore()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="px-6 pt-44 pb-28 text-center">
        <h1 className="font-display text-5xl text-cream">That product isn&apos;t here.</h1>
        <Button to="/shop" className="mt-8">
          Back to the shop
          <ArrowRight size={16} />
        </Button>
      </div>
    )
  }

  const specs = product.category === 'Tracker' ? trackerSpecs : accessorySpecs
  const others = catalog.filter((p) => p.id !== product.id).slice(0, 3)
  const add = () => {
    addToCart(product.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <>
      <section className="mx-3 mt-28 rounded-[2rem] bg-white py-14 md:mx-6 lg:mt-32 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-10">
          <ScrollReveal variant="right" delay={0} className="rounded-2xl bg-[#eef0f5] p-6 lg:p-8">
            <span className="font-display text-5xl leading-none text-cream lowercase">{product.variant}</span>
            {productImages[product.id] ? (
              <img
                src={productImages[product.id].src}
                alt={productImages[product.id].alt}
                width={1200}
                height={1200}
                fetchPriority="high"
                className="mt-6 aspect-square w-full rounded-xl object-cover"
              />
            ) : (
              <Placeholder
                label={`PHOTO — ${product.name} ${product.variant}, product shot`}
                aspect="aspect-square"
                className="mt-6 rounded-xl border-0 bg-white/70"
              />
            )}
          </ScrollReveal>

          <ScrollReveal variant="left" delay={1}>
            <Eyebrow>{product.category}</Eyebrow>
            <h1 className="mt-4 font-display text-5xl leading-[1] font-medium text-cream sm:text-6xl">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold text-cream">{formatCurrency(product.price)}</span>
              {product.badge && <span className={badgeClass}>{product.badge}</span>}
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/70">{product.description}</p>

            <ul className="mt-7 space-y-2.5">
              {specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-sm text-cream/80">
                  <Check size={15} className="shrink-0 text-gold" />
                  {spec}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-md border border-white/15 bg-white/5">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-cream/70 hover:text-cream">
                  <Minus size={15} />
                </button>
                <span className="min-w-10 text-center text-sm text-cream">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-cream/70 hover:text-cream">
                  <Plus size={15} />
                </button>
              </div>
              <Button onClick={add} size="lg" className="min-w-44">
                {added ? 'Added to bag' : 'Add to bag'}
                {added ? <Check size={16} /> : <ArrowRight size={16} />}
              </Button>
              <Button to={`/pre-order?product=${product.id}`} variant="secondary" size="lg">
                Pre order instead
              </Button>
            </div>
            <p className="mt-4 text-xs text-cream-muted">
              Pre-orders reserve a place in the first production run — no payment today.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-3 my-6 rounded-[2rem] bg-[#d9e0ee] py-14 md:mx-6 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Eyebrow>Also in the drop</Eyebrow>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((p, i) => (
              <ScrollReveal key={p.id} to={`/product/${p.id}`} variant="up" delay={i} className="card-lift group flex flex-col rounded-2xl bg-white p-6">
                <span className="font-display text-3xl leading-none text-cream lowercase">{p.variant}</span>
                <span className="mt-6 flex items-baseline justify-between gap-3">
                  <span className="text-sm font-bold tracking-[0.08em] text-cream uppercase">{p.name}</span>
                  <span className="text-sm font-semibold text-cream">{formatCurrency(p.price)}</span>
                </span>
                <span className="mt-1 text-sm text-cream-muted">{p.description}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-widest text-cream/60 uppercase group-hover:text-cream">
                  View <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </ScrollReveal>
            ))}
          </div>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 text-sm text-cream underline-offset-4 hover:underline">
            See everything <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  )
}
