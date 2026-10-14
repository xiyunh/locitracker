import { useEffect, useMemo, useState } from 'react'
import { catalog, getProductById } from '../data/catalog'
import { StoreContext } from './store'
import { shopperApi } from '../services/shopperApi'
import { saveOrderToBackend, signUpShopper, syncShopperProfile } from '../services/backend'

export function StoreProvider({ children }) {
  const [snapshot] = useState(() => shopperApi.loadSnapshot())
  const [cart, setCartState] = useState(snapshot.cart)
  const [account, setAccountState] = useState(snapshot.account)
  const [profile, setProfileState] = useState(
    snapshot.profile ?? shopperApi.createProfile(snapshot.account),
  )
  const [toast, setToast] = useState(null)
  const setCart = (updater) => {
    setCartState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      shopperApi.saveCart(next)
      return next
    })
  }

  const setAccount = (updater) => {
    setAccountState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      shopperApi.saveAccount(next)
      return next
    })
  }

  const setProfile = (updater) => {
    setProfileState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater
      shopperApi.saveProfile(next)
      return next
    })
  }

  // Keep the backend copy of the shopper profile fresh (no-op without Supabase config).
  useEffect(() => {
    if (!account?.email) return undefined
    const timer = window.setTimeout(() => {
      syncShopperProfile(account.email, profile)
    }, 900)
    return () => window.clearTimeout(timer)
  }, [account?.email, profile])

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProductById(item.id)
          return product ? { ...product, quantity: item.quantity } : null
        })
        .filter(Boolean),
    [cart],
  )

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const shippingOptions = shopperApi.shippingOptions
  const selectedShipping =
    shippingOptions.find((option) => option.id === profile.shippingMethod) ?? shippingOptions[0]
  const defaultAddress =
    profile.addresses.find((address) => address.id === profile.defaultAddressId) ?? null

  const value = {
    account,
    toast,
    dismissToast: () => setToast(null),
    cartItems,
    defaultAddress,
    itemCount,
    profile,
    products: catalog,
    selectedShipping,
    shippingOptions,
    subtotal,
    addToCart(id, quantity = 1) {
      setCart((current) => {
        const existing = current.find((item) => item.id === id)
        if (existing) {
          return current.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        }
        return [...current, { id, quantity }]
      })
    },
    updateQuantity(id, quantity) {
      setCart((current) =>
        current
          .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
          .filter((item) => item.quantity > 0),
      )
    },
    removeFromCart(id) {
      setCart((current) => current.filter((item) => item.id !== id))
    },
    clearCart() {
      setCart([])
    },
    signIn(profile) {
      const account = {
        name: profile.name.trim(),
        email: profile.email.trim(),
        joinedAt: new Date().toISOString(),
      }
      setAccount({
        ...account,
      })
      signUpShopper(account).then((result) => {
        if (result?.emailSent) {
          setToast({
            id: Date.now(),
            title: `Welcome, ${account.name}!`,
            message: 'A welcome email is on its way to your inbox.',
          })
        } else if (result?.created) {
          setToast({
            id: Date.now(),
            title: `Welcome, ${account.name}!`,
            message: 'Your Loci profile has been created.',
          })
        }
      })
      setProfile((current) => ({
        ...current,
        contact: {
          ...current.contact,
          name: account.name,
          email: account.email,
        },
      }))
    },
    signOut() {
      setAccount(null)
    },
    updateContact(contact) {
      setProfile((current) => ({
        ...current,
        contact: {
          ...current.contact,
          ...contact,
        },
      }))
      if (account) {
        setAccount({
          ...account,
          name: contact.name?.trim() || account.name,
          email: contact.email?.trim() || account.email,
        })
      }
    },
    addAddress(address) {
      setProfile((current) => {
        const id = `addr-${Date.now()}`
        const nextAddress = {
          id,
          label: address.label.trim() || 'Shipping address',
          name: address.name.trim(),
          line1: address.line1.trim(),
          line2: address.line2.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          postalCode: address.postalCode.trim(),
          country: address.country.trim() || 'United States',
        }

        return {
          ...current,
          addresses: [...current.addresses, nextAddress],
          defaultAddressId: current.defaultAddressId ?? id,
        }
      })
    },
    removeAddress(id) {
      setProfile((current) => {
        const addresses = current.addresses.filter((address) => address.id !== id)
        return {
          ...current,
          addresses,
          defaultAddressId:
            current.defaultAddressId === id ? (addresses[0]?.id ?? null) : current.defaultAddressId,
        }
      })
    },
    setDefaultAddress(id) {
      setProfile((current) => ({
        ...current,
        defaultAddressId: id,
      }))
    },
    updateShippingMethod(id) {
      setProfile((current) => ({
        ...current,
        shippingMethod: id,
      }))
    },
    updatePreferences(preferences) {
      setProfile((current) => ({
        ...current,
        preferences: {
          ...current.preferences,
          ...preferences,
        },
      }))
    },
    placeOrder(summary) {
      const order = {
        id: `LOCI-${Date.now().toString().slice(-6)}`,
        placedAt: new Date().toISOString(),
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: defaultAddress,
        shippingMethod: selectedShipping,
        totals: summary,
        status: defaultAddress ? 'Processing' : 'Address needed',
      }

      setProfile((current) => ({
        ...current,
        orderHistory: [order, ...current.orderHistory],
      }))
      setCart([])
      saveOrderToBackend(account?.email ?? profile.contact.email ?? null, order)
      return order
    },
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
