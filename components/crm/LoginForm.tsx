'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock, AlertCircle } from 'lucide-react'

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (loading) return
    setErro(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErro(data.error || 'Não foi possível entrar.')
        return
      }
      router.replace(next)
      router.refresh()
    } catch {
      setErro('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-brancoFrio p-6 shadow-2xl shadow-black/30 md:p-8"
    >
      <h1 className="text-xl font-bold text-azulEscuro">Entrar no painel</h1>
      <p className="mt-1 text-sm text-cinzaMedio">
        Acesse com suas credenciais de administrador.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-azulEscuro">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full rounded-lg border border-cinzaClaro bg-white px-4 py-3 text-sm text-azulEscuro outline-none transition-colors focus:border-verde focus:ring-2 focus:ring-verde/30"
            placeholder="voce@immovicontabilidade.com.br"
          />
        </div>
        <div>
          <label htmlFor="senha" className="mb-1.5 block text-sm font-medium text-azulEscuro">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-cinzaClaro bg-white px-4 py-3 text-sm text-azulEscuro outline-none transition-colors focus:border-verde focus:ring-2 focus:ring-verde/30"
            placeholder="••••••••"
          />
        </div>
      </div>

      {erro && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          {erro}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-azulEscuro px-6 py-3.5 text-base font-semibold text-brancoFrio transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Entrando...
          </>
        ) : (
          <>
            <Lock size={18} /> Entrar
          </>
        )}
      </button>
    </form>
  )
}
