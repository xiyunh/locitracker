import { createClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './supabase'

/**
 * Shared auth client — the SAME Supabase project and auth.users as the Loci
 * mobile app, so one account works in both places. Null when env is not
 * configured; callers fall back to local-only behavior.
 */
const config = getSupabaseConfig()

export const supabase = config
  ? createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // Email-confirmation links (from app or site sign-up) land on
        // /verified and establish the session automatically.
        detectSessionInUrl: true,
      },
    })
  : null

/** Mirrors the app's ensureProfileRow: keep public.profiles in sync. */
export async function ensureProfileRow(user) {
  if (!supabase || !user) return
  const meta = user.user_metadata ?? {}
  try {
    await supabase.from('profiles').upsert({
      user_id: user.id,
      username: meta.username?.toLowerCase() ?? null,
      display_name: meta.full_name ?? null,
    })
  } catch {
    // Offline or table missing — retried on next sign-in.
  }
}

export function accountFromUser(user) {
  if (!user) return null
  const meta = user.user_metadata ?? {}
  return {
    name: meta.full_name ?? meta.username ?? '',
    email: user.email ?? '',
    joinedAt: user.created_at ?? new Date().toISOString(),
  }
}
