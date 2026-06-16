-- Remove exposição pública direta; leads devem entrar pela API Next validada.
drop policy if exists "insert_publico" on public.leads_immovi;
drop policy if exists "select_bloqueado" on public.leads_immovi;

revoke select, insert, update, delete on public.leads_immovi from anon, authenticated;
revoke select, insert, update, delete on public.leads_immovi_historico from anon, authenticated;
revoke select, insert, update, delete on public.crm_users from anon, authenticated;

grant select, insert, update, delete on public.leads_immovi to service_role;
grant select, insert, update, delete on public.leads_immovi_historico to service_role;
grant select, insert, update, delete on public.crm_users to service_role;

-- Constraints de integridade
alter table public.leads_immovi
  alter column status set not null,
  alter column origem set not null;

alter table public.leads_immovi
  add constraint if not exists leads_immovi_status_check
  check (status in (
    'Novo',
    'Em atendimento',
    'Consultoria agendada',
    'Proposta enviada',
    'Aguardando retorno',
    'Convertido',
    'Perdido'
  ));

alter table public.crm_users
  alter column role set not null,
  add constraint if not exists crm_users_role_check
  check (role in ('admin', 'atendente', 'viewer'));

-- Tabela de sessões para revogação de JWT
create table if not exists public.crm_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.crm_users(id) on delete cascade,
  jti text unique not null,
  revoked_at timestamptz,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

alter table public.crm_sessions enable row level security;
revoke select, insert, update, delete on public.crm_sessions from anon, authenticated;
grant select, insert, update, delete on public.crm_sessions to service_role;
