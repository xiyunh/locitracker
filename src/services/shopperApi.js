const keys = {
  account: 'loci-account',
  cart: 'loci-cart',
  profile: 'loci-shopper-profile',
}

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard',
    detail: '3-5 business days',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express',
    detail: '2 business days',
    price: 12,
  },
  {
    id: 'priority',
    name: 'Priority',
    detail: 'Next business day',
    price: 24,
  },
]

function read(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  if (typeof window === 'undefined') return value
  window.localStorage.setItem(key, JSON.stringify(value))
  return value
}

function remove(key) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key)
  }
}

function createProfile(account) {
  return {
    contact: {
      name: account?.name ?? '',
      email: account?.email ?? '',
      phone: '',
    },
    addresses: [],
    defaultAddressId: null,
    shippingMethod: 'standard',
    preferences: {
      smsUpdates: false,
      emailReceipts: true,
      launchAlerts: true,
    },
    orderHistory: [],
  }
}

function delay(value) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(value), 120)
  })
}

export const shopperApi = {
  shippingOptions,

  loadSnapshot() {
    return {
      account: read(keys.account, null),
      cart: read(keys.cart, []),
      profile: read(keys.profile, null),
    }
  },

  async saveCart(cart) {
    return delay(write(keys.cart, cart))
  },

  async saveAccount(account) {
    if (account) {
      write(keys.account, account)
    } else {
      remove(keys.account)
    }
    return delay(account)
  },

  async saveProfile(profile) {
    if (profile) {
      write(keys.profile, profile)
    } else {
      remove(keys.profile)
    }
    return delay(profile)
  },

  createProfile,
}
