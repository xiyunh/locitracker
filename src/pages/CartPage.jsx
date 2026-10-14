import { useState } from 'react'
import { ArrowRight, MapPin, Minus, Plus, ShoppingBag, Truck, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import StickerTag from '../components/StickerTag'
import { Button, Eyebrow } from '../components/ui'
import { panelClass } from '../lib/ui'
import { formatCurrency } from '../data/catalog'
import { useStore } from '../context/store'

export default function CartPage() {
  const [placedOrder, setPlacedOrder] = useState(null)
  const {
    account,
    cartItems,
    defaultAddress,
    itemCount,
    placeOrder,
    removeFromCart,
    selectedShipping,
    subtotal,
    updateQuantity,
  } = useStore()
  const shipping = subtotal === 0 ? 0 : selectedShipping.price
  const tax = Math.round(subtotal * 0.0825)
  const total = subtotal + shipping + tax

  return (
    <>
      <PageHeader
        label="Cart"
        title="Your"
        emphasis="bag"
        subtitle="Review your tracker setup, adjust quantities, and keep everything ready for checkout."
      />

      <section className="bg-charcoal py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_24rem] lg:px-10">
          <ScrollReveal variant="left" delay={0}>
            {cartItems.length === 0 ? (
              <div className={`${panelClass} px-6 py-14 text-center`}>
                <ShoppingBag size={34} strokeWidth={1.4} className="mx-auto text-gold-light" />
                <h2 className="mt-6 font-display text-4xl font-medium text-cream">
                  {placedOrder ? 'Order placed.' : 'Your cart is empty.'}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/65">
                  {placedOrder
                    ? `Thanks for shopping with Loci. Order ${placedOrder.id} is now saved to your shopping history.`
                    : 'Add Loci stickers and accessories to build a setup for keys, bags, and everything that moves with you.'}
                </p>
                <Button to="/shop" className="mt-8">
                  Shop products
                  <ArrowRight size={16} />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    variant="up"
                    delay={index}
                    className={`${panelClass} grid gap-5 p-5 sm:grid-cols-[5rem_1fr_auto]`}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-white/10 bg-brand/40">
                      <StickerTag size={44} />
                    </div>

                    <div>
                      <Eyebrow className="!tracking-[0.25em]">{item.category}</Eyebrow>
                      <h2 className="mt-2 font-display font-display text-3xl font-medium text-cream">
                        {item.name} <span className="text-cream/55">{item.variant}</span>
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/65">
                        {item.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPlacedOrder(null)
                          removeFromCart(item.id)
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs tracking-wide text-cream/50 transition-colors hover:text-gold-light"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                      <p className="font-display text-2xl font-medium text-cream">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <div className="flex items-center rounded-md border border-white/15 bg-white/5">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} ${item.variant}`}
                          onClick={() => {
                            setPlacedOrder(null)
                            updateQuantity(item.id, item.quantity - 1)
                          }}
                          className="flex h-10 w-10 items-center justify-center text-cream/70 transition-colors hover:text-cream"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="min-w-10 text-center text-sm text-cream">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} ${item.variant}`}
                          onClick={() => {
                            setPlacedOrder(null)
                            updateQuantity(item.id, item.quantity + 1)
                          }}
                          className="flex h-10 w-10 items-center justify-center text-cream/70 transition-colors hover:text-cream"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal variant="right" delay={1} className="h-fit rounded-xl border border-white/10 bg-brand/35 p-6">
            <Eyebrow tone="light">Order summary</Eyebrow>
            <div className="mt-6 space-y-3 border-b border-white/10 pb-5">
              <div className="flex gap-3 text-sm">
                <Truck size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-light" />
                <span>
                  <span className="block text-cream">{selectedShipping.name}</span>
                  <span className="text-cream/55">{selectedShipping.detail}</span>
                </span>
              </div>
              <div className="flex gap-3 text-sm">
                <MapPin size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold-light" />
                <span>
                  <span className="block text-cream">
                    {defaultAddress ? defaultAddress.label : 'No shipping address'}
                  </span>
                  <span className="text-cream/55">
                    {defaultAddress
                      ? `${defaultAddress.city}, ${defaultAddress.state}`
                      : 'Add one from your account'}
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between text-cream/70">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-cream/70">
                <span>Estimated tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between font-display text-2xl font-medium text-cream">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <Button
              disabled={cartItems.length === 0}
              onClick={() => {
                const order = placeOrder({ subtotal, shipping, tax, total })
                setPlacedOrder(order)
              }}
              className="mt-8 w-full"
            >
              {account ? 'Place order' : 'Checkout as guest'}
              <ArrowRight size={16} />
            </Button>
            <Button to="/account" variant="secondary" className="mt-3 w-full">
              {account ? 'View account' : 'Sign in for faster checkout'}
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
