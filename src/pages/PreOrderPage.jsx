import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Download, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StickerTag from '../components/StickerTag'
import { useStore } from '../context/store'
import ScrollReveal from '../components/ScrollReveal'
import { Button, Eyebrow } from '../components/ui'
import { badgeClass, inputClass as baseInput, labelClass, panelClass } from '../lib/ui'
import { catalog, formatCurrency, getProductById, productLabel } from '../data/catalog'
import {
  createSubmissionId,
  downloadPreOrdersCsv,
  readPreOrders,
  savePreOrderLocally,
  savePreOrderToSupabase,
} from '../services/preorderApi'

const perks = ['Early access before launch', 'No payment collected today', 'Product updates by email']

const inputClass = `mt-2 ${baseInput}`

const optionDetails = {
  'loci-sticker-single': {
    tagline: 'One tracker for the thing you lose most.',
    bullets: ['1 Loci Sticker', 'Adhesive pad applied', 'First-drop priority'],
  },
  'loci-sticker-four-pack': {
    tagline: 'Cover everything that leaves the house with you.',
    bullets: ['4 Loci Stickers', 'Save $17 vs singles', 'Cover every essential'],
  },
}

function OptionCard({ product, index }) {
  const navigate = useNavigate()
  const { addToCart } = useStore()
  const detail = optionDetails[product.id]

  return (
    <ScrollReveal
      as="article"
      variant="up"
      delay={index}
      className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand/45 via-charcoal-mid to-charcoal p-8 hover:border-gold/40 lg:p-10"
    >
      {product.badge && <span className={`${badgeClass} absolute top-6 right-6`}>{product.badge}</span>}

      <div className="flex h-40 items-center justify-center">
        {product.tagStyle === 'single' ? (
          <StickerTag peel sheen size={112} className="drop-shadow-[0_20px_36px_rgba(0,0,0,0.45)]" />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <StickerTag size={58} />
            <StickerTag size={58} />
            <StickerTag size={58} />
            <StickerTag size={58} peel />
          </div>
        )}
      </div>

      <h2 className="mt-8 font-display text-3xl font-medium text-cream">
        {product.name} <em className="font-normal text-gold-light">{product.variant}</em>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-cream/65">{detail.tagline}</p>

      <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
        {detail.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 text-sm text-cream/75">
            <span className="h-px w-4 shrink-0 bg-gold/60" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
        <span className="font-display text-3xl font-medium text-cream">
          {formatCurrency(product.price)}
        </span>
        <Button
          onClick={() => {
            addToCart(product.id)
            navigate('/cart')
          }}
          className="group/btn"
        >
          Pre order
          <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </ScrollReveal>
  )
}

export default function PreOrderPage() {
  const [searchParams] = useSearchParams()
  const requested = getProductById(searchParams.get('product'))
  const defaultProduct = productLabel(requested ?? catalog[0])
  const trackers = catalog.filter((product) => product.category === 'Tracker')

  return (
    <>
      <PageHeader
        label="Pre order"
        title="Reserve your"
        emphasis="Loci"
        subtitle="Pick your pack and secure your place in the first drop. Checkout takes under a minute."
      />

      <section className="bg-charcoal pt-16 pb-20 lg:pt-20">
        <div className="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-2 lg:px-10">
          {trackers.map((product, index) => (
            <OptionCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      <div className="border-t border-white/5">
        {/* Keyed on the requested product so the form resets when the query changes. */}
        <PreOrderForm key={defaultProduct} defaultProduct={defaultProduct} />
      </div>
    </>
  )
}

function PreOrderForm({ defaultProduct }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [product, setProduct] = useState(defaultProduct)
  const [submitted, setSubmitted] = useState(false)
  const [saveStatus, setSaveStatus] = useState('idle')
  const [savedCount, setSavedCount] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !product) return

    setSaveStatus('saving')
    const submission = {
      id: createSubmissionId(email),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      product,
      createdAt: new Date().toISOString(),
    }

    savePreOrderLocally(submission)
    setSavedCount(readPreOrders().length)

    try {
      const savedToSupabase = await savePreOrderToSupabase(submission)
      setSaveStatus(savedToSupabase ? 'saved-supabase' : 'saved-local')
    } catch {
      setSaveStatus('saved-local')
    }

    setSubmitted(true)
  }

  return (
    <section className="bg-charcoal py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-10">
        <ScrollReveal variant="left" delay={0}>
          <Eyebrow>Limited early access</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] font-medium text-cream sm:text-5xl">
            Be first in line when the next Loci drop ships.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/70">
            Pre-orders are saved for launch day so you can check out with priority access and
            launch pricing.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((perk, i) => (
              <ScrollReveal
                key={perk}
                as="li"
                variant="left"
                delay={i + 1}
                className="flex items-center gap-3 text-sm text-cream/80"
              >
                <Sparkles size={16} className="shrink-0 text-gold-light" />
                {perk}
              </ScrollReveal>
            ))}
          </ul>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-2 text-sm text-cream underline-offset-4 transition-colors hover:text-gold-light hover:underline"
          >
            Or shop what&apos;s in stock
            <ArrowRight size={15} />
          </Link>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={1} className={`${panelClass} p-6 lg:p-8`}>
          {submitted ? (
            <div className="py-6 text-center">
              <CheckCircle2 size={36} strokeWidth={1.4} className="mx-auto text-gold-light" />
              <h3 className="mt-6 font-display text-4xl font-medium text-cream">You are on the list.</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/65">
                Thanks, {name}. We saved your pre-order interest for {product} and will send launch
                updates to {email}.
              </p>
              <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-cream/45">
                {saveStatus === 'saved-supabase'
                  ? 'This pre-order was added to Supabase and backed up locally.'
                  : `This pre-order was saved locally. ${savedCount} saved pre-order${
                      savedCount === 1 ? '' : 's'
                    } can be exported for Excel.`}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button onClick={downloadPreOrdersCsv}>
                  <Download size={16} />
                  Export pre-order CSV
                </Button>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Edit details
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Eyebrow tone="light">Pre-order form</Eyebrow>
              <div>
                <label htmlFor="preorder-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="preorder-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="preorder-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="preorder-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="preorder-product" className={labelClass}>
                  Product to pre order
                </label>
                <select
                  id="preorder-product"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                  required
                  className={`${inputClass} cursor-pointer bg-charcoal-mid`}
                >
                  {catalog.map((item) => (
                    <option key={item.id} value={productLabel(item)}>
                      {productLabel(item)} — {formatCurrency(item.price)}
                    </option>
                  ))}
                </select>
              </div>
              <Button type="submit" disabled={saveStatus === 'saving'} className="w-full">
                {saveStatus === 'saving' ? 'Saving pre-order…' : 'Join the pre order list'}
                <ArrowRight size={16} />
              </Button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
