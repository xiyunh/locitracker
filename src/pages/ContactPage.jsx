import { Link } from 'react-router-dom'
import { ArrowRight, CalendarClock, Mail } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import { Eyebrow } from '../components/ui'
import { calendlyUrl } from '../data/contact'

const supportEmail = 'info@locitracker.com'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Support"
        title="Contact"
        emphasis="us"
        subtitle="Questions about Loci, your waitlist spot, or an order — we read everything and reply within two business days."
      />

      <section className="mx-3 mb-6 rounded-[2rem] bg-white py-16 md:mx-6 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <ScrollReveal
              variant="up"
              delay={0}
              className="card-lift flex flex-col rounded-2xl bg-[#eef0f5] p-8 lg:p-10"
            >
              <Mail size={26} strokeWidth={1.5} className="text-gold-light" />
              <h2 className="mt-6 font-display text-3xl font-medium text-cream">Email us</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">
                The fastest way to reach the team — for anything from waitlist questions to
                accessibility feedback. Include your order number (LOCI-XXXXXX) if you have one.
              </p>
              <a
                href={`mailto:${supportEmail}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream underline-offset-4 hover:underline"
              >
                {supportEmail}
                <ArrowRight size={15} />
              </a>
            </ScrollReveal>

            <ScrollReveal
              variant="up"
              delay={1}
              className="card-lift flex flex-col rounded-2xl bg-[#eef0f5] p-8 lg:p-10"
            >
              <CalendarClock size={26} strokeWidth={1.5} className="text-gold-light" />
              <h2 className="mt-6 font-display text-3xl font-medium text-cream">Book a call</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream-muted">
                Exploring Loci for your team, fleet, or equipment? Grab twenty minutes with us
                and we will walk through it together.
              </p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cream underline-offset-4 hover:underline"
              >
                Schedule a demo
                <ArrowRight size={15} />
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="subtle" delay={2} className="mt-14">
            <Eyebrow>Good to know</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              <Link
                to="/returns"
                className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Shipping &amp; returns
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/accessibility"
                className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Accessibility
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
              >
                Privacy policy
                <ArrowRight size={13} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
