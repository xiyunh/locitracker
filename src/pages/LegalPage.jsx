import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { legalPages } from '../data/legal'

const slugify = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Soft sand-gold accents reserved for the legal pages' quiet, documentary tone.
const accent = 'text-[#b49b6c]'
const accentFaint = 'bg-[#d7c5a4]'

const otherPages = [
  { key: 'terms', label: 'Terms & Conditions', to: '/terms' },
  { key: 'privacy', label: 'Privacy Policy', to: '/privacy' },
  { key: 'accessibility', label: 'Accessibility', to: '/accessibility' },
  { key: 'returns', label: 'Returns & Refunds', to: '/returns' },
]

function Body({ item }) {
  if (typeof item === 'string') {
    return <p className="mt-4 text-[15px] leading-[1.9] text-cream/70">{item}</p>
  }
  return (
    <ul className="mt-4 space-y-3">
      {item.list.map((entry) => (
        <li key={entry} className="flex gap-3 text-[15px] leading-[1.8] text-cream/70">
          <span className={`mt-[0.7rem] h-px w-5 shrink-0 ${accentFaint}`} aria-hidden="true" />
          {entry}
        </li>
      ))}
    </ul>
  )
}

export default function LegalPage({ page }) {
  const doc = legalPages[page]

  return (
    <div className="bg-white">
      <header className="pt-36 pb-14 lg:pt-44 lg:pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <ScrollReveal variant="up" delay={0}>
            <p className="text-[0.65rem] font-medium tracking-[0.35em] text-[#a6adb9] uppercase">
              {doc.label}
            </p>
            <h1 className="mt-5 text-4xl font-light tracking-tight text-[#8b93a0] sm:text-5xl">
              {doc.title} {doc.emphasis}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed font-light text-[#9aa2ae]">
              {doc.intro}
            </p>
          </ScrollReveal>
        </div>
      </header>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[16rem_1fr] lg:px-10">
          {/* Section index */}
          <ScrollReveal variant="left" delay={0} className="lg:sticky lg:top-32 lg:self-start">
            <p className={`text-[0.65rem] font-medium tracking-[0.35em] uppercase ${accent}`}>
              On this page
            </p>
            <ol className="mt-5 space-y-3 border-l border-cream/10 pl-5">
              {doc.sections.map((section, i) => (
                <li key={section.title}>
                  <a
                    href={`#${slugify(section.title)}`}
                    className="group flex items-baseline gap-3 text-sm text-cream/55 transition-colors hover:text-cream"
                  >
                    <span className={`text-[0.65rem] tabular-nums ${accent}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs text-cream/40">Last updated {doc.updated}</p>
          </ScrollReveal>

          {/* Document */}
          <div className="max-w-3xl">
            {doc.sections.map((section, i) => (
              <ScrollReveal
                key={section.title}
                variant="up"
                delay={Math.min(i, 2)}
                className="scroll-mt-36 border-b border-cream/8 py-10 first:pt-0 last:border-0"
                id={slugify(section.title)}
              >
                <p className={`text-[0.65rem] font-medium tracking-[0.3em] uppercase ${accent}`}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-2 font-display text-3xl font-medium text-cream">
                  {section.title}
                </h2>
                {section.body.map((item, j) => (
                  <Body key={j} item={item} />
                ))}
              </ScrollReveal>
            ))}

            <ScrollReveal variant="subtle" delay={1} className="mt-12">
              <p className={`text-[0.65rem] font-medium tracking-[0.35em] uppercase ${accent}`}>
                More policies
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                {otherPages
                  .filter((item) => item.key !== page)
                  .map((item) => (
                    <Link
                      key={item.key}
                      to={item.to}
                      className="inline-flex items-center gap-1.5 text-sm text-cream/60 transition-colors hover:text-cream"
                    >
                      {item.label}
                      <ArrowRight size={13} />
                    </Link>
                  ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
