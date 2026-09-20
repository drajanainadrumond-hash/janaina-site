const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
};

/**
 * O `sanitize-html` 2.17.7 — a versão que fecha os dois XSS do C18 — passou a
 * depender do `htmlparser2` 12, que é ESM puro. O Node 24 e o build do Next dão
 * conta; o Jest, não: ele ignora `node_modules` ao transformar.
 *
 * O `next/jest` monta a própria lista de exceções e a coloca ANTES da nossa, e
 * basta um padrão casar para o arquivo ser ignorado. Por isso a lista é reescrita
 * depois que ele resolve a configuração, em vez de acrescentada. O trecho
 * "qualquer caminho antes" do padrão alcança a cópia aninhada, em
 * `sanitize-html/node_modules/htmlparser2`.
 */
const ESM_A_TRANSFORMAR = [
  "htmlparser2",
  "entities",
  "domhandler",
  "domutils",
  "dom-serializer",
  "domelementtype",
];

const criarConfig = createJestConfig(customJestConfig);

module.exports = async (...args) => {
  const config = await criarConfig(...args);

  config.transformIgnorePatterns = [
    `/node_modules/(?!(?:.*/)?(${ESM_A_TRANSFORMAR.join("|")})/)`,
    "^.+\\.module\\.(css|sass|scss)$",
  ];

  return config;
};
