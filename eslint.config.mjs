import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt(
  {
    features: {
      stylistic: true,
    },
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
)
