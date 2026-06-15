import type { WhatsAppKey } from './content'

export interface SeoFaqItem {
  pergunta: string
  resposta: string
}

export interface SeoLinkInterno {
  titulo: string
  href: string
  descricao: string
}

export interface SeoPageData {
  slug: string // caminho (ex.: /contabilidade-para-corretores-de-imoveis)
  chave: string // identificador curto para analytics
  metaTitle: string
  metaDescription: string
  badge: string
  h1: string
  subtitulo: string
  heroWhatsappKey: WhatsAppKey
  dores: { titulo: string; itens: string[] }
  comoAjuda: {
    titulo: string
    subtitulo: string
    itens: { titulo: string; descricao: string }[]
  }
  beneficios: { titulo: string; itens: string[] }
  faq: SeoFaqItem[]
  linksInternos: SeoLinkInterno[]
}

/* ============================================================
   Conteúdo das 12 páginas internas de SEO
   ============================================================ */

export const SEO_PAGES: Record<string, SeoPageData> = {
  corretores: {
    slug: '/contabilidade-para-corretores-de-imoveis',
    chave: 'corretores',
    metaTitle: 'Contabilidade para Corretores de Imóveis PJ | Immovi Contabilidade',
    metaDescription:
      'Contabilidade especializada para corretores de imóveis PJ: emissão de nota de comissão, separação PF e PJ, CRECI e planejamento tributário. Consultoria gratuita.',
    badge: 'Para corretores de imóveis',
    h1: 'Contabilidade para Corretores de Imóveis PJ',
    subtitulo:
      'Organize suas comissões, emita notas fiscais corretamente e reduza impostos dentro da lei. A Immovi entende a rotina do corretor de imóveis que atua como pessoa jurídica.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Desafios que todo corretor PJ enfrenta',
      itens: [
        'Misturar comissões da PJ com a conta pessoal e perder o controle financeiro.',
        'Ter dúvidas sobre como emitir nota fiscal de comissão para imobiliárias e clientes.',
        'Pagar mais imposto do que o necessário por falta de planejamento tributário.',
        'Não saber qual o melhor regime para quem tem CRECI e atua como PJ.',
        'Contador que não entende a dinâmica de comissões e repasses do mercado imobiliário.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o corretor de imóveis',
      subtitulo:
        'Estruturamos a contabilidade da sua PJ para que você foque nas vendas com segurança fiscal.',
      itens: [
        {
          titulo: 'Enquadramento correto da PJ',
          descricao:
            'Definimos o regime tributário e o CNAE adequados para corretagem de imóveis, já que a atividade não é permitida no MEI.',
        },
        {
          titulo: 'Emissão de notas de comissão',
          descricao:
            'Orientamos a emissão de notas fiscais de comissões e serviços de intermediação imobiliária sem erros.',
        },
        {
          titulo: 'Separação PF e PJ',
          descricao:
            'Organizamos pró-labore, distribuição de lucros e a separação entre suas finanças pessoais e da empresa.',
        },
        {
          titulo: 'Planejamento tributário',
          descricao:
            'Analisamos Simples Nacional e Lucro Presumido para buscar a carga tributária mais eficiente para o seu faturamento.',
        },
      ],
    },
    beneficios: {
      titulo: 'Vantagens de atuar como corretor PJ com a Immovi',
      itens: [
        'Menos imposto sobre as comissões em comparação à pessoa física.',
        'Clareza financeira com separação entre PF e PJ.',
        'Notas fiscais emitidas corretamente para imobiliárias e clientes.',
        'Acompanhamento contábil digital e suporte especializado.',
      ],
    },
    faq: [
      {
        pergunta: 'Corretor de imóveis pode ser MEI?',
        resposta:
          'Não. A atividade de corretagem de imóveis não está na lista de ocupações permitidas para o MEI. O corretor que deseja atuar como PJ normalmente abre empresa no Simples Nacional, com o CNAE adequado.',
      },
      {
        pergunta: 'Qual o melhor regime tributário para corretor de imóveis?',
        resposta:
          'Depende do faturamento e das despesas. Em muitos casos o Simples Nacional é vantajoso, mas o Lucro Presumido pode ser melhor em cenários específicos. Fazemos a análise para indicar a opção mais eficiente.',
      },
      {
        pergunta: 'Como o corretor PJ emite nota de comissão?',
        resposta:
          'A nota é emitida pela empresa, descrevendo o serviço de intermediação imobiliária prestado. Orientamos a emissão correta de acordo com o município e o regime tributário.',
      },
      {
        pergunta: 'Vale a pena abrir CNPJ sendo corretor?',
        resposta:
          'Para quem tem volume de comissões relevante, sim. Atuar como PJ costuma reduzir a carga tributária e profissionaliza a gestão financeira. Avaliamos seu caso na consultoria gratuita.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Reduza impostos sobre suas comissões dentro da lei.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Abra seu CNPJ de corretor com o enquadramento correto.',
      },
      {
        titulo: 'Trocar de Contador',
        href: '/trocar-de-contador-imobiliario',
        descricao: 'Migre para uma contabilidade que entende corretagem.',
      },
    ],
  },

  imobiliarias: {
    slug: '/contabilidade-para-imobiliarias',
    chave: 'imobiliarias',
    metaTitle: 'Contabilidade para Imobiliárias | Immovi Contabilidade',
    metaDescription:
      'Contabilidade especializada para imobiliárias: locação, venda, comissões, repasses e gestão fiscal. Organização financeira e consultoria gratuita.',
    badge: 'Para imobiliárias',
    h1: 'Contabilidade para Imobiliárias',
    subtitulo:
      'Da gestão de comissões e repasses de locação à apuração de impostos, cuidamos da contabilidade da sua imobiliária com foco nas particularidades do setor.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'O que trava a gestão de uma imobiliária',
      itens: [
        'Controlar comissões de venda e locação misturadas com repasses a proprietários.',
        'Dificuldade em organizar receitas de administração de aluguéis.',
        'Obrigações fiscais e tributárias que se acumulam sem acompanhamento.',
        'Falta de relatórios claros para tomar decisões sobre a operação.',
        'Contador genérico que não entende locação, venda e intermediação.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi apoia a sua imobiliária',
      subtitulo:
        'Estruturamos a parte contábil e financeira para a imobiliária crescer com segurança.',
      itens: [
        {
          titulo: 'Gestão de comissões e repasses',
          descricao:
            'Organizamos receitas de venda, locação e administração, separando o que é da imobiliária e o que é repasse ao proprietário.',
        },
        {
          titulo: 'Apuração fiscal correta',
          descricao:
            'Cuidamos das obrigações tributárias da imobiliária conforme o regime mais adequado ao seu volume.',
        },
        {
          titulo: 'Organização financeira',
          descricao:
            'Estruturamos o fluxo de caixa e a conciliação para você ter visão clara da operação.',
        },
        {
          titulo: 'Relatórios gerenciais',
          descricao:
            'Entregamos relatórios contábeis que apoiam decisões sobre crescimento e contratação.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que a sua imobiliária ganha',
      itens: [
        'Separação clara entre faturamento próprio e repasses.',
        'Conformidade fiscal com menos risco de autuações.',
        'Visão financeira para escalar a operação.',
        'Atendimento especializado no mercado imobiliário.',
      ],
    },
    faq: [
      {
        pergunta: 'Imobiliária precisa de contabilidade especializada?',
        resposta:
          'Sim. A imobiliária lida com locação, venda, comissões e repasses, que têm tratamento contábil e fiscal específico. Uma contabilidade especializada reduz riscos e organiza a operação.',
      },
      {
        pergunta: 'Como tratar os repasses de aluguel na contabilidade?',
        resposta:
          'Os valores repassados aos proprietários não são receita da imobiliária; a receita é a taxa de administração e as comissões. Organizamos essa separação corretamente.',
      },
      {
        pergunta: 'Qual o melhor regime tributário para imobiliária?',
        resposta:
          'Depende do faturamento e da estrutura. Avaliamos Simples Nacional e Lucro Presumido para indicar o enquadramento mais eficiente.',
      },
      {
        pergunta: 'A Immovi atende imobiliárias de outros estados?',
        resposta:
          'Sim. Nosso atendimento é digital e alcança imobiliárias em todo o Brasil.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Corretores',
        href: '/contabilidade-para-corretores-de-imoveis',
        descricao: 'Para os corretores que atuam na sua imobiliária.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Estruture a tributação da imobiliária com eficiência.',
      },
      {
        titulo: 'Trocar de Contador',
        href: '/trocar-de-contador-imobiliario',
        descricao: 'Migração organizada para uma contabilidade do setor.',
      },
    ],
  },

  arquitetos: {
    slug: '/contabilidade-para-arquitetos',
    chave: 'arquitetos',
    metaTitle: 'Contabilidade para Arquitetos | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para arquitetos PJ: Fator R, emissão de notas de projetos e honorários, serviço x materiais e planejamento tributário. Consultoria gratuita.',
    badge: 'Para arquitetos',
    h1: 'Contabilidade para Arquitetos',
    subtitulo:
      'Aproveite o Fator R, emita notas de projetos e honorários corretamente e pague menos imposto dentro da lei. Contabilidade que entende a rotina do arquiteto.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Dificuldades comuns do arquiteto PJ',
      itens: [
        'Não saber se pode reduzir impostos usando o Fator R.',
        'Confundir receita de projeto com venda de materiais e mobiliário.',
        'Dúvidas sobre emissão de nota fiscal de projetos e honorários.',
        'Falta de organização financeira entre pessoa física e jurídica.',
        'Contador que não entende a atividade de arquitetura e urbanismo.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o arquiteto',
      subtitulo:
        'Estruturamos sua PJ para tributar projetos da forma mais eficiente.',
      itens: [
        {
          titulo: 'Análise de Fator R',
          descricao:
            'Verificamos se sua folha de pagamento permite tributar serviços no Anexo III do Simples, com alíquotas menores.',
        },
        {
          titulo: 'Emissão de notas de projeto',
          descricao:
            'Orientamos a emissão correta de notas de projetos, consultorias e honorários técnicos.',
        },
        {
          titulo: 'Separação serviço x produto',
          descricao:
            'Organizamos a contabilidade quando há prestação de serviço e venda de produtos no mesmo projeto.',
        },
        {
          titulo: 'Planejamento tributário',
          descricao:
            'Buscamos o enquadramento mais eficiente para o seu faturamento de arquitetura.',
        },
      ],
    },
    beneficios: {
      titulo: 'Vantagens para o arquiteto PJ',
      itens: [
        'Potencial redução de impostos com o Fator R.',
        'Notas fiscais de projetos e honorários sem erros.',
        'Separação correta entre serviço e venda de produtos.',
        'Organização financeira e suporte especializado.',
      ],
    },
    faq: [
      {
        pergunta: 'Arquiteto PJ pode pagar menos imposto com Fator R?',
        resposta:
          'Sim. Quando a folha de pagamento atinge pelo menos 28% do faturamento, os serviços de arquitetura podem ser tributados no Anexo III do Simples Nacional, com alíquotas menores. Avaliamos se a estratégia se aplica ao seu caso.',
      },
      {
        pergunta: 'Como o arquiteto deve emitir nota fiscal?',
        resposta:
          'A nota deve descrever o serviço prestado (projeto, consultoria, acompanhamento). Orientamos a emissão conforme o município e o regime tributário da sua PJ.',
      },
      {
        pergunta: 'Preciso separar serviço de venda de móveis na contabilidade?',
        resposta:
          'Sim. A prestação de serviço e a venda de produtos têm tratamento fiscal diferente. Organizamos essa separação para evitar erros e pagar o imposto correto.',
      },
      {
        pergunta: 'Vale a pena abrir PJ como arquiteto?',
        resposta:
          'Para a maioria dos arquitetos com faturamento recorrente, sim. A PJ reduz a carga tributária e profissionaliza a gestão. Analisamos seu caso na consultoria gratuita.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Designers de Interiores',
        href: '/contabilidade-para-designers-de-interiores',
        descricao: 'Soluções para quem une projeto e produto.',
      },
      {
        titulo: 'Contabilidade para Engenheiros',
        href: '/contabilidade-para-engenheiros',
        descricao: 'Para parcerias técnicas em projetos e obras.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Use o Fator R a seu favor.',
      },
    ],
  },

  designers: {
    slug: '/contabilidade-para-designers-de-interiores',
    chave: 'designers',
    metaTitle: 'Contabilidade para Designers de Interiores | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para designers de interiores: separação entre serviço e produto, emissão de nota de projetos e organização financeira da PJ. Consultoria gratuita.',
    badge: 'Para designers de interiores',
    h1: 'Contabilidade para Designers de Interiores',
    subtitulo:
      'Separe corretamente projeto e venda de produtos, emita notas sem erros e organize a parte financeira da sua PJ de design de interiores.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Onde o designer de interiores se perde',
      itens: [
        'Misturar a receita de projeto com a venda de móveis e decoração.',
        'Dúvidas sobre como emitir nota de serviço e de produto.',
        'Pagar imposto errado por não separar as receitas.',
        'Falta de controle financeiro entre pessoa física e jurídica.',
        'Contador que não entende o modelo de projeto + execução.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o designer de interiores',
      subtitulo:
        'Organizamos a contabilidade para você cobrar projeto e produto com clareza.',
      itens: [
        {
          titulo: 'Separação serviço x produto',
          descricao:
            'Estruturamos a contabilidade para distinguir a prestação de serviço de design da venda de produtos.',
        },
        {
          titulo: 'Emissão de notas',
          descricao:
            'Orientamos a emissão de notas de projetos, consultorias e, quando houver, de produtos.',
        },
        {
          titulo: 'Enquadramento eficiente',
          descricao:
            'Buscamos o regime tributário mais adequado para o seu mix de serviço e produto.',
        },
        {
          titulo: 'Organização financeira',
          descricao:
            'Separamos PF e PJ e organizamos receitas e despesas do seu negócio.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que o designer ganha com a Immovi',
      itens: [
        'Receitas de serviço e produto corretamente separadas.',
        'Notas fiscais emitidas da forma certa.',
        'Tributação adequada ao seu modelo de negócio.',
        'Clareza financeira e suporte especializado.',
      ],
    },
    faq: [
      {
        pergunta:
          'Designer de interiores precisa separar serviço e produto na contabilidade?',
        resposta:
          'Sim. A prestação de serviço de projeto e a venda de produtos têm tributação diferente. Separar corretamente evita erros fiscais e pode reduzir impostos.',
      },
      {
        pergunta: 'Como emitir nota fiscal de projeto de interiores?',
        resposta:
          'A nota de serviço descreve o projeto e a consultoria prestada. Se houver venda de produtos, pode ser necessária nota de produto. Orientamos cada caso.',
      },
      {
        pergunta: 'Designer de interiores pode aproveitar o Fator R?',
        resposta:
          'Em alguns casos, sim, dependendo da atividade registrada e da folha de pagamento. Avaliamos se a estratégia se aplica à sua PJ.',
      },
      {
        pergunta: 'Vale a pena ter CNPJ como designer?',
        resposta:
          'Para quem tem projetos recorrentes, a PJ costuma reduzir impostos e organizar o financeiro. Avaliamos seu caso na consultoria gratuita.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Arquitetos',
        href: '/contabilidade-para-arquitetos',
        descricao: 'Para parcerias e projetos de arquitetura.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Abra sua PJ de design com o enquadramento certo.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Pague menos imposto sobre seus projetos.',
      },
    ],
  },

  engenheiros: {
    slug: '/contabilidade-para-engenheiros',
    chave: 'engenheiros',
    metaTitle: 'Contabilidade para Engenheiros PJ | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para engenheiros PJ: ART, laudos, projetos, obras, CREA e tributação. Emissão de notas e planejamento tributário. Consultoria gratuita.',
    badge: 'Para engenheiros',
    h1: 'Contabilidade para Engenheiros PJ',
    subtitulo:
      'De ART e laudos a projetos e acompanhamento de obras: cuidamos da contabilidade do engenheiro PJ com foco na tributação correta da atividade técnica.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Desafios do engenheiro PJ',
      itens: [
        'Dúvidas sobre emissão de nota de projetos, laudos e ART.',
        'Não saber se aproveita o Fator R para reduzir impostos.',
        'Organizar receitas de obras, consultorias e acompanhamento técnico.',
        'Misturar contas pessoais com as da empresa de engenharia.',
        'Contador que não entende CREA, ART e a rotina de obras.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o engenheiro',
      subtitulo:
        'Estruturamos sua PJ para tributar a atividade técnica da forma correta.',
      itens: [
        {
          titulo: 'Emissão de notas técnicas',
          descricao:
            'Orientamos a emissão de notas de projetos, laudos, ART e acompanhamento de obras.',
        },
        {
          titulo: 'Análise de Fator R',
          descricao:
            'Verificamos se a folha permite tributar serviços de engenharia no Anexo III, com alíquota menor.',
        },
        {
          titulo: 'Organização por atividade',
          descricao:
            'Separamos receitas de projetos, consultorias e obras para uma visão financeira clara.',
        },
        {
          titulo: 'Planejamento tributário',
          descricao:
            'Buscamos o enquadramento mais eficiente para o seu faturamento de engenharia.',
        },
      ],
    },
    beneficios: {
      titulo: 'Vantagens para o engenheiro PJ',
      itens: [
        'Notas de projetos, laudos e ART emitidas corretamente.',
        'Possível redução de impostos com o Fator R.',
        'Organização financeira entre PF e PJ.',
        'Acompanhamento contábil especializado.',
      ],
    },
    faq: [
      {
        pergunta: 'Engenheiro PJ precisa emitir nota fiscal?',
        resposta:
          'Sim. Serviços de engenharia como projetos, laudos, ART e acompanhamento de obras devem ser faturados com nota fiscal. Orientamos a emissão conforme a sua atividade.',
      },
      {
        pergunta: 'Engenheiro pode usar o Fator R?',
        resposta:
          'Pode, dependendo da atividade e da folha de pagamento. Quando a folha atinge 28% do faturamento, é possível tributar no Anexo III do Simples. Avaliamos seu caso.',
      },
      {
        pergunta: 'Como tributar receitas de obras e projetos?',
        resposta:
          'Cada tipo de receita pode ter tratamento específico. Organizamos a contabilidade para apurar os impostos corretamente conforme a atividade.',
      },
      {
        pergunta: 'Vale a pena abrir PJ como engenheiro?',
        resposta:
          'Para engenheiros com faturamento recorrente, a PJ costuma reduzir a carga tributária. Avaliamos seu caso na consultoria gratuita.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Arquitetos',
        href: '/contabilidade-para-arquitetos',
        descricao: 'Para projetos em parceria com arquitetura.',
      },
      {
        titulo: 'Contabilidade para Construtoras',
        href: '/contabilidade-para-construtoras',
        descricao: 'Para quem atua diretamente em obras.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Reduza impostos da sua engenharia.',
      },
    ],
  },

  advogados: {
    slug: '/contabilidade-para-advogados-imobiliarios',
    chave: 'advogados',
    metaTitle:
      'Contabilidade para Advogados Imobiliários | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para advogados imobiliários: contratos, locação, compra e venda, regularização e direito condominial. Planejamento tributário e consultoria gratuita.',
    badge: 'Para advogados imobiliários',
    h1: 'Contabilidade para Advogados Imobiliários',
    subtitulo:
      'Para quem atua com contratos, locação, compra e venda e direito condominial: organizamos a contabilidade do seu escritório com eficiência tributária.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'O que pesa na rotina do advogado imobiliário',
      itens: [
        'Dúvidas sobre emissão de nota de honorários e consultorias.',
        'Não saber qual o melhor regime para a sociedade de advogados.',
        'Misturar honorários recebidos com finanças pessoais.',
        'Falta de organização para apurar impostos sobre serviços jurídicos.',
        'Contador que não entende a atuação no mercado imobiliário.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o advogado',
      subtitulo:
        'Estruturamos a contabilidade do escritório com foco em eficiência fiscal.',
      itens: [
        {
          titulo: 'Emissão de honorários',
          descricao:
            'Orientamos a emissão de notas de honorários, consultorias e pareceres jurídicos.',
        },
        {
          titulo: 'Enquadramento da sociedade',
          descricao:
            'Avaliamos o melhor regime para a sociedade de advogados ou para o advogado autônomo que quer formalizar PJ.',
        },
        {
          titulo: 'Organização financeira',
          descricao:
            'Separamos PF e PJ e organizamos as receitas de serviços jurídicos.',
        },
        {
          titulo: 'Planejamento tributário',
          descricao:
            'Buscamos a estrutura mais eficiente para a tributação dos seus honorários.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que o advogado ganha com a Immovi',
      itens: [
        'Honorários faturados corretamente com nota fiscal.',
        'Enquadramento tributário adequado ao escritório.',
        'Separação clara entre PF e PJ.',
        'Suporte especializado no setor imobiliário.',
      ],
    },
    faq: [
      {
        pergunta: 'Como o advogado deve emitir nota de honorários?',
        resposta:
          'A nota descreve o serviço jurídico prestado (consultoria, parecer, acompanhamento). Orientamos a emissão conforme o município e o regime da sociedade ou da PJ.',
      },
      {
        pergunta: 'Qual o melhor regime para sociedade de advogados?',
        resposta:
          'Depende do faturamento e da estrutura de custos. Avaliamos Simples Nacional e Lucro Presumido para indicar a opção mais eficiente.',
      },
      {
        pergunta: 'Advogado autônomo deve abrir PJ?',
        resposta:
          'Para quem tem honorários recorrentes, a PJ pode reduzir a carga tributária e organizar o financeiro. Avaliamos seu caso na consultoria gratuita.',
      },
      {
        pergunta: 'A Immovi atende escritórios de outros estados?',
        resposta:
          'Sim. O atendimento é digital e alcança escritórios em todo o Brasil.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Imobiliárias',
        href: '/contabilidade-para-imobiliarias',
        descricao: 'Para parcerias com imobiliárias parceiras.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Eficiência tributária para seus honorários.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Formalize sua atuação com segurança.',
      },
    ],
  },

  correspondentes: {
    slug: '/contabilidade-para-correspondentes-bancarios-imobiliarios',
    chave: 'correspondentes',
    metaTitle:
      'Contabilidade para Correspondentes Bancários Imobiliários | Immovi',
    metaDescription:
      'Contabilidade para correspondentes bancários imobiliários: financiamento habitacional, FGTS, SBPE, Minha Casa Minha Vida e comissão variável. Consultoria gratuita.',
    badge: 'Para correspondentes bancários',
    h1: 'Contabilidade para Correspondentes Bancários Imobiliários',
    subtitulo:
      'Para quem trabalha com financiamento habitacional, SBPE, FGTS e MCMV: organizamos suas comissões variáveis e a tributação da sua PJ.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Desafios do correspondente bancário',
      itens: [
        'Comissões variáveis e por financiamento difíceis de controlar.',
        'Dúvidas sobre emissão de nota das comissões recebidas dos bancos.',
        'Falta de previsibilidade financeira em meses de volume desigual.',
        'Misturar comissões da PJ com a conta pessoal.',
        'Contador que não entende crédito imobiliário, SBPE e FGTS.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi ajuda o correspondente bancário',
      subtitulo:
        'Estruturamos a contabilidade para comissões variáveis do crédito imobiliário.',
      itens: [
        {
          titulo: 'Gestão de comissões variáveis',
          descricao:
            'Organizamos o recebimento de comissões por financiamento, SBPE, FGTS e MCMV.',
        },
        {
          titulo: 'Emissão de notas',
          descricao:
            'Orientamos a emissão das notas de comissão para bancos e parceiros.',
        },
        {
          titulo: 'Enquadramento eficiente',
          descricao:
            'Buscamos o regime tributário mais adequado ao seu volume de comissões.',
        },
        {
          titulo: 'Organização financeira',
          descricao:
            'Separamos PF e PJ e damos previsibilidade ao seu fluxo de caixa.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que o correspondente ganha',
      itens: [
        'Controle das comissões variáveis por operação.',
        'Notas de comissão emitidas corretamente.',
        'Tributação adequada ao crédito imobiliário.',
        'Organização financeira e suporte especializado.',
      ],
    },
    faq: [
      {
        pergunta: 'Correspondente bancário precisa de CNPJ?',
        resposta:
          'Atuar como PJ costuma ser vantajoso para receber comissões dos bancos e reduzir a carga tributária. Avaliamos o melhor formato para o seu caso.',
      },
      {
        pergunta: 'Como emitir nota das comissões de financiamento?',
        resposta:
          'A nota descreve o serviço de correspondente prestado ao banco ou parceiro. Orientamos a emissão correta conforme o regime tributário da PJ.',
      },
      {
        pergunta: 'Como lidar com a variação das comissões?',
        resposta:
          'Organizamos o fluxo de caixa e a apuração para dar previsibilidade mesmo com volume desigual entre os meses.',
      },
      {
        pergunta: 'Qual o melhor regime tributário?',
        resposta:
          'Depende do seu faturamento. Avaliamos Simples Nacional e Lucro Presumido para indicar a opção mais eficiente.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Corretores',
        href: '/contabilidade-para-corretores-de-imoveis',
        descricao: 'Para a parceria entre corretagem e crédito.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Reduza impostos sobre suas comissões.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Abra sua PJ de correspondente com segurança.',
      },
    ],
  },

  construtoras: {
    slug: '/contabilidade-para-construtoras',
    chave: 'construtoras',
    metaTitle: 'Contabilidade para Construtoras | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para construtoras: gestão por obra, custos, BPO financeiro, notas fiscais, folha de pagamento e obrigações fiscais da construção. Consultoria gratuita.',
    badge: 'Para construtoras',
    h1: 'Contabilidade para Construtoras',
    subtitulo:
      'Gestão contábil por obra, controle de custos, folha e obrigações fiscais da construção civil. A Immovi apoia construtoras com BPO financeiro e visão por projeto.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'O que complica a gestão de uma construtora',
      itens: [
        'Falta de visão de custos e margem por obra.',
        'Notas fiscais de materiais e serviços sem organização.',
        'Folha de pagamento e encargos da equipe de obra.',
        'Obrigações fiscais específicas da construção civil.',
        'Contador que não entende gestão por projeto e custos de obra.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi apoia a construtora',
      subtitulo:
        'Organizamos a contabilidade e o financeiro com foco na gestão por obra.',
      itens: [
        {
          titulo: 'Gestão por obra',
          descricao:
            'Estruturamos o controle de custos e receitas por empreendimento para você enxergar a margem real.',
        },
        {
          titulo: 'BPO financeiro',
          descricao:
            'Cuidamos de contas a pagar, receber e conciliação para a construtora focar na execução.',
        },
        {
          titulo: 'Notas e folha',
          descricao:
            'Organizamos notas de materiais e serviços e a folha de pagamento da equipe.',
        },
        {
          titulo: 'Obrigações fiscais',
          descricao:
            'Cuidamos das obrigações tributárias específicas da construção civil.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que a construtora ganha',
      itens: [
        'Visão de custo e margem por obra.',
        'Financeiro organizado com BPO.',
        'Conformidade fiscal na construção civil.',
        'Suporte especializado no setor imobiliário.',
      ],
    },
    faq: [
      {
        pergunta: 'A Immovi atende construtoras?',
        resposta:
          'Sim. Atendemos construtoras com gestão por obra, controle de custos, BPO financeiro e as obrigações fiscais específicas da construção civil.',
      },
      {
        pergunta: 'Como funciona a gestão por obra?',
        resposta:
          'Organizamos custos, receitas e notas por empreendimento, permitindo acompanhar a margem de cada obra separadamente.',
      },
      {
        pergunta: 'Qual o melhor regime tributário para construtora?',
        resposta:
          'Depende do porte e da atividade. Avaliamos Simples Nacional, Lucro Presumido e regimes específicos da construção para indicar o mais eficiente.',
      },
      {
        pergunta: 'A Immovi faz BPO financeiro?',
        resposta:
          'Sim. Podemos cuidar de contas a pagar, receber e conciliação para a construtora focar na execução das obras.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Incorporadoras',
        href: '/contabilidade-para-incorporadoras',
        descricao: 'Para quem incorpora e vende empreendimentos.',
      },
      {
        titulo: 'Contabilidade para Engenheiros',
        href: '/contabilidade-para-engenheiros',
        descricao: 'Para o time técnico de obras e projetos.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Estruture a tributação da construtora.',
      },
    ],
  },

  incorporadoras: {
    slug: '/contabilidade-para-incorporadoras',
    chave: 'incorporadoras',
    metaTitle: 'Contabilidade para Incorporadoras | Immovi Contabilidade',
    metaDescription:
      'Contabilidade para incorporadoras: SPE, RET, empreendimentos, regime de incorporação e organização fiscal. Estrutura tributária eficiente e consultoria gratuita.',
    badge: 'Para incorporadoras',
    h1: 'Contabilidade para Incorporadoras',
    subtitulo:
      'SPE, RET e regime de incorporação: estruturamos a contabilidade da sua incorporadora para cada empreendimento com eficiência fiscal e segurança.',
    heroWhatsappKey: 'geral',
    dores: {
      titulo: 'Desafios de uma incorporadora',
      itens: [
        'Dúvidas sobre quando usar SPE e patrimônio de afetação.',
        'Não saber se o RET é vantajoso para o empreendimento.',
        'Organizar a contabilidade por empreendimento.',
        'Obrigações fiscais específicas da incorporação imobiliária.',
        'Contador que não domina o regime de incorporação.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi apoia a incorporadora',
      subtitulo:
        'Estruturamos a tributação e a contabilidade por empreendimento.',
      itens: [
        {
          titulo: 'Estruturação de SPE',
          descricao:
            'Apoiamos a criação e a gestão contábil de Sociedades de Propósito Específico por empreendimento.',
        },
        {
          titulo: 'Análise de RET',
          descricao:
            'Avaliamos o Regime Especial de Tributação e o patrimônio de afetação para reduzir a carga fiscal.',
        },
        {
          titulo: 'Contabilidade por empreendimento',
          descricao:
            'Organizamos receitas, custos e resultados de cada empreendimento separadamente.',
        },
        {
          titulo: 'Conformidade fiscal',
          descricao:
            'Cuidamos das obrigações específicas do regime de incorporação imobiliária.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que a incorporadora ganha',
      itens: [
        'Estrutura societária e fiscal adequada por empreendimento.',
        'Avaliação de RET e patrimônio de afetação.',
        'Visão de resultado por projeto.',
        'Suporte especializado no setor imobiliário.',
      ],
    },
    faq: [
      {
        pergunta: 'O que é SPE na incorporação imobiliária?',
        resposta:
          'A Sociedade de Propósito Específico é uma empresa criada para um empreendimento específico, isolando riscos e organizando a contabilidade do projeto. Apoiamos a estruturação e a gestão contábil.',
      },
      {
        pergunta: 'O RET vale a pena para minha incorporadora?',
        resposta:
          'O Regime Especial de Tributação, combinado ao patrimônio de afetação, pode reduzir a carga fiscal do empreendimento. Avaliamos se é vantajoso no seu caso.',
      },
      {
        pergunta: 'Como organizar a contabilidade por empreendimento?',
        resposta:
          'Estruturamos receitas, custos e resultados de cada empreendimento de forma separada, geralmente via SPE, para clareza fiscal e gerencial.',
      },
      {
        pergunta: 'A Immovi atende incorporadoras de outros estados?',
        resposta:
          'Sim. O atendimento é digital e alcança incorporadoras em todo o Brasil.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Construtoras',
        href: '/contabilidade-para-construtoras',
        descricao: 'Para a execução das obras dos empreendimentos.',
      },
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Estruture RET, SPE e a tributação ideal.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Abra a SPE do seu próximo empreendimento.',
      },
    ],
  },

  planejamento: {
    slug: '/planejamento-tributario-imobiliario',
    chave: 'planejamento',
    metaTitle: 'Planejamento Tributário Imobiliário | Immovi Contabilidade',
    metaDescription:
      'Planejamento tributário para o mercado imobiliário: redução de impostos dentro da lei, Simples Nacional, Lucro Presumido e Fator R. Consultoria gratuita.',
    badge: 'Planejamento tributário',
    h1: 'Planejamento Tributário para o Mercado Imobiliário',
    subtitulo:
      'Pague menos imposto dentro da lei. Analisamos seu faturamento, atividade e regime para encontrar a estrutura tributária mais eficiente para o seu negócio imobiliário.',
    heroWhatsappKey: 'planejamentoTributario',
    dores: {
      titulo: 'Sinais de que você paga mais imposto do que deveria',
      itens: [
        'Nunca fez uma análise comparativa entre Simples e Lucro Presumido.',
        'Não sabe se pode aproveitar o Fator R na sua atividade.',
        'Recebe tudo como pessoa física, sem estrutura de PJ.',
        'Não tem previsibilidade sobre os impostos do próximo ano.',
        'Seu contador nunca propôs uma estratégia tributária.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi faz seu planejamento tributário',
      subtitulo:
        'Um diagnóstico completo para reduzir a carga tributária com segurança.',
      itens: [
        {
          titulo: 'Diagnóstico tributário',
          descricao:
            'Analisamos faturamento, atividade, despesas e folha para mapear oportunidades.',
        },
        {
          titulo: 'Comparação de regimes',
          descricao:
            'Comparamos Simples Nacional e Lucro Presumido para indicar o mais eficiente.',
        },
        {
          titulo: 'Estratégia de Fator R',
          descricao:
            'Verificamos se a folha permite tributar serviços no Anexo III, com alíquotas menores.',
        },
        {
          titulo: 'Plano de ação',
          descricao:
            'Entregamos um plano claro com os passos para reduzir impostos dentro da lei.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que você ganha com o planejamento',
      itens: [
        'Redução de impostos dentro da lei.',
        'Previsibilidade sobre a carga tributária.',
        'Enquadramento adequado à sua atividade.',
        'Segurança fiscal e suporte especializado.',
      ],
    },
    faq: [
      {
        pergunta: 'Planejamento tributário é legal?',
        resposta:
          'Sim. Planejamento tributário é a organização lícita das suas atividades para pagar menos imposto dentro da lei, diferente da sonegação. Trabalhamos sempre dentro da legalidade.',
      },
      {
        pergunta: 'Quanto posso economizar com planejamento tributário?',
        resposta:
          'Depende da sua atividade, faturamento e estrutura. Em muitos casos a economia é relevante, especialmente com a escolha correta de regime e o uso do Fator R quando aplicável.',
      },
      {
        pergunta: 'O que é o Fator R?',
        resposta:
          'É a relação entre a folha de pagamento e o faturamento. Quando atinge 28%, certos serviços podem ser tributados no Anexo III do Simples Nacional, com alíquotas menores.',
      },
      {
        pergunta: 'Para quem serve o planejamento tributário imobiliário?',
        resposta:
          'Para corretores, arquitetos, engenheiros, imobiliárias, construtoras, incorporadoras e demais profissionais e empresas do mercado imobiliário.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Contabilidade para Corretores',
        href: '/contabilidade-para-corretores-de-imoveis',
        descricao: 'Reduza impostos sobre suas comissões.',
      },
      {
        titulo: 'Contabilidade para Arquitetos',
        href: '/contabilidade-para-arquitetos',
        descricao: 'Use o Fator R a seu favor.',
      },
      {
        titulo: 'Abrir Empresa no Mercado Imobiliário',
        href: '/abrir-empresa-imobiliaria',
        descricao: 'Comece já com o enquadramento certo.',
      },
    ],
  },

  abrirEmpresa: {
    slug: '/abrir-empresa-imobiliaria',
    chave: 'abrir_empresa',
    metaTitle: 'Abrir Empresa no Mercado Imobiliário | Immovi Contabilidade',
    metaDescription:
      'Abra sua empresa no mercado imobiliário com segurança: CNPJ para corretores, arquitetos, engenheiros e designers, com enquadramento correto. Consultoria gratuita.',
    badge: 'Abertura de empresa',
    h1: 'Abra sua Empresa no Mercado Imobiliário com Segurança',
    subtitulo:
      'Abra sua PJ com o enquadramento correto desde o início. A Immovi orienta corretores, arquitetos, engenheiros, designers e demais profissionais na estruturação da empresa.',
    heroWhatsappKey: 'aberturaEmpresa',
    dores: {
      titulo: 'Dúvidas de quem vai abrir empresa',
      itens: [
        'Não saber qual CNAE e regime tributário escolher.',
        'Medo de abrir errado e pagar mais imposto depois.',
        'Dúvidas sobre MEI, Simples Nacional e Lucro Presumido.',
        'Não saber quais documentos e etapas são necessários.',
        'Receio da burocracia e do tempo de abertura.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi abre sua empresa',
      subtitulo:
        'Cuidamos de todo o processo para você começar com segurança fiscal.',
      itens: [
        {
          titulo: 'Escolha do enquadramento',
          descricao:
            'Definimos CNAE, natureza jurídica e regime tributário ideais para a sua atividade imobiliária.',
        },
        {
          titulo: 'Abertura completa',
          descricao:
            'Cuidamos do registro, inscrições e documentação necessária para a sua PJ operar.',
        },
        {
          titulo: 'Planejamento desde o início',
          descricao:
            'Estruturamos a empresa já pensando na eficiência tributária e na organização financeira.',
        },
        {
          titulo: 'Orientação inicial',
          descricao:
            'Explicamos como emitir notas, separar PF e PJ e manter a empresa em dia.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que você ganha abrindo com a Immovi',
      itens: [
        'Empresa aberta com o enquadramento correto.',
        'Menos imposto desde o primeiro mês.',
        'Processo digital, simples e sem dor de cabeça.',
        'Suporte especializado no mercado imobiliário.',
      ],
    },
    faq: [
      {
        pergunta: 'Quanto tempo leva para abrir a empresa?',
        resposta:
          'O prazo varia conforme o município e a atividade, mas conduzimos o processo de forma ágil e digital, mantendo você informado em cada etapa.',
      },
      {
        pergunta: 'Corretor de imóveis pode abrir MEI?',
        resposta:
          'Não. A corretagem de imóveis não é permitida no MEI. Abrimos a empresa no formato adequado, geralmente no Simples Nacional, com o CNAE correto.',
      },
      {
        pergunta: 'Qual regime tributário escolher ao abrir a empresa?',
        resposta:
          'Depende do faturamento esperado e da atividade. Já abrimos a empresa com o enquadramento mais eficiente, evitando retrabalho e impostos desnecessários.',
      },
      {
        pergunta: 'Quais documentos preciso para abrir a PJ?',
        resposta:
          'Em geral, documentos pessoais, comprovante de endereço e definição da atividade. Enviamos a lista completa e orientamos cada passo.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Abra já com a tributação mais eficiente.',
      },
      {
        titulo: 'Contabilidade para Corretores',
        href: '/contabilidade-para-corretores-de-imoveis',
        descricao: 'Para quem vai atuar com corretagem.',
      },
      {
        titulo: 'Trocar de Contador',
        href: '/trocar-de-contador-imobiliario',
        descricao: 'Já tem empresa? Migre para a Immovi.',
      },
    ],
  },

  trocarContador: {
    slug: '/trocar-de-contador-imobiliario',
    chave: 'trocar_contador',
    metaTitle: 'Trocar de Contador no Mercado Imobiliário | Immovi',
    metaDescription:
      'Troque para uma contabilidade especializada no mercado imobiliário. Migração organizada, análise de pendências e transição segura. Consultoria gratuita.',
    badge: 'Troca de contador',
    h1: 'Troque para uma Contabilidade Especializada no Mercado Imobiliário',
    subtitulo:
      'Trocar de contador pode ser simples quando existe organização. Fazemos a análise da situação atual, o levantamento de pendências e a transição com segurança.',
    heroWhatsappKey: 'trocaContador',
    dores: {
      titulo: 'Sinais de que é hora de trocar de contador',
      itens: [
        'Você não recebe orientação clara sobre impostos e obrigações.',
        'Sente que paga mais imposto do que deveria.',
        'Tem dificuldade de contato e respostas demoradas.',
        'Seu contador não entende o mercado imobiliário.',
        'Medo de que a troca gere problemas com pendências.',
      ],
    },
    comoAjuda: {
      titulo: 'Como a Immovi conduz a troca de contador',
      subtitulo:
        'Uma transição organizada, sem dor de cabeça e sem riscos para a sua empresa.',
      itens: [
        {
          titulo: 'Diagnóstico da situação',
          descricao:
            'Analisamos como está a contabilidade atual e identificamos pontos de atenção.',
        },
        {
          titulo: 'Levantamento de pendências',
          descricao:
            'Mapeamos obrigações em aberto e regularizamos o que for necessário antes da migração.',
        },
        {
          titulo: 'Transição segura',
          descricao:
            'Conduzimos a transferência de documentos e responsabilidades de forma organizada.',
        },
        {
          titulo: 'Contabilidade especializada',
          descricao:
            'Você passa a contar com uma contabilidade que entende o mercado imobiliário.',
        },
      ],
    },
    beneficios: {
      titulo: 'O que você ganha ao migrar para a Immovi',
      itens: [
        'Transição sem dor de cabeça e sem perda de dados.',
        'Pendências analisadas e regularizadas.',
        'Atendimento próximo e especializado.',
        'Possível redução de impostos com planejamento.',
      ],
    },
    faq: [
      {
        pergunta: 'Trocar de contador é complicado?',
        resposta:
          'Não, quando há organização. Conduzimos a transição analisando pendências e transferindo documentos de forma estruturada, sem prejudicar a sua empresa.',
      },
      {
        pergunta: 'Posso trocar de contador a qualquer momento?',
        resposta:
          'Sim. A troca pode ser feita em qualquer época do ano. Avaliamos o melhor momento e cuidamos para que nada fique em aberto.',
      },
      {
        pergunta: 'Vou perder informações ao trocar?',
        resposta:
          'Não. Organizamos a transferência de documentos e dados contábeis para que todo o histórico seja preservado.',
      },
      {
        pergunta: 'Quanto tempo leva a migração?',
        resposta:
          'Depende da situação atual da contabilidade, mas conduzimos o processo de forma ágil, mantendo você informado em cada etapa.',
      },
    ],
    linksInternos: [
      {
        titulo: 'Planejamento Tributário Imobiliário',
        href: '/planejamento-tributario-imobiliario',
        descricao: 'Aproveite a troca para reduzir impostos.',
      },
      {
        titulo: 'Contabilidade para Imobiliárias',
        href: '/contabilidade-para-imobiliarias',
        descricao: 'Migração para imobiliárias.',
      },
      {
        titulo: 'Contabilidade para Corretores',
        href: '/contabilidade-para-corretores-de-imoveis',
        descricao: 'Migração para corretores PJ.',
      },
    ],
  },
}

export const SEO_PAGES_LIST = Object.values(SEO_PAGES)
