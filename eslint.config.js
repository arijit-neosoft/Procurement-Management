import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['./dist/**/*'] },
  { files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: { '@typescript-eslint/consistent-type-imports': 'error' },
  },

  {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: { 'simple-import-sort/imports': 'error', 'simple-import-sort/exports': 'error' },
  },

  {
    files: ['**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    plugins: { 'unused-imports': unusedImports },
    rules: { 'unused-imports/no-unused-imports': 'error' },
  },

  {
    files: ['src/**/*.{ts,tsx,cts,mts,js,jsx,cjs,mjs}'],
    plugins: { 'import-plugin': importPlugin },
    rules: { 'import-plugin/no-default-export': 'error' },
  },
]);
