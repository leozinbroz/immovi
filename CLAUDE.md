# CLAUDE.md — Immovi Contabilidade
# Arquivo mestre de orquestração do projeto

## INSTRUÇÕES PARA O MODELO

Ao ler este arquivo pela primeira vez, responda apenas com:
"CLAUDE.md carregado. Projeto Immovi Contabilidade pronto para execução. Qual fase deseja iniciar?"

Execute uma fase por vez. Ao concluir cada fase, liste o que foi criado e pergunte se pode avançar para a próxima. Nunca avance sem confirmação. Consulte este arquivo como fonte de verdade durante todo o projeto — nunca invente constantes, cores, textos ou estruturas que não estejam aqui documentadas.

---

## VISÃO GERAL DO PROJETO

**Nome:** Immovi Contabilidade
**Slogan:** Especialistas no Ecossistema Imobiliário
**Tipo:** Site institucional + CRM interno + Captação de leads
**Base de referência:** Site Contabilizando Pet Digital (Next.js 14)
**Objetivo:** Gerar leads qualificados de profissionais e empresas do mercado imobiliário

---

## STACK OBRIGATÓRIA

- Next.js 14 com App Router
- TypeScript (strict mode)
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)
- Lucide React (ícones)
- Albert Sans (Google Fonts) — títulos, botões, menus
- Arial — fallback e textos corridos
- Google Analytics 4
- Google Tag Manager

**Proibido usar:**
- `pg`, `Pool`, `node-postgres` ou qualquer conexão direta com PostgreSQL
- `localStorage` para dados de leads
- Números de WhatsApp hardcoded nos componentes
- Chaves Supabase expostas no frontend
- Qualquer menção ao nicho pet do projeto anterior

---

## IDENTIDADE VISUAL

### Paleta oficial

```ts
// Usar exatamente estes valores em todo o projeto
colors: {
  verde: '#00D4AA',        // CTA, destaques, ações, botão WhatsApp
  cinzaClaro: '#DADCDF',   // bordas, separadores
  cinzaMedio: '#53606C',   // textos secundários
  azulEscuro: '#0A1D2E',   // fundo institucional, header, hero dark
  brancaFrio: '#F8FEFD',   // fundo claro
  azulAcinzentado: '#7690A5', // apoio, labels, elementos terciários
}
```

### Tipografia

```css
font-family: 'Albert Sans', Arial, sans-serif;
```

- Albert Sans: títulos (H1–H3), botões, menus, badges, labels de destaque
- Arial: fallback, textos corridos longos se necessário

### Direção visual

- Moderno, limpo, premium, tecnológico, confiável
- Fundo escuro `#0A1D2E` para seções institucionais de autoridade
- Fundo claro `#F8FEFD` para seções de conteúdo
- Verde `#00D4AA` exclusivo para CTAs e elementos de ação
- Sem aparência de escritório contábil tradicional
- Mobile first, responsivo, acessível

---

## CONSTANTES GLOBAIS

Criar o arquivo `lib/constants.ts` com:

```ts
export const EMPRESA = {
  nome: 'Immovi Contabilidade',
  slogan: 'Especialistas no Ecossistema Imobiliário',
  dominio: process.env.NEXT_PUBLIC_SITE_URL || 'https://immovicontabilidade.com.br',
  instagram: 'https://www.instagram.com/immovicontabilidade',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'INSERIR_NUMERO_AQUI',
  email: '',
  endereco: {
    cidade: 'Sorocaba – SP',
    logradouro: 'Rua Fernando Silva, 190 – Sala 802, Jardim Astro',
  },
  priceRange: 'R$ 257 - R$ 1.497/mês',
}

export const WHATSAPP_BASE = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || 'INSERIR_NUMERO_AQUI'}`

export function whatsappLink(mensagem: string): string {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(mensagem)}`
}

export const MENSAGENS_WHATSAPP = {
  hero: 'Olá! Gostaria de falar com um especialista da Immovi Contabilidade.',
  consultoria: 'Olá! Gostaria de solicitar uma consultoria gratuita para meu negócio no mercado imobiliário.',
  planStart: 'Olá! Tenho interesse no Plano START da Immovi Contabilidade.',
  planSmart: 'Olá! Tenho interesse no Plano SMART da Immovi Contabilidade.',
  planPerformance: 'Olá! Tenho interesse no Plano PERFORMANCE da Immovi Contabilidade.',
  aberturaEmpresa: 'Olá! Quero abrir uma empresa para atuar no mercado imobiliário com apoio da Immovi.',
  trocaContador: 'Olá! Quero trocar de contador e migrar para a Immovi Contabilidade.',
  planejamentoTributario: 'Olá! Quero fazer um planejamento tributário para minha empresa do mercado imobiliário.',
  emissaoNotas: 'Olá! Tenho dúvidas sobre emissão de notas fiscais no mercado imobiliário.',
  organizacaoFinanceira: 'Olá! Quero organizar melhor a parte financeira da minha PJ.',
  geral: 'Olá! Gostaria de saber mais sobre a Immovi Contabilidade.',
}

export const CORES = {
  verde: '#00D4AA',
  cinzaClaro: '#DADCDF',
  cinzaMedio: '#53606C',
  azulEscuro: '#0A1D2E',
  brancoFrio: '#F8FEFD',
  azulAcinzentado: '#7690A5',
}
```

