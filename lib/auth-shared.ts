export const COOKIE_NAME = 'crm_token'
export const TOKEN_MAX_AGE = 60 * 60 * 8 // 8 horas
export const TOKEN_ISSUER = 'immovi-crm'
export const TOKEN_AUDIENCE = 'immovi-crm-admin'

export type CrmRole = 'admin' | 'atendente' | 'viewer'

export interface SessionPayload {
  sub: string
  email: string
  nome?: string
  role?: CrmRole
  jti?: string
}

export function getSecretString(): string {
  const secret = process.env.CRM_JWT_SECRET?.trim()
  if (!secret || secret.length < 32) {
    throw new Error(
      'CRM_JWT_SECRET deve ser definido com pelo menos 32 caracteres.'
    )
  }
  return secret
}
