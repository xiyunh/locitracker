import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import { Button, SectionHeading } from './ui'
import { inputClass } from '../lib/ui'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <section className="border-t border-white/5 bg-gradient-to-b from-charcoal to-charcoal-mid py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-end gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <SectionHeading
          eyebrow="Join the waitlist"
          title="Be first in line for the next Loci drop."
          copy="Early access to bundles, limited accessories, and launch pricing before they go live."
        />

        <ScrollReveal
          as="form"
          variant="right"
          delay={1}
          className="w-full"
          onSubmit={(event) => {
            event.preventDefault()
            setJoined(true)
            setEmail('')
          }}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="waitlist-email">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setJoined(false)
              }}
              placeholder="Email address"
              required
              className={`${inputClass} flex-1`}
            />
            <Button type="submit">
              Join waitlist
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="mt-4 flex min-h-6 items-center justify-between gap-4">
            <p className="text-xs text-cream/45">No spam. Unsubscribe anytime.</p>
            {joined && (
              <p className="inline-flex items-center gap-2 text-sm text-gold-light">
                <CheckCircle2 size={16} />
                You are on the list.
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
