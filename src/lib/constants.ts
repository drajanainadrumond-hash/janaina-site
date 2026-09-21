export const SITE = {
  name: "Dra. Janaína Drumond",
  fullName: "Dra. Janaína Drumond Rocha Fraga",
  specialty: "Ortopedia e Traumatologia",
  crm: "CRM-MG 69719",
  rqe: "RQE 50592",
  slogan: "Ortopedia com precisão. Cuidado com alma.",
  url: "https://janainadrumond.com.br",
  city: "Belo Horizonte",
  state: "MG",
  address: {
    street: "Avenida do Contorno, 5326",
    neighborhood: "Savassi",
    city: "Belo Horizonte",
    state: "MG",
    zip: "30110-039",
    full: "Av. do Contorno, 5326 — Savassi, Belo Horizonte/MG, CEP 30110-039",
  },
} as const;

export const CONTACT = {
  whatsapp: {
    number: "5531992880728",
    message: "Olá! Gostaria de agendar uma consulta com a Dra. Janaína Drumond.",
  },
  phone: "+5531992880728",
  email: "contato@janainadrumond.com.br",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/drajanainadrumond",
  instagram: "https://www.instagram.com/drajanainadrumond",
  /** Preencher quando o canal estiver criado */
  youtube: "#",
  linkedin: "https://br.linkedin.com/in/jana%C3%ADna-drumond-b7485514a",
  doctoralia: "https://www.doctoralia.com.br/janaina-drumond-2/ortopedista-traumatologista/belo-horizonte",
} as const;

/**
 * Produção científica com endereço verificável. Conferido nas fontes em 21/09/2026:
 * o DOI resolve para o artigo com ela entre os 5 autores, e o ORCID está no nome dela
 * e lista esse mesmo artigo. (1.3.6 · C31 autoridade)
 */
export const ACADEMICO = {
  orcid: "https://orcid.org/0000-0003-2579-0312",
  artigo: {
    titulo:
      "Avaliação do Resultado da Adição de Bicarbonato de Sódio em Solução para Infiltração em Patologias da Mão",
    autores: [
      "Bruno Kaehler de Albuquerque Maranhão",
      "Antônio Barbosa Chaves",
      "Janaína Drumond Rocha Fraga",
      "Daphne Rios Viana",
      "Luis Guilherme Rosifini Alves Rezende",
    ],
    periodico: "Archives of Health Investigation",
    publicadoEm: "2023-11-30",
    doi: "10.21270/archi.v12i11.6210",
  },
} as const;

/**
 * Prova social agregada — o que dá para publicar sem reproduzir palavra de paciente.
 *
 * Regra do projeto (C36, item 6): depoimento de paciente **não vai ao site**, real ou não.
 * O que vai é o agregado da plataforma, que é verificável em um clique e não é citação.
 *
 * ⚠️ Não marcar com schema `AggregateRating`: o Google proíbe review agregada sobre a própria
 * entidade no próprio site. Mostrar na tela, sim; como dado estruturado, não.
 *
 * Conferir na página do Doctoralia e atualizar `conferidoEm` junto com os números.
 */
export const PROVA_SOCIAL = {
  /** Fonte única e verificável: o perfil dela no Doctoralia. */
  fonte: "Doctoralia",
  avaliacoes: 42,
  estrelas: 5,
  /** Tags que a própria Doctoralia agrega das opiniões — não são frases de paciente. */
  maisMencionado: ["Atenção na consulta", "Explicações detalhadas", "Pontualidade"],
  conferidoEm: "09/09/2026",
} as const;

export const FORMACAO = [
  {
    title: "Graduação em Medicina",
    institution: "Universidade Federal de Ouro Preto (UFOP)",
    period: "2010–2016",
  },
  {
    title: "Residência em Ortopedia e Traumatologia",
    institution: "Hospital Socor — Belo Horizonte (credenciado SBOT)",
    period: "",
  },
  {
    title: "Pós-Graduação em Cirurgia da Mão",
    institution: "Hospital São Francisco de Assis (HSFA) — Goiânia (credenciado SBCM)",
    period: "",
  },
  {
    title: "Pós-Graduação Lato Sensu em Cirurgia da Mão",
    institution: "Faculdade Ciências Médicas de Minas Gerais (FCMMG)",
    period: "2021–2023",
    hours: "5.780 horas",
  },
  {
    title: "Retalhos para os Membros Superiores",
    institution: "Instituto de Treinamento em Cadáveres de BH (ITC BH)",
    period: "2022",
    hours: "11 horas",
  },
  {
    title: "Publicação Científica",
    institution: "Archives of Health Investigation · ORCID: 0000-0003-2579-0312",
    period: "2023",
  },
  {
    title: "Consultório em Belo Horizonte",
    institution: "Av. do Contorno, 5326 — Savassi, BH/MG",
    period: "Hoje",
  },
] as const;

export const CONVENIOS = [
  "Particular",
] as const;