---

## VARIÁVEIS DE AMBIENTE

Criar `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CRM_JWT_SECRET=
CRM_ADMIN_EMAIL=
CRM_ADMIN_SENHA=
WEBHOOK_WHATSAPP_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=INSERIR_NUMERO_AQUI
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/immovicontabilidade
```

---

## SUPABASE — CONFIGURAÇÃO

### Clientes

**`lib/supabase/client.ts`** — uso público (frontend):
```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

**`lib/supabase/server.ts`** — uso restrito (API routes, CRM server-side):
```ts
import { createClient } from '@supabase/supabase-js'

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

**Regra absoluta:** `SUPABASE_SERVICE_ROLE_KEY` nunca no frontend. Nunca em componentes client-side. Apenas em `app/api/**` e `lib/supabase/server.ts`.

### Scripts SQL obrigatórios

Criar `supabase/migrations/001_initial.sql`:

```sql
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

-- RLS: leads_immovi
alter table leads_immovi enable row level security;

-- Público pode inserir (formulário)
create policy "insert_publico" on leads_immovi
  for insert with check (true);

-- Público não pode ler, editar ou deletar
create policy "select_bloqueado" on leads_immovi
  for select using (false);

-- RLS: historico (apenas server-side via service role)
alter table leads_immovi_historico enable row level security;

-- RLS: crm_users (apenas server-side)
alter table crm_users enable row level security;
```

### Status de lead no CRM

```ts
export const STATUS_LEAD = [
  'Novo',
  'Em atendimento',
  'Consultoria agendada',
  'Proposta enviada',
  'Aguardando retorno',
  'Convertido',
  'Perdido',
]
```

### Tags automáticas do formulário

Gerar tags com base nas respostas:

```ts
// Sempre incluir
'lead_site_immovi', 'consultoria_gratuita'

// Por tipo de atuação
corretor → 'corretor_pj', 'perfil_1_prioritario'
imobiliaria → 'imobiliaria', 'perfil_1_prioritario'
arquiteto → 'arquiteto', 'perfil_1_prioritario'
designer_interiores → 'designer_interiores', 'perfil_1_prioritario'
engenheiro_pj → 'engenheiro_pj', 'perfil_1_prioritario'
advogado_imobiliario → 'advogado_imobiliario', 'perfil_1_prioritario'
correspondente_bancario → 'correspondente_bancario', 'perfil_1_prioritario'
construtora → 'construtora', 'perfil_2_medio_prazo'
incorporadora → 'incorporadora', 'perfil_2_medio_prazo'

// Por necessidade
abrir_empresa → 'precisa_abrir_empresa'
trocar_contador → 'quer_trocar_contador'
planejamento_tributario → 'planejamento_tributario'
organizar_financeiro → 'organizar_financeiro'
emitir_nota → 'emitir_nota'
separar_pf_pj → 'separar_pf_pj'
```

---

## ESTRUTURA DE ARQUIVOS

