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
