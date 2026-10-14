/**
 * Monochrome payment-method symbols for the footer, drawn in the site palette.
 */

function Badge({ label, children, wide = false }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`inline-flex h-7 items-center justify-center rounded-[5px] border border-white/15 bg-white/[0.04] px-2 ${
        wide ? 'min-w-14' : 'min-w-11'
      }`}
    >
      {children}
    </span>
  )
}

const wordmark = 'font-sans text-[0.6rem] font-bold tracking-tight text-cream/80'

function AppleGlyph({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 18" fill="currentColor" aria-hidden="true">
      <path d="M12.5 9.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2-.8-2-3.3zM10.4 3.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
    </svg>
  )
}

export default function PaymentIcons({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Apple Pay */}
      <Badge label="Apple Pay" wide>
        <span className="flex items-center gap-0.5 text-cream/80">
          <AppleGlyph />
          <span className="font-sans text-[0.62rem] font-semibold text-cream/80">Pay</span>
        </span>
      </Badge>

      {/* Google Pay */}
      <Badge label="Google Pay" wide>
        <span className="flex items-baseline gap-0.5">
          <span className="font-sans text-[0.68rem] font-bold text-cream/80">G</span>
          <span className="font-sans text-[0.62rem] font-medium text-cream/70">Pay</span>
        </span>
      </Badge>

      {/* PayPal */}
      <Badge label="PayPal" wide>
        <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M6.5 17.5 8 8.2c.1-.6.6-1 1.2-1h3.2c2.4 0 3.9 1.2 3.5 3.5-.4 2.6-2.1 3.8-4.5 3.8H9.9l-.6 3h-2.8z"
            fill="none"
            stroke="#d7bda2"
            strokeWidth="1.1"
          />
          <path
            d="M4.5 15.5 6 6.2c.1-.6.6-1 1.2-1h3.2c2.4 0 3.9 1.2 3.5 3.5-.4 2.6-2.1 3.8-4.5 3.8H7.9l-.6 3H4.5z"
            fill="none"
            stroke="#f5f0e8"
            strokeWidth="1.1"
            opacity="0.85"
          />
        </svg>
      </Badge>

      {/* Visa */}
      <Badge label="Visa">
        <span className={`${wordmark} italic`}>VISA</span>
      </Badge>

      {/* Mastercard */}
      <Badge label="Mastercard">
        <svg width="22" height="14" viewBox="0 0 26 16" aria-hidden="true">
          <circle cx="10" cy="8" r="6.2" fill="none" stroke="#f5f0e8" strokeWidth="1.2" opacity="0.85" />
          <circle cx="16" cy="8" r="6.2" fill="none" stroke="#d2b478" strokeWidth="1.2" opacity="0.9" />
        </svg>
      </Badge>

      {/* American Express */}
      <Badge label="American Express">
        <span className={wordmark}>AMEX</span>
      </Badge>

      {/* Affirm */}
      <Badge label="Affirm">
        <span className="font-sans text-[0.62rem] font-semibold tracking-tight text-cream/80">affirm</span>
      </Badge>
    </div>
  )
}
