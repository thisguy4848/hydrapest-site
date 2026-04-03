import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const _configured = supabaseUrl !== '' && supabaseKey !== ''

// Pass a placeholder URL when not configured to avoid createClient throwing.
// All store functions check isSupabaseConfigured() before making any calls.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key'
)

export function isSupabaseConfigured(): boolean {
  return _configured
}
