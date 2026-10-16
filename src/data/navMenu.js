import { calendlyUrl } from './contact'

export const navItems = [
  {
    label: 'Shop',
    to: '/shop',
    summary: 'Loci Sticker trackers and bundles, ready to pair with the Loci app.',
    links: [
      { label: 'Loci Sticker', description: 'One tracker for keys, passport, or bag.', price: '$29', to: '/product/loci-sticker-single' },
      { label: 'Loci Sticker 4-Pack', description: 'Tag everything at home — save $17.', price: '$99', to: '/product/loci-sticker-four-pack' },
      { label: 'Compare packs', description: 'See what fits your setup.', to: '/shop' },
      { label: 'Pre order', description: 'Reserve the next drop before launch.', to: '/pre-order' },
    ],
  },
  {
    label: 'Why Loci',
    to: '/features',
    summary: 'Why a sticker beats a tag: thinner, networked, and private by design.',
    links: [
      { label: 'Sticks to anything', description: 'Thin enough for a passport or remote.', to: '/features' },
      { label: 'The Loci network', description: 'Locate items even when far away.', to: '/features' },
      { label: 'Keys & luggage', description: 'Built for everyday carry.', to: '/features' },
      { label: 'Privacy & security', description: 'Encrypted, anonymous signals.', to: '/features' },
    ],
  },
  {
    label: 'For Enterprises',
    to: '/enterprise',
    summary: 'Track tools, fleets, and shared equipment with sticker-thin tags.',
    links: [
      { label: 'Equipment & tools', description: 'Tag shared gear so it comes back.', to: '/enterprise' },
      { label: 'Fleet & logistics', description: 'Follow crates, cases, and kits between sites.', to: '/enterprise' },
      { label: 'Teams at scale', description: 'Volume packs for every seat and site.', to: '/enterprise' },
      { label: 'Talk to us', description: 'Book a 20-minute demo call.', ...(calendlyUrl ? { href: calendlyUrl } : { to: '/enterprise#book' }) },
    ],
  },
]
