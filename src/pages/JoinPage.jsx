import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button, Field } from '../components/ui'
import { useStore } from '../context/store'
import productShot from '../assets/product-stickers.webp'

const perks = [
  'One account for the website and the Loci app',
  'Your bag and waitlist, saved across visits',
  'Addresses and shipping preferences on file for a faster checkout',
]

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function JoinPage() {
  const { account, authMode, signUp, signInWithPassword, resetPassword, signInLocal } = useStore()
  const navigate = useNavigate()
  const [mode, setMode] = useState('signUp') // signUp | signIn | forgot
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null)

  if (account) return <Navigate to="/account" replace />

  const submit = async (event) => {
    event.preventDefault()
    setError(null)
    setNotice(null)

    // Local fallback when the backend is not configured (dev only).
    if (authMode === 'local') {
      signInLocal(form)
      navigate('/account', { replace: true })
      return
    }

    setBusy(true)
    if (mode === 'forgot') {
      const result = await resetPassword(form.email)
      setBusy(false)
      if (!result.ok) return setError(result.error)
      return setNotice('Password reset email sent — check your inbox.')
    }
    if (mode === 'signIn') {
      const result = await signInWithPassword(form)
      setBusy(false)
      if (!result.ok) return setError(result.error)
      return navigate('/account', { replace: true })
    }
    const result = await signUp(form)
    setBusy(false)
    if (!result.ok) return setError(result.error)
    if (result.needsConfirmation) {
      return setNotice(
        'Almost there — we sent a confirmation link to your email. It signs you in here and works for the Loci app too.',
      )
    }
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
          <p className="text-[0.62rem] tracking-[0.3em] text-cream-muted uppercase">
            {mode === 'signIn' ? 'Sign in' : mode === 'forgot' ? 'Reset password' : 'Create account'}
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] font-medium tracking-tight text-cream sm:text-7xl">
            Keep track of
            <br />
            <span className="text-[#8d97a9]">your Loci.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-cream/60">
            One Loci account for the website and the app — your tags, bag, and waitlist together.
          </p>

          <form onSubmit={submit} className="mt-10 space-y-5">
            {mode === 'signUp' && (
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
            )}
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
            {mode !== 'forgot' && authMode === 'supabase' && (
              <Field
                id="join-password"
                name="password"
                type="password"
                label="Password"
                autoComplete={mode === 'signUp' ? 'new-password' : 'current-password'}
                required
                minLength={8}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            )}

            {error && <p className="text-sm text-red-700">{error}</p>}
            {notice && <p className="text-sm text-cream/75">{notice}</p>}

            <Button type="submit" size="lg" disabled={busy} className="group w-full text-base">
              {busy
                ? 'One moment…'
                : mode === 'signIn'
                  ? 'Sign in'
                  : mode === 'forgot'
                    ? 'Send reset link'
                    : 'Create account'}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs leading-relaxed text-cream-muted">
            {mode !== 'signUp' && (
              <button type="button" onClick={() => setMode('signUp')} className="underline underline-offset-4 hover:text-cream">
                Create an account
              </button>
            )}
            {mode !== 'signIn' && (
              <button type="button" onClick={() => setMode('signIn')} className="underline underline-offset-4 hover:text-cream">
                Already have one? Sign in
              </button>
            )}
            {mode === 'signIn' && (
              <button type="button" onClick={() => setMode('forgot')} className="underline underline-offset-4 hover:text-cream">
                Forgot password?
              </button>
            )}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-cream-muted">
            Same account as the Loci app — sign in with the email and password you use there.
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
