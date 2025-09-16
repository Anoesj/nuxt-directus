export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/devtools',
  ],
  directus: {
    url: 'http://localhost:8055/',
    devtools: true,
    maxAgeRefreshToken: 10000,
  },
})
