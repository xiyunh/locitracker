import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import WorldMap from '../components/WorldMap'
import { Button } from '../components/ui'
import { inputClass, labelClass } from '../lib/ui'
import { catalog, getProductById, productLabel } from '../data/catalog'
import {
  createSubmissionId,
  savePreOrderLocally,
  savePreOrderToSupabase,
} from '../services/preorderApi'

export default function PreOrderPage() {
  const [searchParams] = useSearchParams()
  const requested = getProductById(searchParams.get('product'))
  const trackers = catalog.filter((product) => product.category === 'Tracker')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState(
    requested?.category === 'Tracker' ? requested : trackers[0],
  )
  const [submitted, setSubmitted] = useState(false)
  const [saveStatus, setSaveStatus] = useState('idle')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !selected) return

    setSaveStatus('saving')
    const submission = {
      id: createSubmissionId(email),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      product: productLabel(selected),
      createdAt: new Date().toISOString(),
    }

    savePreOrderLocally(submission)
    try {
      await savePreOrderToSupabase(submission)
    } catch {
      // Saved locally either way; the waitlist entry is not lost.
    }
    setSaveStatus('idle')
    setSubmitted(true)
  }

  return (
    <div className="px-3 pt-28 pb-6 md:px-6 lg:pt-32">
      <section className="liquid-glass-ink relative flex min-h-[calc(100vh-9rem)] items-center overflow-hidden rounded-[2rem] px-6 py-20 lg:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_90%_at_50%_40%,black_20%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_80%_90%_at_50%_40%,black_20%,transparent_75%)]"
        >
          <WorldMap className="h-full w-full scale-[1.4]" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem]">
          {[
            { top: '12%', delay: '0s', dur: '9s', scale: 1 },
            { top: '32%', delay: '4.2s', dur: '11s', scale: 0.7 },
            { top: '58%', delay: '7.5s', dur: '10s', scale: 0.85 },
            { top: '74%', delay: '2.4s', dur: '13s', scale: 0.55 },
            { top: '22%', delay: '10s', dur: '14s', scale: 0.45 },
          ].map((star, i) => (
            <span
              key={i}
              className="shooting-star"
              style={{ '--top': star.top, '--delay': star.delay, '--dur': star.dur, '--scale': star.scale }}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-xl text-center">
          <ScrollReveal variant="up" delay={0}>
            <p className="flex items-center justify-center gap-3 text-[0.65rem] font-medium tracking-[0.35em] text-gold uppercase">
              <span className="h-px w-8 shrink-0 bg-gold/70" aria-hidden="true" />
              Waitlist
              <span className="h-px w-8 shrink-0 bg-gold/70" aria-hidden="true" />
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[0.98] font-medium tracking-tight text-cream lowercase sm:text-7xl">
              reserve your loci
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/65">
              First in line for the first drop. No payment today.
            </p>
          </ScrollReveal>

          <ScrollReveal
            variant="up"
            delay={1}
            className="mt-10 rounded-2xl bg-white p-6 text-left shadow-2xl shadow-black/35 sm:p-8"
          >
            {submitted ? (
              <div className="py-4 text-center">
                <CheckCircle2 size={34} strokeWidth={1.4} className="mx-auto text-gold-light" />
                <h2 className="mt-5 font-display text-4xl font-medium text-cream">
                  You&rsquo;re on the list.
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
                  Thanks, {name}. We saved your spot for the {selected.name} {selected.variant}{' '}
                  and will email {email} when the first drop opens.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <fieldset>
                  <legend className={labelClass}>Your pack</legend>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {trackers.map((product) => {
                      const active = selected?.id === product.id
                      return (
                        <button
                          key={product.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelected(product)}
                          className={`min-h-12 rounded-md border text-sm transition-colors ${
                            active
                              ? 'border-brand bg-brand text-white'
                              : 'border-cream/15 text-cream/70 hover:border-cream/35 hover:text-cream'
                          }`}
                        >
                          {product.variant}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="waitlist-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    required
                    className={`mt-2 ${inputClass}`}
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className={`mt-2 ${inputClass}`}
                  />
                </div>
                <Button type="submit" disabled={saveStatus === 'saving'} className="w-full">
                  {saveStatus === 'saving' ? 'Saving…' : 'Join the waitlist'}
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal
            variant="fade"
            delay={2}
            as="p"
            className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-cream/65"
          >
            Loci is a sticker-thin tracker — under 2&nbsp;mm, with 22 months of battery.
            You&rsquo;ll be notified the moment Loci drops.
          </ScrollReveal>

          <ScrollReveal
            variant="fade"
            delay={3}
            as="p"
            className="mt-5 text-[0.65rem] font-medium tracking-[0.3em] text-cream/45 uppercase"
          >
            No payment today · Early access · Leave anytime
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
