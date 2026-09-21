import fs from "fs";
import path from "path";
import { checarVariaveis, OBRIGATORIAS_EM_PRODUCAO, variaveisFaltando } from "@/lib/env-check";

const completo = Object.fromEntries(OBRIGATORIAS_EM_PRODUCAO.map((n) => [n, "x"]));

describe("env-check (1.4.7)", () => {
  it("não acusa nada quando todas existem", () => {
    expect(variaveisFaltando(completo)).toEqual([]);
  });

  it("acusa a que falta e a que está só com espaço", () => {
    expect(variaveisFaltando({ ...completo, CRON_SECRET: undefined, EMAIL_TO: "  " })).toEqual([
      "EMAIL_TO",
      "CRON_SECRET",
    ]);
  });

  it("em produção avisa como erro, mas não lança", () => {
    const erro = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => checarVariaveis({ ...completo, RESEND_API_KEY: "", VERCEL_ENV: "production" })).not.toThrow();
    expect(erro).toHaveBeenCalledWith(expect.stringContaining("RESEND_API_KEY"));
    erro.mockRestore();
  });

  it("o .env.example lista todas as obrigatórias", () => {
    const exemplo = fs.readFileSync(path.join(process.cwd(), ".env.example"), "utf8");
    for (const nome of OBRIGATORIAS_EM_PRODUCAO) expect(exemplo).toMatch(new RegExp(`^${nome}=`, "m"));
  });
});
