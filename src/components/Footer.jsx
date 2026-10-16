import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import ScrollReveal from './ScrollReveal'
import BrandLogo from './BrandLogo'
import { Button } from './ui'
import { inputClass } from '../lib/ui'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Loci Sticker', to: '/product/loci-sticker-single' },
      { label: 'Loci Sticker 4-Pack', to: '/product/loci-sticker-four-pack' },
      { label: 'Pre order', to: '/pre-order' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Why LOCI', to: '/features' },
      { label: 'Sticks to anything', to: '/features' },
      { label: 'The Loci network', to: '/features' },
      { label: 'A day with Loci', to: '/experience' },
      { label: 'Blog', to: '/blog' },
      { label: 'For enterprises', to: '/enterprise' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Your bag', to: '/cart' },
      { label: 'Account', to: '/account' },
      { label: 'Shipping & Returns', to: '/returns' },
      { label: 'Contact Us', href: '#' },
    ],
  },
]

const socials = [
  {
    label: 'Instagram',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'X (Twitter)',
    path: (
      <>
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </>
    ),
  },
  {
    label: 'TikTok',
    path: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  },
  {
    label: 'Facebook',
    path: <path d="M14 8h2.5V4.5H14A4.5 4.5 0 0 0 9.5 9v2.5H7V15h2.5v6H13v-6h2.5l.5-3.5h-3V9c0-.6.4-1 1-1z" />,
  },
  {
    label: 'LinkedIn',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5v6.5M8 7.2v.1M12 17v-4a2.5 2.5 0 0 1 5 0v4" />
      </>
    ),
  },
]

const legal = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Accessibility', to: '/accessibility' },
  { label: 'Returns & Refunds', to: '/returns' },
]

function FooterLink({ link }) {
  const className = 'text-sm text-cream/60 transition-colors hover:text-gold-light'
  return link.to ? (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  ) : (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer id="footer" className="border-t border-white/10 bg-charcoal-light">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <ScrollReveal variant="left" delay={0} className="lg:col-span-5">
            <BrandLogo variant="footer" />
            <h3 className="mt-6 max-w-sm font-display text-3xl leading-snug font-medium text-cream">
              Get Loci tips, deals, and new accessory drops.
            </h3>
            <form
              className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
                setEmail('')
              }}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSubscribed(false)
                }}
                placeholder="Email address"
                required
                className={`${inputClass} flex-1`}
              />
              <Button type="submit">
                Subscribe
                <ArrowRight size={15} />
              </Button>
            </form>
            <p className="mt-3 min-h-5 text-xs text-cream/50">
              {subscribed ? (
                <span className="inline-flex items-center gap-1.5 text-gold-light">
                  <CheckCircle2 size={14} />
                  You are subscribed.
                </span>
              ) : (
                <>
                  We care about protecting your data.{' '}
                  <Link to="/privacy" className="text-cream/70 underline-offset-4 hover:underline">
                    Read our Privacy Policy.
                  </Link>
                </>
              )}
            </p>

            {/* Social links (placeholders for now) */}
            <div className="mt-8">
              <p className="text-[0.65rem] font-medium tracking-[0.35em] text-gold uppercase">Follow Loci</p>
              <div className="mt-4 flex gap-4">
                {socials.map(({ label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={`${label} (coming soon)`}
                    className="text-xs tracking-[0.18em] whitespace-nowrap text-cream/60 uppercase transition-colors hover:text-gold-light"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            {columns.map((column, i) => (
              <ScrollReveal key={column.title} variant="up" delay={i + 1}>
                <h4 className="text-[0.65rem] font-medium tracking-[0.35em] text-gold uppercase">{column.title}</h4>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal
          variant="subtle"
          delay={4}
          className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-xs text-cream/50 transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <p className="mt-6 text-xs leading-relaxed text-cream/40">
          © 2026 Loci — the world&apos;s first sticker tracker. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
