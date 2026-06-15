-- =====================================================================
-- Immovi Contabilidade — Migration inicial
-- =====================================================================

-- Tabela principal de leads
create table if not exists leads_immovi (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  whatsapp text not null,
  email text,
  tipo_atuacao text not null,
  tipo_atuacao_outro text,
  situacao_atual text not null,
  faturamento_mensal text not null,
  emite_nota text,
  principal_necessidade text not null,
  mensagem text,
  status text default 'Novo',
  origem text default 'site_immovi',
  tags text[],
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- Histórico de ações no CRM
create table if not exists leads_immovi_historico (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads_immovi(id) on delete cascade,
  observacao text,
  status_anterior text,
  status_novo text,
  criado_em timestamptz default now()
);

-- Usuários do CRM
create table if not exists crm_users (
  id uuid primary key default gen_random_uuid(),
  nome text,
  email text unique not null,
  senha_hash text not null,
  role text default 'admin',
  ativo boolean default true,
  criado_em timestamptz default now(),
  atualizado_em timestamptz default now()
);

-- =====================================================================
-- RLS: leads_immovi
-- =====================================================================
alter table leads_immovi enable row level security;

-- Público pode inserir (formulário)
create policy "insert_publico" on leads_immovi
  for insert with check (true);

-- Público não pode ler, editar ou deletar
create policy "select_bloqueado" on leads_immovi
  for select using (false);

-- =====================================================================
-- RLS: historico (apenas server-side via service role)
-- =====================================================================
alter table leads_immovi_historico enable row level security;

-- =====================================================================
-- RLS: crm_users (apenas server-side)
-- =====================================================================
alter table crm_users enable row level security;