```
/
├── app/
│   ├── layout.tsx                    # Layout raiz com GA4, GTM, fontes
│   ├── page.tsx                      # Home completa
│   ├── sitemap.ts                    # Sitemap dinâmico
│   ├── robots.ts                     # Robots.txt
│   ├── login/
│   │   └── page.tsx                  # Login do CRM
│   ├── crm/
│   │   ├── page.tsx                  # Dashboard CRM
│   │   ├── leads/
│   │   │   ├── page.tsx              # Listagem de leads
│   │   │   └── [id]/page.tsx         # Detalhe do lead
│   │   └── layout.tsx                # Layout protegido do CRM
│   ├── api/
│   │   ├── leads/route.ts            # POST — salvar lead no Supabase
│   │   ├── crm/
│   │   │   ├── leads/route.ts        # GET — listar leads (protegido)
│   │   │   ├── leads/[id]/route.ts   # GET/PATCH/DELETE lead (protegido)
│   │   │   └── historico/route.ts    # POST — adicionar histórico
│   │   └── auth/
│   │       ├── login/route.ts        # POST — login CRM
│   │       └── logout/route.ts       # POST — logout CRM
│   ├── contabilidade-para-corretores-de-imoveis/page.tsx
│   ├── contabilidade-para-imobiliarias/page.tsx
│   ├── contabilidade-para-arquitetos/page.tsx
│   ├── contabilidade-para-designers-de-interiores/page.tsx
│   ├── contabilidade-para-engenheiros/page.tsx
│   ├── contabilidade-para-advogados-imobiliarios/page.tsx
│   ├── contabilidade-para-correspondentes-bancarios-imobiliarios/page.tsx
│   ├── contabilidade-para-construtoras/page.tsx
│   ├── contabilidade-para-incorporadoras/page.tsx
│   ├── planejamento-tributario-imobiliario/page.tsx
│   ├── abrir-empresa-imobiliaria/page.tsx
│   └── trocar-de-contador-imobiliario/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppButton.tsx        # Botão flutuante
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Dores.tsx
│   │   ├── Diferenciais.tsx
│   │   ├── Segmentos.tsx
│   │   ├── Servicos.tsx
│   │   ├── Jornada.tsx
│   │   ├── Tecnologia.tsx
│   │   ├── Planos.tsx
│   │   ├── FAQ.tsx
│   │   ├── Formulario.tsx
│   │   └── CTAFinal.tsx
│   ├── seo/
│   │   └── PageInternaSEO.tsx        # Template reutilizável para páginas internas
│   └── crm/
│       ├── LeadCard.tsx
│       ├── LeadDetalhe.tsx
│       ├── FiltrosLead.tsx
│       └── HistoricoLead.tsx
├── lib/
│   ├── constants.ts                  # Todas as constantes do projeto
│   ├── content.ts                    # Todos os textos, dores, FAQ, planos
│   ├── tags.ts                       # Lógica de geração de tags automáticas
│   ├── analytics.ts                  # Helpers para eventos GA4/GTM
│   └── supabase/
│       ├── client.ts                 # Cliente público
│       └── server.ts                 # Cliente admin (service role)
├── supabase/
│   └── migrations/
│       └── 001_initial.sql
├── public/
│   ├── logo-immovi.svg               # Placeholder — substituir pela logo real
│   └── og-image.jpg                  # Imagem Open Graph
├── .env.local
├── tailwind.config.ts
└── next.config.ts
```

---

## CONTEÚDO — HOME

### Seção Hero

```
H1: Contabilidade Digital para o Ecossistema Imobiliário

Subheadline: A Immovi ajuda corretores, imobiliárias, arquitetos, engenheiros,
designers, correspondentes bancários e advogados imobiliários a organizarem
sua contabilidade, reduzirem riscos fiscais e tomarem decisões com mais segurança.

Botão primário: Solicitar Consultoria Gratuita → #consultoria
Botão secundário: Falar com Especialista → WhatsApp (mensagem: hero)
```

### Seção Dores (9 cards)

```
Título: Seu negócio imobiliário enfrenta algum desses problemas?

1. Você mistura suas contas pessoais com as contas da empresa?
2. Tem dúvidas sobre emissão de nota fiscal para comissões, projetos ou serviços?
3. Não sabe se está pagando imposto acima do necessário?
4. Seu contador não entende as particularidades do mercado imobiliário?
5. Você atua como PJ, mas não tem organização financeira clara?
6. Tem dificuldade para controlar faturamento, contratos e obrigações fiscais?
7. Quer abrir uma empresa para atuar no mercado imobiliário com segurança?
8. Precisa trocar de contador sem gerar dor de cabeça?
9. Quer crescer sem correr riscos fiscais e tributários?

CTA final: Quero uma Consultoria Gratuita → #consultoria
```

### Seção Diferenciais (10 itens)

```
Título: Nossos Diferenciais
Subtítulo: Tudo que você precisa para ter controle, segurança e clareza
na contabilidade do seu negócio imobiliário.

1. Especialistas no ecossistema imobiliário
   Entendemos a rotina de corretores, imobiliárias, arquitetos, engenheiros,
   designers e profissionais do setor.

2. Atendimento digital e humanizado
   Processo simples, rápido e com suporte próximo.

3. Planejamento tributário
   Análise para buscar o melhor enquadramento e reduzir riscos fiscais.

4. Organização da PJ
   Apoio para separar pessoa física e pessoa jurídica.

5. Emissão e orientação sobre notas fiscais
   Direcionamento para notas de comissões, honorários, projetos, laudos
   e serviços técnicos.

6. Análise mensal do faturamento
   Acompanhamento para manter sua empresa organizada e segura.

7. Apoio para abertura e regularização
   Estruturação correta desde o início.

8. Suporte para troca de contador
   Migração organizada, com análise de pendências.

9. Gestão de documentos
   Organização contábil, fiscal e financeira em ambiente digital.

10. Tecnologia e controle
    Estrutura preparada para plataforma digital, CRM e acompanhamento de leads.
```

### Seção Segmentos (8 cards)

```
Título: Atendemos profissionais e empresas do mercado imobiliário
Subtítulo: Soluções contábeis pensadas para cada perfil do ecossistema imobiliário.

1. Corretores de imóveis PJ
2. Imobiliárias
3. Arquitetos
4. Designers de interiores
5. Engenheiros PJ
6. Advogados imobiliários
7. Correspondentes bancários imobiliários
8. Construtoras e incorporadoras
```

### Seção Serviços (6 cards)

