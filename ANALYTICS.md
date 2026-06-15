# ANALYTICS — Immovi Contabilidade

Este documento descreve a instrumentação de analytics do site, os eventos
disparados, e como conectar as fontes de dados ao Looker Studio.

---

## 1. Stack de medição

| Camada | Ferramenta | Configuração |
| --- | --- | --- |
| Coleta de eventos | **Google Tag Manager (GTM)** | `NEXT_PUBLIC_GTM_ID` |
| Relatórios de comportamento | **Google Analytics 4 (GA4)** | `NEXT_PUBLIC_GA_ID` |
| SEO / busca orgânica | **Google Search Console** | Verificação do domínio |
| Leads / CRM | **Supabase** (`leads_immovi`) | `NEXT_PUBLIC_SUPABASE_URL` |

Os scripts de GA4 e GTM são injetados em [app/layout.tsx](app/layout.tsx) e só
carregam quando as respectivas variáveis de ambiente estão definidas.

A função central de disparo está em [lib/analytics.ts](lib/analytics.ts). Todo
evento é empurrado para o `dataLayer` (GTM) e, quando o `gtag` está disponível,
também enviado diretamente ao GA4.

---

## 2. Eventos implementados

Todos os eventos abaixo chegam ao `dataLayer` com a chave `event` e parâmetros
adicionais. No GTM, crie um **Acionador de evento personalizado** para cada um e
encaminhe para o GA4 como evento de conversão quando fizer sentido.

| Evento (`event`) | Quando dispara | Parâmetros | Conversão? |
| --- | --- | --- | --- |
| `form_submit_consultoria` | Envio do formulário de consultoria com sucesso | `tipo_atuacao`, `principal_necessidade` | ✅ Sim |
| `whatsapp_click` | Clique em qualquer link de WhatsApp | `origem` | ✅ Sim |
| `plano_click` | Clique em "Quero este plano" | `plano`, `segmento` | ✅ Sim |
| `cta_hero_click` | CTA da seção Hero / Dores | `origem` (opcional) | Recomendado |
| `cta_header_click` | CTA "Consultoria Gratuita" do Header | — | Recomendado |
| `cta_footer_click` | CTA do rodapé / CTA Final | `origem` | Recomendado |
| `faq_open` | Abertura de um item do FAQ | `pergunta` | Micro-conversão |
| `seo_page_cta_click` | CTA de uma página interna de SEO | `pagina`, `local` | ✅ Sim |

### Valores de `origem` mais comuns (whatsapp_click)
`hero`, `footer`, `botao_flutuante`, `servico_1`…`servico_6`,
`cta_final`, `seo_<chave>_hero`, `seo_<chave>_cta_final`.

---

## 3. Configuração no GTM

1. Crie a tag **Google Tag (GA4 Configuration)** com o `Measurement ID`.
2. Para cada evento da tabela acima:
   - **Acionador:** tipo "Evento personalizado", nome igual ao `event`.
   - **Tag:** "GA4 Event", encaminhando os parâmetros (`origem`, `plano`, etc.).
3. Marque como **conversão** no GA4 (Admin → Eventos): `form_submit_consultoria`,
   `whatsapp_click`, `plano_click`, `seo_page_cta_click`.

---

## 4. Conectando ao Looker Studio

Crie um painel com três fontes de dados:

### a) GA4 (comportamento e conversões)
- Conector nativo **Google Analytics** → propriedade GA4.
- Métricas sugeridas: usuários, sessões, eventos de conversão, taxa de
  engajamento, origem/mídia.
- Dimensões: `eventName`, `origem`, `plano`, `pagina`, página de destino.

### b) Google Search Console (SEO)
- Conector nativo **Search Console** → URL do domínio.
- Métricas: cliques, impressões, CTR, posição média.
- Útil para acompanhar o desempenho das 12 páginas internas de SEO.

### c) Supabase (leads / CRM)
- Os leads ficam em `leads_immovi`. Para o Looker Studio, exponha-os via:
  - uma **view** somente leitura no Supabase + conector PostgreSQL, ou
  - um export agendado (CSV/Google Sheets) a partir do CRM.
- Métricas: total de leads, leads por `status`, por `tipo_atuacao`, por
  `origem`, taxa de conversão (`Convertido` / total) e evolução por dia.

### Cruzamento recomendado
- **GA4 × Supabase:** sessões e cliques de WhatsApp vs. leads realmente
  gerados → custo/eficiência de cada canal.
- **Search Console × Supabase:** páginas de SEO que mais geram leads.

---

## 5. Origem dos dados (resumo)

| Pergunta de negócio | Fonte |
| --- | --- |
| Quantas pessoas visitaram o site? | GA4 |
| De onde vêm os visitantes? | GA4 (origem/mídia) |
| Quais páginas de SEO ranqueiam? | Search Console |
| Quantos leads chegaram? | Supabase (`leads_immovi`) |
| Quantos leads converteram? | Supabase (`status = Convertido`) |
| Qual CTA converte mais? | GA4 (eventos) + Supabase (origem do lead) |

---

## 6. Variáveis de ambiente relevantes

```env
NEXT_PUBLIC_GA_ID=        # G-XXXXXXX (GA4)
NEXT_PUBLIC_GTM_ID=       # GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=     # usado em sitemap, robots e canonical
```

Sem `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID`, os scripts não são carregados
(útil para ambientes de desenvolvimento e preview).
