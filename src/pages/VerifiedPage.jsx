import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Smartphone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'

export default function VerifiedPage() {
  return (
    <>
      <PageHeader
        label="Account"
        title="Thanks for"
        emphasis="verifying"
        subtitle="Your email is confirmed and your Loci account is ready."
      />

      <section className="bg-charcoal pb-24">
        <div className="mx-auto max-w-xl px-6">
          <ScrollReveal>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-cream/10 bg-charcoal-light/60 p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-gold" strokeWidth={1.5} />
              <p className="text-[15px] leading-[1.85] text-cream/70">
                You&apos;re all set. Head back to the Loci app and sign in with
                your email or username to start tracking your tags.
              </p>
              <a
                href="loci://"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-charcoal transition hover:bg-gold-light"
              >
                <Smartphone className="h-4 w-4" />
                Open the Loci app
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-cream/60 transition hover:text-cream"
              >
                Back to the website
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