```
Título: Soluções contábeis para o mercado imobiliário
Subtítulo: Da abertura da empresa ao planejamento tributário, cuidamos
da parte contábil para você focar no crescimento do seu negócio.

1. Abertura de empresa
   Abra sua PJ para atuar no mercado imobiliário com o enquadramento correto
   desde o início. A Immovi orienta corretores, arquitetos, engenheiros,
   designers e outros profissionais na estruturação da empresa com segurança
   fiscal e contábil.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.aberturaEmpresa)

2. Troca de contador
   Trocar de contador pode ser simples quando existe organização. Fazemos a
   análise da situação atual, levantamento de pendências e transição para uma
   contabilidade especializada no mercado imobiliário.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.trocaContador)

3. Contabilidade mensal especializada
   Cuidamos das obrigações contábeis, fiscais e tributárias da sua empresa
   com foco nas particularidades do setor imobiliário.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.geral)

4. Planejamento tributário
   Analisamos seu faturamento, atividade e regime tributário para buscar uma
   estrutura mais eficiente, segura e adequada ao seu negócio imobiliário.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.planejamentoTributario)

5. Emissão e organização de notas fiscais
   Orientamos a emissão correta de notas fiscais para comissões, serviços,
   honorários, projetos, laudos, consultorias e atividades técnicas.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.emissaoNotas)

6. Organização financeira da PJ
   Ajudamos a separar pessoa física e jurídica, organizar receitas, despesas,
   documentos e melhorar a visão financeira da empresa.
   CTA: whatsappLink(MENSAGENS_WHATSAPP.organizacaoFinanceira)
```

### Seção Jornada (4 etapas)

```
Título: Como funciona nossa consultoria contábil
Subtítulo: Do diagnóstico à gestão contínua: um processo simples para
organizar sua empresa imobiliária.

Etapa 1 — Diagnóstico inicial
Entendemos sua atividade, situação atual, faturamento, tipo de empresa
e principais dificuldades.

Etapa 2 — Planejamento e documentação
Definimos o melhor caminho: abertura, regularização, troca de contador,
planejamento tributário ou organização financeira.

Etapa 3 — Regularização e implantação
Organizamos documentos, obrigações, enquadramento e processos para sua
empresa operar com segurança.

Etapa 4 — Gestão contábil contínua
Você passa a contar com acompanhamento contábil digital, suporte especializado
e visão mais clara da sua empresa.
```

### Seção Tecnologia e Gestão Digital

```
Título: Tecnologia e gestão digital para sua contabilidade
Subtítulo: A Immovi conecta contabilidade, inteligência financeira e tecnologia
para apoiar profissionais e empresas do mercado imobiliário.

Cards:
1. Gestão contábil digital
2. Organização financeira
3. Atendimento consultivo
4. Relatórios e acompanhamento
```

### Seção Planos

```
Título: Escolha o plano ideal para sua empresa
Subtítulo: Planos pensados para diferentes fases de profissionais e empresas
do mercado imobiliário.

Toggle: Profissionais PJ | Empresas Imobiliárias

PROFISSIONAIS PJ:
- START: R$ 257/mês — Para quem está começando ou quer organizar a PJ
- SMART: R$ 387/mês — Para quem já possui operação ativa [badge: Mais escolhido]
- PERFORMANCE: R$ 697/mês — Para volume maior de documentos e demandas

EMPRESAS IMOBILIÁRIAS:
- START: R$ 497/mês
- SMART: R$ 847/mês [badge: Mais escolhido]
- PERFORMANCE: R$ 1.497/mês

Itens inclusos (adaptar por plano):
- Especialistas no ecossistema imobiliário
- Plataforma digital
- Orientação para emissão de notas fiscais
- Planejamento tributário
- Gestão de documentos
- Relatórios contábeis
- Atendimento multicanal
- Abertura com planejamento (START e acima)
- Conta PJ digital (SMART e acima)
- Certificado digital (PERFORMANCE)

Botão: "Quero este plano" → WhatsApp com mensagem específica do plano
```

### Seção FAQ (12 perguntas)

```
Título: Dúvidas frequentes sobre contabilidade para o mercado imobiliário

1. Corretor de imóveis precisa ter CNPJ?
2. Corretor de imóveis pode ser MEI?
3. Qual o melhor regime tributário para corretor de imóveis?
4. Imobiliária precisa de contabilidade especializada?
5. Arquiteto PJ pode pagar menos imposto com Fator R?
6. Engenheiro PJ precisa emitir nota fiscal?
7. Designer de interiores precisa separar serviço e produto na contabilidade?
8. Como separar pessoa física e pessoa jurídica no mercado imobiliário?
9. Quando vale a pena trocar de contador?
10. A Immovi atende empresas de outros estados?
11. Como funciona a consultoria gratuita da Immovi?
12. A Immovi atende construtoras e incorporadoras?

Implementar com FAQ Schema (FAQPage JSON-LD).
```

### Seção Formulário

