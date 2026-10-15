/**
 * Payment methods accepted at checkout, listed as plain text so the footer
 * stays quiet and typographic.
 */

const methods = ['Apple Pay', 'Google Pay', 'PayPal', 'Visa', 'Mastercard', 'Amex', 'Affirm']

export default function PaymentIcons({ className = '' }) {
  return (
    <p className={`text-xs leading-relaxed tracking-[0.14em] text-cream/45 uppercase ${className}`}>
      {methods.join(' · ')}
    </p>
  )
}
