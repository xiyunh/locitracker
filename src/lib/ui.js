// Shared class recipes so every button, input, badge, and panel reads the same.

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-40'

const buttonVariants = {
  primary: 'bg-cream text-brand hover:bg-gold',
  secondary: 'border border-white/15 text-cream hover:border-gold/40 hover:text-gold-light',
  ghost: 'text-cream underline-offset-4 hover:text-gold-light hover:underline',
  gold: 'bg-gold text-charcoal hover:bg-gold-light',
}

const buttonSizes = {
  sm: 'min-h-10 px-5 text-xs tracking-widest uppercase',
  md: 'min-h-12 px-6 text-sm',
  lg: 'min-h-[3.25rem] px-8 text-sm',
  none: '',
}

export function buttonClass(variant = 'primary', size = 'md', extra = '') {
  return [buttonBase, buttonVariants[variant] ?? buttonVariants.primary, buttonSizes[size] ?? '', extra]
    .filter(Boolean)
    .join(' ')
}

export const inputClass =
  'min-h-12 w-full rounded-md border border-white/15 bg-white/5 px-4 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20'

export const labelClass = 'text-xs font-medium tracking-wide text-cream/60'

export const badgeClass =
  'inline-flex items-center rounded-md border border-gold/30 bg-gold/10 px-2.5 py-1 text-[0.65rem] font-medium tracking-widest text-gold uppercase'

export const panelClass = 'rounded-xl border border-white/10 bg-charcoal-mid'

export const tileClass = 'rounded-lg border border-white/10 bg-white/[0.03] p-4'

export const iconButtonClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-md text-cream-muted transition-colors hover:bg-white/5 hover:text-gold-light'
