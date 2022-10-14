
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['directus']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['directus']?: ModuleOptions }
}


export { default } from './module'
