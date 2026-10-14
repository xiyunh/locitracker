import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { buttonClass, inputClass, labelClass, panelClass } from '../lib/ui'

export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const cls = buttonClass(variant, size, className)
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}

export function Eyebrow({ children, tone = 'gold', className = '', line = true }) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.35em] uppercase ${
        tone === 'light' ? 'text-gold-light' : 'text-gold'
      } ${className}`}
    >
      {line && <span className="h-px w-8 shrink-0 bg-gold/70" aria-hidden="true" />}
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  number,
  title,
  copy,
  align = 'left',
  delay = 0,
  className = '',
}) {
  const centered = align === 'center'
  return (
    <ScrollReveal
      variant="up"
      delay={delay}
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {(eyebrow || number) && (
        <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
          {number && <span className="numeral">{number}</span>}
          {eyebrow && <Eyebrow line={!centered && !number}>{eyebrow}</Eyebrow>}
        </div>
      )}
      <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium tracking-tight text-cream sm:text-6xl">
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-6 text-base leading-relaxed text-cream/65 ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {copy}
        </p>
      )}
    </ScrollReveal>
  )
}

export function Panel({ className = '', children, ...props }) {
  return (
    <div className={`${panelClass} p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function Field({ label, id, className = '', ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={`mt-2 ${inputClass}`} {...props} />
    </div>
  )
}
