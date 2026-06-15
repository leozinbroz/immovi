import { createClient } from '@supabase/supabase-js'

// Fallbacks de placeholder evitam que o createClient lance erro antes de o
// projeto Supabase ser configurado. Em produção, defina as variáveis reais.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
)
