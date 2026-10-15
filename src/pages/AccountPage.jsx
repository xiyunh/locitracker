import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  History,
  LogOut,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Truck,
  UserRound,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import { Button, Eyebrow, Field, Panel } from '../components/ui'
import { badgeClass, tileClass } from '../lib/ui'
import { formatCurrency } from '../data/catalog'
import { useStore } from '../context/store'

const emptyAddress = {
  label: '',
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States',
}

export default function AccountPage() {
  const {
    account,
    addAddress,
    cartItems,
    defaultAddress,
    itemCount,
    profile,
    removeAddress,
    setDefaultAddress,
    shippingOptions,
    signIn,
    signOut,
    updateContact,
    updatePreferences,
    updateShippingMethod,
  } = useStore()
  const [signInForm, setSignInForm] = useState({
    name: account?.name ?? '',
    email: account?.email ?? '',
  })
  const [contactForm, setContactForm] = useState(profile.contact)
  const [addressForm, setAddressForm] = useState(emptyAddress)
  const [savedContact, setSavedContact] = useState(false)

  const submitAddress = (event) => {
    event.preventDefault()
    addAddress(addressForm)
    setAddressForm(emptyAddress)
  }

  return (
    <>
      <PageHeader
        label="Account"
        title="Your"
        emphasis="account"
        subtitle="Save your bag, addresses, and pre-orders in one place."
      />

      <section className="mx-3 mb-6 rounded-[2rem] bg-white py-16 md:mx-6 lg:py-24">
        <div className={`mx-auto grid gap-8 px-6 lg:px-10 ${account ? 'max-w-7xl lg:grid-cols-[22rem_1fr]' : 'max-w-lg'}`}>
          <ScrollReveal variant="left" delay={0}>
            <Panel>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-white/10">
                  <UserRound size={24} strokeWidth={1.5} />
                </span>
                <div>
                  <Eyebrow className="!tracking-[0.3em]">Profile</Eyebrow>
                  <h2 className="mt-1 font-display text-3xl font-medium text-cream">
                    {account ? account.name : 'Create account'}
                  </h2>
                </div>
              </div>

              {account ? (
                <div className="mt-8 space-y-4">
                  <div className={tileClass}>
                    <p className="text-xs text-cream/50">Email</p>
                    <p className="mt-1 text-sm text-cream">{account.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className={tileClass}>
                      <p className="text-xs text-cream/50">Cart items</p>
                      <p className="mt-1 text-xl text-cream">{itemCount}</p>
                    </div>
                    <div className={tileClass}>
                      <p className="text-xs text-cream/50">Orders</p>
                      <p className="mt-1 text-xl text-cream">{profile.orderHistory.length}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={signOut}
                    className="inline-flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-gold-light"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              ) : (
                <form
                  className="mt-8 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault()
                    const data = new FormData(event.currentTarget)
                    signIn({
                      name: data.get('name'),
                      email: data.get('email'),
                    })
                    setContactForm({
                      ...contactForm,
                      name: data.get('name'),
                      email: data.get('email'),
                    })
                  }}
                >
                  <Field
                    id="account-name"
                    name="name"
                    label="Name"
                    value={signInForm.name}
                    onChange={(event) => setSignInForm({ ...signInForm, name: event.target.value })}
                    required
                    placeholder="Your name"
                  />
                  <Field
                    id="account-email"
                    name="email"
                    label="Email"
                    type="email"
                    value={signInForm.email}
                    onChange={(event) =>
                      setSignInForm({ ...signInForm, email: event.target.value })
                    }
                    required
                    placeholder="you@example.com"
                  />
                  <Button type="submit" className="w-full">
                    Create account
                    <ArrowRight size={16} />
                  </Button>
                  <p className="text-xs leading-relaxed text-cream-muted">
                    New or returning, this is the door — enter the same name and email to pick up where you left off.
                  </p>
                </form>
              )}
            </Panel>

            <Panel className="mt-6">
              <h3 className="flex items-center gap-2 font-display text-2xl font-medium text-cream">
                <Package size={19} strokeWidth={1.5} />
                Current cart
              </h3>
              <div className="mt-5 space-y-3">
                {cartItems.length ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 text-sm">
                      <span className="text-cream/70">
                        {item.quantity}x {item.name} {item.variant}
                      </span>
                      <span className="text-gold-light">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm leading-relaxed text-cream/60">
                    Cart items will appear here as shoppers build their setup.
                  </p>
                )}
              </div>
              <Link
                to="/cart"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold-light transition-colors hover:text-cream"
              >
                Review cart
                <ArrowRight size={15} />
              </Link>
            </Panel>
          </ScrollReveal>

          {account && (
          <div className="space-y-6">
            <ScrollReveal variant="up" delay={0}>
              <Panel>
                <h3 className="flex items-center gap-2 font-display font-display text-3xl font-medium text-cream">
                  <ShieldCheck size={21} strokeWidth={1.5} className="text-gold-light" />
                  Contact details
                </h3>
                <form
                  className="mt-6 grid gap-4 md:grid-cols-3"
                  onSubmit={(event) => {
                    event.preventDefault()
                    updateContact(contactForm)
                    setSavedContact(true)
                  }}
                >
                  <Field
                    id="profile-name"
                    label="Full name"
                    value={contactForm.name}
                    onChange={(event) =>
                      setContactForm({ ...contactForm, name: event.target.value })
                    }
                    required
                  />
                  <Field
                    id="profile-email"
                    label="Email"
                    type="email"
                    value={contactForm.email}
                    onChange={(event) =>
                      setContactForm({ ...contactForm, email: event.target.value })
                    }
                    required
                  />
                  <Field
                    id="profile-phone"
                    label="Phone"
                    value={contactForm.phone}
                    onChange={(event) =>
                      setContactForm({ ...contactForm, phone: event.target.value })
                    }
                    placeholder="Optional"
                  />
                  <div className="md:col-span-3 flex flex-wrap items-center gap-4">
                    <Button type="submit">Save contact</Button>
                    {savedContact && (
                      <span className="inline-flex items-center gap-2 text-sm text-gold-light">
                        <CheckCircle2 size={16} />
                        Saved
                      </span>
                    )}
                  </div>
                </form>
              </Panel>
            </ScrollReveal>

            <ScrollReveal variant="up" delay={1}>
              <Panel>
                <h3 className="flex items-center gap-2 font-display font-display text-3xl font-medium text-cream">
                  <MapPin size={21} strokeWidth={1.5} className="text-gold-light" />
                  Addresses
                </h3>
                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                  <form className="grid gap-4" onSubmit={submitAddress}>
                    <Field
                      id="address-label"
                      label="Label"
                      value={addressForm.label}
                      onChange={(event) =>
                        setAddressForm({ ...addressForm, label: event.target.value })
                      }
                      placeholder="Home, Office"
                    />
                    <Field
                      id="address-name"
                      label="Recipient"
                      value={addressForm.name}
                      onChange={(event) =>
                        setAddressForm({ ...addressForm, name: event.target.value })
                      }
                      required
                    />
                    <Field
                      id="address-line1"
                      label="Address line 1"
                      value={addressForm.line1}
                      onChange={(event) =>
                        setAddressForm({ ...addressForm, line1: event.target.value })
                      }
                      required
                    />
                    <Field
                      id="address-line2"
                      label="Address line 2"
                      value={addressForm.line2}
                      onChange={(event) =>
                        setAddressForm({ ...addressForm, line2: event.target.value })
                      }
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        id="address-city"
                        label="City"
                        value={addressForm.city}
                        onChange={(event) =>
                          setAddressForm({ ...addressForm, city: event.target.value })
                        }
                        required
                      />
                      <Field
                        id="address-state"
                        label="State"
                        value={addressForm.state}
                        onChange={(event) =>
                          setAddressForm({ ...addressForm, state: event.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        id="address-postal"
                        label="ZIP"
                        value={addressForm.postalCode}
                        onChange={(event) =>
                          setAddressForm({ ...addressForm, postalCode: event.target.value })
                        }
                        required
                      />
                      <Field
                        id="address-country"
                        label="Country"
                        value={addressForm.country}
                        onChange={(event) =>
                          setAddressForm({ ...addressForm, country: event.target.value })
                        }
                        required
                      />
                    </div>
                    <Button type="submit">
                      <Plus size={16} />
                      Add address
                    </Button>
                  </form>

                  <div className="space-y-3">
                    {profile.addresses.length ? (
                      profile.addresses.map((address) => (
                        <div key={address.id} className={tileClass}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-cream">{address.label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-cream/60">
                                {address.name}
                                <br />
                                {address.line1}
                                {address.line2 ? `, ${address.line2}` : ''}
                                <br />
                                {address.city}, {address.state} {address.postalCode}
                              </p>
                            </div>
                            {defaultAddress?.id === address.id && (
                              <span className={badgeClass}>
                                Default
                              </span>
                            )}
                          </div>
                          <div className="mt-4 flex gap-4 text-xs">
                            <button
                              type="button"
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-gold-light transition-colors hover:text-cream"
                            >
                              Make default
                            </button>
                            <button
                              type="button"
                              onClick={() => removeAddress(address.id)}
                              className="text-cream/50 transition-colors hover:text-gold-light"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`${tileClass} text-sm leading-relaxed text-cream/60`}>
                        Add at least one shipping address so checkout can prefill delivery details.
                      </p>
                    )}
                  </div>
                </div>
              </Panel>
            </ScrollReveal>

            <div className="grid gap-6 lg:grid-cols-2">
              <ScrollReveal variant="up" delay={2}>
                <Panel className="h-full">
                  <h3 className="flex items-center gap-2 font-display font-display text-3xl font-medium text-cream">
                    <Truck size={21} strokeWidth={1.5} className="text-gold-light" />
                    Shipping
                  </h3>
                  <div className="mt-5 space-y-3">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`${tileClass} flex cursor-pointer items-center justify-between gap-4 transition-colors hover:border-gold/30`}
                      >
                        <span>
                          <span className="block text-sm text-cream">{option.name}</span>
                          <span className="text-xs text-cream/55">{option.detail}</span>
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="text-sm text-gold-light">
                            {option.price ? formatCurrency(option.price) : 'Free'}
                          </span>
                          <input
                            type="radio"
                            name="shipping"
                            checked={profile.shippingMethod === option.id}
                            onChange={() => updateShippingMethod(option.id)}
                            className="h-4 w-4 accent-[var(--color-gold)]"
                          />
                        </span>
                      </label>
                    ))}
                  </div>
                </Panel>
              </ScrollReveal>

              <ScrollReveal variant="up" delay={3}>
                <Panel className="h-full">
                  <h3 className="flex items-center gap-2 font-display font-display text-3xl font-medium text-cream">
                    <CreditCard size={21} strokeWidth={1.5} className="text-gold-light" />
                    Checkout preferences
                  </h3>
                  <div className="mt-5 space-y-4">
                    {[
                      ['emailReceipts', 'Email receipts'],
                      ['smsUpdates', 'SMS delivery updates'],
                      ['launchAlerts', 'Product launch alerts'],
                    ].map(([key, label]) => (
                      <label key={key} className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-cream/75">{label}</span>
                        <input
                          type="checkbox"
                          checked={profile.preferences[key]}
                          onChange={(event) =>
                            updatePreferences({ [key]: event.target.checked })
                          }
                          className="h-4 w-4 accent-[var(--color-gold)]"
                        />
                      </label>
                    ))}
                  </div>
                </Panel>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="up" delay={4}>
              <Panel>
                <h3 className="flex items-center gap-2 font-display font-display text-3xl font-medium text-cream">
                  <History size={21} strokeWidth={1.5} className="text-gold-light" />
                  Shopping history
                </h3>
                <div className="mt-5 space-y-3">
                  {profile.orderHistory.length ? (
                    profile.orderHistory.map((order) => (
                      <div key={order.id} className={tileClass}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-cream">{order.id}</p>
                            <p className="mt-1 text-xs text-cream/50">
                              {new Date(order.placedAt).toLocaleDateString()} · {order.status}
                            </p>
                          </div>
                          <span className="text-sm text-gold-light">
                            {formatCurrency(order.totals.total)}
                          </span>
                        </div>
                        <div className="mt-3 text-xs leading-relaxed text-cream/55">
                          {order.items.map((item) => `${item.quantity}x ${item.name} ${item.variant}`).join(', ')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={`${tileClass} text-sm leading-relaxed text-cream/60`}>
                      Completed checkout orders will appear here with item details, status, and totals.
                    </p>
                  )}
                </div>
              </Panel>
            </ScrollReveal>
          </div>
          )}
        </div>
      </section>
    </>
  )
}
