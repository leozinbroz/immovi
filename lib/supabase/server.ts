import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase com service role.
 * USO RESTRITO: apenas em app/api/** e código server-side do CRM.
 * NUNCA importar em componentes client-side — a importação de 'server-only'
 * faz o build falhar caso isso aconteça.
 *
 * Os fallbacks de placeholder evitam erro de inicialização antes de o projeto
 * Supabase estar configurado. Use `isSupabaseConfigurado()` para checar.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export function isSupabaseConfigurado(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}