```
ID: consultoria
Título: Consultoria Gratuita para o seu Negócio Imobiliário
Subtítulo: Preencha o formulário e nossa equipe entra em contato para
entender sua situação e indicar o melhor caminho contábil para sua empresa.

Benefícios:
- Análise da sua situação fiscal
- Orientação sobre enquadramento e organização
- Planejamento tributário dentro da lei
- Sem compromisso — 100% gratuito

CAMPOS:
1. Nome (obrigatório)
2. WhatsApp (obrigatório, com máscara)
3. E-mail
4. Tipo de atuação (obrigatório, select):
   - Corretor de imóveis PJ
   - Imobiliária
   - Arquiteto
   - Designer de interiores
   - Engenheiro PJ
   - Advogado imobiliário
   - Correspondente bancário imobiliário
   - Construtora
   - Incorporadora
   - Administradora de condomínios
   - Topógrafo
   - Vistoriador / laudos imobiliários
   - Despachante imobiliário
   - Outro
5. Se "Outro": campo "Qual tipo de atuação?" (condicional)
6. Situação atual (obrigatório, select):
   - Quero abrir uma empresa
   - Já tenho CNPJ
   - Atuo como autônomo
   - Quero trocar de contador
   - Estou com dúvidas fiscais
   - Quero organizar minha PJ
   - Quero reduzir impostos dentro da lei
7. Faturamento médio mensal (obrigatório, select):
   - Até R$ 5 mil
   - De R$ 5 mil a R$ 15 mil
   - De R$ 15 mil a R$ 30 mil
   - De R$ 30 mil a R$ 60 mil
   - Acima de R$ 60 mil
   - Prefiro não informar
8. Você emite nota fiscal? (select):
   - Sim
   - Não
   - Às vezes
   - Tenho dúvidas sobre isso
9. Principal necessidade (obrigatório, select):
   - Abrir empresa
   - Trocar de contador
   - Reduzir impostos
   - Organizar financeiro
   - Emitir notas fiscais
   - Regularizar empresa
   - Planejamento tributário
   - Separar PF e PJ
   - Outro
10. Mensagem adicional (opcional, textarea)

COMPORTAMENTO:
- Loading durante envio
- Mensagem de sucesso: "Solicitação enviada! Nossa equipe vai analisar
  suas informações e entrar em contato pelo WhatsApp em breve."
- Mensagem de erro clara
- Proteção contra envio duplicado
- Validação frontend e backend
- POST para /api/leads
- Salvar em leads_immovi no Supabase
- Gerar tags automáticas
- Disparar webhook se WEBHOOK_WHATSAPP_URL estiver configurado
```

### Seção CTA Final

```
Título: Sua empresa imobiliária merece uma contabilidade à altura
Subtítulo: Deixe a burocracia com a Immovi e foque no que importa:
crescer com segurança, organização e clareza.

Botão 1: Consultoria Gratuita → #consultoria
Botão 2: Falar pelo WhatsApp → whatsappLink(MENSAGENS_WHATSAPP.geral)
```

---

## COMPONENTES GLOBAIS

### Header

```
Fixo no topo, fundo azulEscuro, responsivo

Menu:
- Início
- Para quem é
- Serviços
- Planos
- Dúvidas frequentes
- Consultoria gratuita
- Contato

CTA header: "Consultoria Gratuita" → #consultoria (botão verde)
Menu mobile: hambúrguer
CRM: link discreto apenas no rodapé ou rota /login
```

### Footer

```
Logo Immovi + slogan
Links rápidos: menu principal
Serviços: 6 serviços com links
Segmentos: links para páginas internas
Endereço: Sorocaba – SP, Rua Fernando Silva, 190 – Sala 802, Jardim Astro
Instagram: https://www.instagram.com/immovicontabilidade
WhatsApp: whatsappLink(MENSAGENS_WHATSAPP.geral)
Política de privacidade
Copyright: © 2026 Immovi Contabilidade. Todos os direitos reservados.

Tagline: Mais do que uma contabilidade. Somos inteligência financeira,
tecnologia e estratégia para quem vive do mercado imobiliário.
```

### WhatsApp Button (flutuante)

```
- Fixo, canto inferior direito
- Cor: #00D4AA
- Ícone WhatsApp (Lucide ou SVG)
- Tooltip: "Falar pelo WhatsApp"
- Aparece após 300px de scroll
- Link: whatsappLink(MENSAGENS_WHATSAPP.geral)
```

---

## PÁGINAS INTERNAS DE SEO

Cada página deve usar o componente `PageInternaSEO` com esta estrutura:

1. Hero específico da página
2. Dores específicas daquele público
3. Como a Immovi ajuda
4. Serviços relacionados
5. Benefícios
6. FAQ específico (mínimo 4 perguntas)
7. CTA para #consultoria
8. CTA WhatsApp
9. Links internos para páginas relacionadas

### Lista de páginas e metadados

