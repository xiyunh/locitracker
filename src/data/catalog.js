export const catalog = [
  {
    id: 'loci-sticker-single',
    name: 'Loci Sticker',
    variant: 'Single',
    description: 'One sticker-thin tracker for keys, a passport, a wallet, or everyday carry.',
    price: 29,
    category: 'Tracker',
    gradient: 'from-brand/20 via-brand/10 to-charcoal-mid',
    tagStyle: 'single',
  },
  {
    id: 'loci-sticker-four-pack',
    name: 'Loci Sticker',
    variant: '4 Pack',
    description: 'Stick one on luggage, bags, remotes, and shared essentials while saving $17.',
    price: 99,
    category: 'Tracker',
    gradient: 'from-charcoal-mid via-brand/10 to-brand/20',
    tagStyle: 'quad',
    badge: 'Save $17',
  },
  {
    id: 'loci-adhesive-refills',
    name: 'Adhesive Refill Pack',
    variant: '6 pads',
    description: 'Fresh adhesive pads so a Loci can move from one item to the next.',
    price: 12,
    category: 'Accessory',
  },
  {
    id: 'loci-key-fob',
    name: 'Loci Key Fob',
    variant: 'Stainless Steel',
    description: 'A slim steel fob that turns a sticker into a key ring.',
    price: 25,
    category: 'Accessory',
  },
  {
    id: 'loci-leather-fob',
    name: 'Loci Leather Fob',
    variant: 'Leather',
    description: 'Premium leather sleeve with a polished ring for a warmer everyday carry.',
    price: 39,
    category: 'Accessory',
  },
]

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export const getProductById = (id) => catalog.find((product) => product.id === id)
export const productLabel = (product) => `${product.name} ${product.variant}`
