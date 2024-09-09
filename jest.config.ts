/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
   // O rootDir deve ser o diretório raiz do projeto
   rootDir: './',
   // Caminho relativo ao rootDir para os testes
   testMatch: ['<rootDir>/src/tests/**/*.tests.ts'],
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Outras configurações
  testTimeout: 60000, // Aumenta o timeout global para 60 segundos
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;