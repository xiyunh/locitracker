import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button, Field } from '../components/ui'
import { useStore } from '../context/store'
import productShot from '../assets/product-stickers.webp'

const perks = [
  'Your bag and pre order, saved across visits',
  'Addresses and shipping preferences on file for a faster checkout',
  'Order history and launch updates in one place',
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function JoinPage() {
  const { account, signIn } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '' })

  if (account) return <Navigate to="/account" replace />

  const submit = (event) => {
    event.preventDefault()
    signIn(form)
    navigate('/account', { replace: true })
  }

  return (
    <section className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      {/* the product, kept in view while you sign up */}
      <div className="relative hidden overflow-hidden bg-[#d9e0ee] lg:flex lg:flex-col lg:justify-between lg:px-14 lg:pt-40 lg:pb-14">
        <motion.p {...reveal(0.1)} className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
          Loci account
        </motion.p>

        <motion.img
          {...reveal(0.2)}
          src={productShot}
          alt="Two Loci sticker trackers"
          width={1600}
          height={855}
          className="mx-auto w-[82%] max-w-2xl drop-shadow-[0_30px_50px_rgba(23,37,60,0.22)]"
        />

        <motion.ul {...reveal(0.35)} className="max-w-md space-y-4">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-sm leading-relaxed text-cream/75">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              {perk}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* the form */}
      <div className="flex items-center bg-white px-6 pt-36 pb-20 lg:px-16 lg:pt-40">
        <motion.div {...reveal(0.15)} className="mx-auto w-full max-w-md">
          <p className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">Create account</p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] font-medium tracking-tight text-cream sm:text-7xl">
            Keep track of
            <br />
            <span className="text-[#8d97a9]">your Loci.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/60">
            Save your bag, addresses, and pre order. No password to remember.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <Field
              id="join-name"
              name="name"
              label="Full name"
              autoComplete="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
            <Field
              id="join-email"
              name="email"
              type="email"
              label="Email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            <Button type="submit" size="lg" className="group w-full text-base">
              Create account
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <p className="mt-6 text-xs leading-relaxed text-cream-muted">
            Already have one? Enter the same name and email to pick up where you left off.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-cream-muted">
            By continuing you agree to our{' '}
            <Link to="/terms" className="underline underline-offset-4 hover:text-cream">Terms</Link> and{' '}
            <Link to="/privacy" className="underline underline-offset-4 hover:text-cream">Privacy Policy</Link>.
          </p>

          <ul className="mt-10 space-y-3 border-t border-white/10 pt-8 lg:hidden">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
