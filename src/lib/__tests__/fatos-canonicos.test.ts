/**
 * G1 · G2 · G4 · G5 — as guardas dos fatos que não podem estar errados no site de
 * uma médica (nota `C22 - TDD e Testes`, roadmap 1.4.3).
 *
 * Não testam tela nem componente: testam o que o site AFIRMA. Endereço, registro
 * profissional, preço e a especialidade a que o RQE pertence. Cada uma nasceu de um
 * erro real deste projeto — o CEP já teve três versões no ar ao mesmo tempo, e o
 * preço R$ 400 sobreviveu a uma auditoria de 64 critérios.
 */
import fs from "node:fs";
import path from "node:path";

import { AUTHOR_BYLINE } from "@/lib/author";
import { CONTACT, SITE } from "@/lib/constants";
import { generateMedicalBusiness, generatePhysician } from "@/lib/schema";

/** Fatos canônicos — fonte: `04-Cofre/01-Quem-e-a-Janaina/BLOCO 0`. */
const CEP = "30110-039";
const RUA = "Av. do Contorno, 5326";
const WHATSAPP = "5531992880728";
const CRM = "CRM-MG 69719";
const RQE = "RQE 50592";
const PRECO = "R$ 500";

const RAIZ = path.join(__dirname, "..", "..", "..");

/** Todo arquivo que o deploy publica — para varrer preço onde não há módulo a importar (JSX). */
function arquivosPublicados(): string[] {
  const encontrados: string[] = [];

  const andar = (dir: string) => {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const alvo = path.join(dir, item.name);
      if (item.isDirectory()) {
        if (item.name === "__tests__" || item.name === "node_modules") continue;
        andar(alvo);
      } else if (/\.(ts|tsx)$/.test(item.name)) {
        encontrados.push(alvo);
      }
    }
  };

  andar(path.join(RAIZ, "src"));
  encontrados.push(path.join(RAIZ, "public", "llms.txt"));

  return encontrados;
}

describe("G1 — endereço e telefone (NAP) batem em todo lugar", () => {
  it("o CEP canônico é 30110-039, e é esse que está na constante", () => {
    expect(SITE.address.zip).toBe(CEP);
    expect(SITE.address.full).toContain(CEP);
    expect(SITE.address.full).toContain(RUA);
    expect(SITE.address.street).toBe("Avenida do Contorno, 5326");
  });

  it("o WhatsApp publicado é o único número da Dra.", () => {
    expect(CONTACT.whatsapp.number).toBe(WHATSAPP);
    expect(CONTACT.phone).toBe(`+${WHATSAPP}`);
  });

  it("os dados estruturados repetem o MESMO endereço da constante", () => {
    for (const schema of [generateMedicalBusiness(), generatePhysician()]) {
      const endereco = schema.address;
      expect(endereco.postalCode).toBe(CEP);
      expect(endereco.streetAddress).toBe(SITE.address.street);
      expect(endereco.addressLocality).toBe("Belo Horizonte");
      expect(endereco.addressRegion).toBe("MG");
      expect(endereco.addressCountry).toBe("BR");
    }
  });

  it("o llms.txt não contradiz o CEP do código", () => {
    const llms = fs.readFileSync(path.join(RAIZ, "public", "llms.txt"), "utf8");
    const ceps = [...llms.matchAll(/30110-\d{3}/g)].map((m) => m[0]);

    expect(ceps.length).toBeGreaterThan(0);
    expect([...new Set(ceps)]).toEqual([CEP]);
  });
});

describe("G2 — CRM e RQE em todo dado estruturado de médica", () => {
  it("MedicalBusiness e Physician trazem CRM-MG 69719 e RQE 50592", () => {
    for (const schema of [generateMedicalBusiness(), generatePhysician()]) {
      const serializado = JSON.stringify(schema);
      expect(serializado).toContain("69719");
      expect(serializado).toContain("50592");
    }
  });

  it("a assinatura do autor traz nome, CRM e RQE juntos", () => {
    expect(AUTHOR_BYLINE).toContain(SITE.fullName);
    expect(AUTHOR_BYLINE).toContain(CRM);
    expect(AUTHOR_BYLINE).toContain(RQE);
  });
});

describe("G4 — preço: R$ 500, e nenhum outro", () => {
  it("nenhum arquivo publicado traz R$ 400, R$ 450 ou R$ 398", () => {
    const errados = /R\$\s?(400|450|398)\b/;
    const culpados = arquivosPublicados()
      .map((arquivo) => ({ arquivo, conteudo: fs.readFileSync(arquivo, "utf8") }))
      .filter(({ conteudo }) => errados.test(conteudo))
      .map(({ arquivo }) => path.relative(RAIZ, arquivo));

    expect(culpados).toEqual([]);
  });

  it("onde o site fala o valor da consulta, o valor é R$ 500", () => {
    const comPreco = arquivosPublicados()
      .map((arquivo) => ({ arquivo, conteudo: fs.readFileSync(arquivo, "utf8") }))
      .flatMap(({ arquivo, conteudo }) =>
        [...conteudo.matchAll(/consulta\D{0,30}R\$\s?\d+/gi)].map((m) => ({
          arquivo: path.relative(RAIZ, arquivo),
          trecho: m[0],
        }))
      );

    expect(comPreco.length).toBeGreaterThan(0);
    for (const { trecho } of comPreco) {
      expect(trecho).toContain(PRECO);
    }
  });
});

describe("G5 — o RQE 50592 é de Ortopedia, nunca de Cirurgia da Mão", () => {
  it("a especialidade declarada nos dados estruturados é ortopedia", () => {
    for (const schema of [generateMedicalBusiness(), generatePhysician()]) {
      expect(schema.medicalSpecialty).toBe("Orthopedic");
    }
    expect(SITE.specialty).toBe("Ortopedia e Traumatologia");
  });

  it("o RQE não é emitido para mão nem para cirurgia da mão", () => {
    const credenciais = generatePhysician().hasCredential;
    const rqe = credenciais.find((c) => c.credentialCategory === "RQE");

    expect(rqe).toBeDefined();
    expect(rqe?.identifier).toBe("50592");
    expect(JSON.stringify(rqe)).not.toMatch(/m[ãa]o|hand|cirurgia/i);
  });

  it("nenhum dado estruturado cola o número do RQE em mão ou punho", () => {
    for (const schema of [generateMedicalBusiness(), generatePhysician()]) {
      const serializado = JSON.stringify(schema);
      // 120 caracteres à frente e atrás do número: o bastante para pegar
      // "RQE 50592 em Cirurgia da Mão" em qualquer campo de texto.
      for (const achado of serializado.matchAll(/50592/g)) {
        const redor = serializado.slice(
          Math.max(0, achado.index - 120),
          achado.index + 120
        );
        expect(redor).not.toMatch(/cirurgia da m[ãa]o|especialista em m[ãa]o/i);
      }
    }
  });
});