```
/contabilidade-para-corretores-de-imoveis
  title: Contabilidade para Corretores de Imóveis PJ | Immovi Contabilidade
  H1: Contabilidade para Corretores de Imóveis PJ
  Foco: CRECI, comissão, emissão de nota, separação PF/PJ, planejamento tributário
  Links internos: planejamento-tributario-imobiliario, abrir-empresa-imobiliaria,
                  trocar-de-contador-imobiliario

/contabilidade-para-imobiliarias
  title: Contabilidade para Imobiliárias | Immovi Contabilidade
  H1: Contabilidade para Imobiliárias
  Foco: locação, venda, comissões, organização financeira, gestão fiscal

/contabilidade-para-arquitetos
  title: Contabilidade para Arquitetos | Immovi Contabilidade
  H1: Contabilidade para Arquitetos
  Foco: Fator R, projetos, honorários, notas fiscais, serviço vs materiais
  Links internos: contabilidade-para-designers-de-interiores,
                  contabilidade-para-engenheiros,
                  planejamento-tributario-imobiliario

/contabilidade-para-designers-de-interiores
  title: Contabilidade para Designers de Interiores | Immovi Contabilidade
  H1: Contabilidade para Designers de Interiores
  Foco: projetos, serviço x produto, emissão de nota, organização financeira

/contabilidade-para-engenheiros
  title: Contabilidade para Engenheiros PJ | Immovi Contabilidade
  H1: Contabilidade para Engenheiros PJ
  Foco: ART, laudos, projetos, obras, CREA, tributação

/contabilidade-para-advogados-imobiliarios
  title: Contabilidade para Advogados Imobiliários | Immovi Contabilidade
  H1: Contabilidade para Advogados Imobiliários
  Foco: contratos, locação, compra e venda, regularização, direito condominial

/contabilidade-para-correspondentes-bancarios-imobiliarios
  title: Contabilidade para Correspondentes Bancários Imobiliários | Immovi
  H1: Contabilidade para Correspondentes Bancários Imobiliários
  Foco: financiamento habitacional, FGTS, SBPE, MCMV, comissão variável

/contabilidade-para-construtoras
  title: Contabilidade para Construtoras | Immovi Contabilidade
  H1: Contabilidade para Construtoras
  Foco: obras, custos, BPO financeiro, notas fiscais, folha, gestão por projeto

/contabilidade-para-incorporadoras
  title: Contabilidade para Incorporadoras | Immovi Contabilidade
  H1: Contabilidade para Incorporadoras
  Foco: SPE, RET, empreendimentos, organização fiscal, regime de incorporação

/planejamento-tributario-imobiliario
  title: Planejamento Tributário Imobiliário | Immovi Contabilidade
  H1: Planejamento Tributário para o Mercado Imobiliário
  Foco: redução de impostos, Simples Nacional, Lucro Presumido, Fator R

/abrir-empresa-imobiliaria
  title: Abrir Empresa no Mercado Imobiliário | Immovi Contabilidade
  H1: Abra sua Empresa no Mercado Imobiliário com Segurança
  Foco: abertura de CNPJ, corretores, arquitetos, engenheiros, enquadramento

/trocar-de-contador-imobiliario
  title: Trocar de Contador no Mercado Imobiliário | Immovi
  H1: Troque para uma Contabilidade Especializada no Mercado Imobiliário
  Foco: migração, análise de pendências, organização fiscal, transição segura
```

---

## SEO TÉCNICO

### Metadados da Home

```ts
title: 'Immovi Contabilidade | Contabilidade para o Mercado Imobiliário'
description: 'Contabilidade especializada para corretores, imobiliárias,
arquitetos, engenheiros, designers e profissionais do mercado imobiliário.
Receba uma consultoria gratuita da Immovi.'
keywords: [
  'contabilidade para mercado imobiliário',
  'contabilidade para corretor de imóveis',
  'contador para corretor de imóveis PJ',
  'contabilidade para imobiliária',
  'contabilidade para arquitetos',
  'contabilidade para engenheiros',
  'planejamento tributário imobiliário',
]
```

### Open Graph

```ts
og:title — igual ao title
og:description — igual ao description
og:type — website
og:url — NEXT_PUBLIC_SITE_URL
og:image — /og-image.jpg (1200x630)
og:site_name — Immovi Contabilidade
og:locale — pt_BR
```

### Schema.org (JSON-LD na Home)

```json
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "AccountingService", "LocalBusiness"],
  "name": "Immovi Contabilidade",
  "description": "Contabilidade especializada no ecossistema imobiliário",
  "url": "NEXT_PUBLIC_SITE_URL",
  "telephone": "INSERIR_NUMERO_AQUI",
  "priceRange": "R$ 257 - R$ 1.497/mês",
  "areaServed": "Brasil",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sorocaba",
    "addressRegion": "SP",
    "addressCountry": "BR",
    "streetAddress": "Rua Fernando Silva, 190 – Sala 802, Jardim Astro"
  },
  "sameAs": ["https://www.instagram.com/immovicontabilidade"]
}
```

### Sitemap

