import withNuxt from './playground/.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      "@typescript-eslint/no-unused-vars": 'off',
    }
  },
)
