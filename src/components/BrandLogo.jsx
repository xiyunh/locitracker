import logoLight from '../assets/loci-logo-light.png'

const sizes = {
  nav: 'h-14 w-24 sm:h-16 sm:w-28',
  footer: 'h-20 w-32',
}

export default function BrandLogo({ variant = 'nav', className = '' }) {
  return (
    <span className={`relative block overflow-hidden ${sizes[variant]} ${className}`}>
      <img
        src={logoLight}
        alt="Loci"
        className="absolute top-[54%] left-0 h-auto w-full -translate-y-1/2 object-contain brightness-0 opacity-85"
      />
    </span>
  )
}
