import NuxtDirectus from '..'

export default defineNuxtConfig({
  modules: [
    NuxtDirectus,
    '@nuxt/devtools',
    '@nuxt/eslint',
  ],
  directus: {
    url: 'http://localhost:8055/',
    devtools: true,
    maxAgeRefreshToken: 10000,
  }
})
