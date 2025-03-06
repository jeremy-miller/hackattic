import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
    },
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    {
        languageOptions: {
            globals: globals.node,
        },
    },
    jsdoc.configs['flat/recommended-typescript'],
    pluginJs.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        // for tseslint
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // disable type-checked linting for given files (will still do non-type-checked linting)
        ...tseslint.configs.disableTypeChecked,
        files: ['eslint.config.mjs'],
    },
    eslintConfigPrettier,
];
