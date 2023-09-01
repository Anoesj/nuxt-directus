
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['directus']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['directus']?: ModuleOptions }
}

declare module 'nuxt/schema' {
  interface NuxtConfig { ['directus']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['directus']?: ModuleOptions }
}


export { ModuleOptions, default } from './module'
