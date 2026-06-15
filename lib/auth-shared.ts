/**
 * Constantes e tipos de autenticação compartilhados — sem dependências
 * (não importa jose). Seguro para Edge e Node.
 */

export const COOKIE_NAME = 'crm_token'
export const TOKEN_MAX_AGE = 60 * 60 * 24 * 7 // 7 dias (segundos)

export interface SessionPayload {
  sub: string
  email: string
  nome?: string
  role?: string
}

export function getSecretString(): string {
  return (
    process.env.CRM_JWT_SECRET || 'dev-insecure-secret-change-me-immovi'
  )
}