Incluir todas as rotas públicas:
- /
- /contabilidade-para-corretores-de-imoveis
- /contabilidade-para-imobiliarias
- /contabilidade-para-arquitetos
- /contabilidade-para-designers-de-interiores
- /contabilidade-para-engenheiros
- /contabilidade-para-advogados-imobiliarios
- /contabilidade-para-correspondentes-bancarios-imobiliarios
- /contabilidade-para-construtoras
- /contabilidade-para-incorporadoras
- /planejamento-tributario-imobiliario
- /abrir-empresa-imobiliaria
- /trocar-de-contador-imobiliario

### Robots

```
Allow: /
Allow: /contabilidade-para-*
Allow: /planejamento-tributario-imobiliario
Allow: /abrir-empresa-imobiliaria
Allow: /trocar-de-contador-imobiliario

Disallow: /crm
Disallow: /login
Disallow: /api
```

---

## ANALYTICS — EVENTOS GA4/GTM

Criar `lib/analytics.ts` com helpers para disparar estes eventos:

```ts
form_submit_consultoria    // envio do formulário
whatsapp_click             // qualquer clique em link WhatsApp
plano_click                // clique em "Quero este plano"
cta_hero_click             // CTA da seção Hero
cta_header_click           // CTA do Header
cta_footer_click           // CTA do Footer ou CTA Final
faq_open                   // abertura de item do FAQ
seo_page_cta_click         // CTA de página interna de SEO
```

---

## CRM INTERNO

### Autenticação

- Login via `/login` com email + senha
- Senha armazenada como hash (bcrypt)
- JWT gerado com `CRM_JWT_SECRET`
- Cookie HttpOnly para persistência
- Rotas `/crm/*` protegidas por middleware

### Funcionalidades obrigatórias

- Dashboard com contagem por status
- Listagem de leads com paginação
- Filtros: status, tipo de atuação, principal necessidade, origem
- Detalhe completo do lead
- Histórico de observações
- Alteração de status (com registro no histórico)
- Adicionar observação
- Botão abrir WhatsApp do lead
- Exclusão de lead (com confirmação)

### Funcionalidades adicionais

- Taxa de conversão por origem
- Contagem de leads por tipo de atuação
- Relatório mensal de leads (contagem, conversões, status)

---

## REGRAS DE CÓDIGO

1. Nunca usar números de WhatsApp diretamente — sempre via `whatsappLink()` e `MENSAGENS_WHATSAPP`
2. Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no cliente
3. Nunca usar `pg`, `Pool` ou conexão direta com PostgreSQL
4. Sempre validar dados no frontend E no backend
5. Sempre usar `next/image` para imagens
6. Sempre incluir `alt` descritivo nas imagens
7. Componentes client-side: `'use client'` no topo
8. Componentes server-side: sem diretiva (padrão no App Router)
9. Nenhuma menção a pet, veterinário, animal ou nicho anterior
10. Usar Albert Sans em todos os títulos e botões
11. Paleta oficial em todo o projeto — sem cores fora da lista
12. Mobile first em todos os componentes

---

## FASES DE EXECUÇÃO

### FASE 1 — Fundação do projeto

**O que fazer:**
- Inicializar Next.js 14 com TypeScript e Tailwind (se não existir)
- Configurar `tailwind.config.ts` com a paleta oficial e fonte Albert Sans
- Criar `lib/constants.ts` completo
- Criar `lib/content.ts` com todos os textos da Home
- Criar `lib/analytics.ts` com helpers de eventos
- Criar `lib/tags.ts` com lógica de geração de tags
- Criar `lib/supabase/client.ts` e `lib/supabase/server.ts`
- Criar `.env.local` com todas as variáveis (valores em branco)
- Criar `supabase/migrations/001_initial.sql`
- Criar `app/layout.tsx` com GA4, GTM, Albert Sans, metadados base
- Criar `components/layout/Header.tsx`
- Criar `components/layout/Footer.tsx`
- Criar `components/layout/WhatsAppButton.tsx`

**Critério de conclusão:** projeto roda com `npm run dev`, header e footer visíveis, paleta aplicada, sem erros de TypeScript.

---

### FASE 2 — Home completa

**O que fazer:**
- Criar `app/page.tsx` importando todos os componentes da Home
- Criar todos os componentes em `components/home/`:
  - `Hero.tsx`
  - `Dores.tsx`
  - `Diferenciais.tsx`
  - `Segmentos.tsx`
  - `Servicos.tsx`
  - `Jornada.tsx`
  - `Tecnologia.tsx`
  - `Planos.tsx` (com toggle Profissionais PJ / Empresas Imobiliárias)
  - `FAQ.tsx` (accordion com FAQ Schema JSON-LD)
  - `Formulario.tsx` (campos completos, validação frontend, loading, sucesso/erro)
  - `CTAFinal.tsx`
- Aplicar SEO da Home: title, description, Open Graph, Schema.org
- Testar responsividade mobile

**Critério de conclusão:** Home completa e navegável, todas as seções visíveis, formulário com validação funcionando no frontend, sem menções ao nicho pet.

