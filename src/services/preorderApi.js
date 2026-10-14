import { getSupabaseConfig } from './supabase'

const PREORDER_STORAGE_KEY = 'loci-preorder-submissions'

export function readPreOrders() {
  try {
    const stored = window.localStorage.getItem(PREORDER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function savePreOrderLocally(submission) {
  const submissions = readPreOrders()
  const withoutDuplicateEmail = submissions.filter(
    (item) => item.email.toLowerCase() !== submission.email.toLowerCase(),
  )
  window.localStorage.setItem(
    PREORDER_STORAGE_KEY,
    JSON.stringify([...withoutDuplicateEmail, submission]),
  )
}

export async function savePreOrderToSupabase(submission) {
  const config = getSupabaseConfig()
  if (!config) return false

  const response = await fetch(`${config.url}/rest/v1/preorders`, {
    method: 'POST',
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      product: submission.product,
      created_at: submission.createdAt,
    }),
  })

  if (!response.ok) {
    throw new Error('Supabase preorder save failed')
  }

  return true
}

export function downloadPreOrdersCsv() {
  const submissions = readPreOrders()
  const headers = ['Name', 'Email', 'Product', 'Submitted At']
  const escapeCsvValue = (value) => `"${String(value).replace(/"/g, '""')}"`
  const rows = submissions.map((item) =>
    [item.name, item.email, item.product, item.createdAt].map(escapeCsvValue).join(','),
  )
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `loci-preorders-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function createSubmissionId(email) {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${email.trim().toLowerCase()}`
}
