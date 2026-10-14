import { getSupabaseConfig, restHeaders } from './supabase'

/**
 * Backend sync for shopper data. Every call is safe to fire-and-forget:
 * without Supabase config it resolves to null and the site stays local-only.
 */

/**
 * Records a sign-up server-side and triggers the welcome email.
 * Returns { ok, created, emailSent } from the edge function, or null.
 */
export async function signUpShopper({ name, email }) {
  const config = getSupabaseConfig()
  if (!config) return null

  try {
    const response = await fetch(`${config.url}/functions/v1/signup`, {
      method: 'POST',
      headers: restHeaders(config.anonKey),
      body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

/** Records a profile snapshot (append-only; latest row per email is current). */
export async function syncShopperProfile(email, profile) {
  const config = getSupabaseConfig()
  if (!config || !email) return null

  try {
    const response = await fetch(`${config.url}/rest/v1/shopper_profile_snapshots`, {
      method: 'POST',
      headers: { ...restHeaders(config.anonKey), Prefer: 'return=minimal' },
      body: JSON.stringify({
        email: email.toLowerCase(),
        profile,
        updated_at: new Date().toISOString(),
      }),
    })
    return response.ok
  } catch {
    return null
  }
}

/** Saves a placed order. */
export async function saveOrderToBackend(email, order) {
  const config = getSupabaseConfig()
  if (!config) return null

  try {
    const response = await fetch(`${config.url}/rest/v1/orders`, {
      method: 'POST',
      headers: { ...restHeaders(config.anonKey), Prefer: 'return=minimal' },
      body: JSON.stringify({
        id: order.id,
        email: email ? email.toLowerCase() : null,
        items: order.items,
        totals: order.totals,
        shipping_address: order.shippingAddress,
        shipping_method: order.shippingMethod,
        status: order.status,
        placed_at: order.placedAt,
      }),
    })
    return response.ok
  } catch {
    return null
  }
}