---

### FASE 3 — Backend e formulário

**O que fazer:**
- Criar `app/api/leads/route.ts` (POST)
  - Validar campos obrigatórios
  - Sanitizar dados
  - Gerar tags automáticas via `lib/tags.ts`
  - Salvar em `leads_immovi` via Supabase (service role)
  - Disparar webhook se `WEBHOOK_WHATSAPP_URL` configurado
  - Retornar sucesso ou erro
- Conectar `Formulario.tsx` à rota API
- Testar envio completo (frontend → API → Supabase)
- Verificar que `SUPABASE_SERVICE_ROLE_KEY` não aparece no bundle do cliente

**Critério de conclusão:** lead salvo no Supabase ao enviar o formulário, tags geradas corretamente, webhook disparado se configurado.

---

### FASE 4 — CRM interno

**O que fazer:**
- Criar `app/login/page.tsx` com formulário de login
- Criar `app/api/auth/login/route.ts` — verifica email/senha (hash), gera JWT, seta cookie
- Criar `app/api/auth/logout/route.ts` — limpa cookie
- Criar middleware `middleware.ts` protegendo `/crm/*`
- Criar `app/crm/layout.tsx` com verificação de autenticação
- Criar `app/crm/page.tsx` — dashboard com contagens por status
- Criar `app/crm/leads/page.tsx` — listagem com filtros e paginação
- Criar `app/crm/leads/[id]/page.tsx` — detalhe do lead, histórico, alterar status
- Criar rotas de API do CRM:
  - `app/api/crm/leads/route.ts` — GET listagem
  - `app/api/crm/leads/[id]/route.ts` — GET detalhe, PATCH status, DELETE
  - `app/api/crm/historico/route.ts` — POST nova observação
- Criar componentes CRM em `components/crm/`

**Critério de conclusão:** login funciona, leads aparecem na listagem, status pode ser alterado, histórico é registrado, rotas protegidas bloqueiam acesso sem autenticação.

---

### FASE 5 — Páginas internas de SEO

**O que fazer:**
- Criar componente `components/seo/PageInternaSEO.tsx` reutilizável
- Criar as 12 páginas internas com conteúdo único:
  - `/contabilidade-para-corretores-de-imoveis`
  - `/contabilidade-para-imobiliarias`
  - `/contabilidade-para-arquitetos`
  - `/contabilidade-para-designers-de-interiores`
  - `/contabilidade-para-engenheiros`
  - `/contabilidade-para-advogados-imobiliarios`
  - `/contabilidade-para-correspondentes-bancarios-imobiliarios`
  - `/contabilidade-para-construtoras`
  - `/contabilidade-para-incorporadoras`
  - `/planejamento-tributario-imobiliario`
  - `/abrir-empresa-imobiliaria`
  - `/trocar-de-contador-imobiliario`
- Cada página com: title próprio, H1, dores, serviços, FAQ, CTAs, links internos
- Usar linguagem específica do nicho de cada público

**Critério de conclusão:** 12 páginas criadas, cada uma com SEO próprio, conteúdo único e relevante para o público-alvo, sem textos genéricos.

---

### FASE 6 — SEO técnico e analytics

**O que fazer:**
- Criar `app/sitemap.ts` dinâmico com todas as URLs públicas
- Criar `app/robots.ts` com regras corretas
- Revisar Schema.org da Home (ProfessionalService + FAQPage)
- Adicionar Schema.org LocalBusiness + Organization
- Verificar Open Graph em todas as páginas
- Confirmar eventos GA4/GTM em todos os CTAs
- Criar `public/og-image.jpg` placeholder (1200x630)
- Criar documentação `ANALYTICS.md` explicando:
  - Todos os eventos implementados
  - Como conectar ao Looker Studio
  - Quais dados vêm do GA4, Search Console e Supabase
- Rodar checklist final de qualidade

**Checklist final obrigatório:**
- [ ] Nenhuma menção ao nicho pet
- [ ] Paleta oficial aplicada em todo o projeto
- [ ] WhatsApp centralizado em constante
- [ ] Instagram correto
- [ ] SUPABASE_SERVICE_ROLE_KEY nunca no frontend
- [ ] Formulário salva corretamente no Supabase
- [ ] CRM lista e atualiza leads do Supabase
- [ ] Sitemap inclui todas as 12 páginas internas
- [ ] Robots bloqueia /crm, /login, /api
- [ ] Eventos de conversão funcionando
- [ ] Mobile responsivo em todas as páginas
- [ ] Alt text em todas as imagens
- [ ] TypeScript sem erros
- [ ] Build de produção sem warnings críticos

**Critério de conclusão:** checklist 100% completo, site pronto para deploy.

---

## FRASE DE ATIVAÇÃO

Ao receber a instrução abaixo, iniciar pela Fase 1 e aguardar confirmação antes de cada fase:

> **"Execute o CLAUDE.md — projeto Immovi Contabilidade"**
