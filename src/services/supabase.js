/**
 * Shared Supabase config. The site works fully offline/local without it;
 * when the env vars are set, pre-orders, sign-ups, profiles, and orders
 * are synced to the backend.
 */
export function getSupabaseConfig() {
  const env = import.meta.env
  const url = env.VITE_SUPABASE_URL?.replace(/\/$/, '')
  const anonKey = env.VITE_SUPABASE_ANON_KEY
  return url && anonKey ? { url, anonKey } : null
}

export function restHeaders(anonKey) {
  return {
    apikey: anonKey,
    Authorization: `Bearer ${anonKey}`,
    'Content-Type': 'application/json',
  }
}
