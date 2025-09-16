import { useRuntimeConfig } from '#app'
import { withoutTrailingSlash } from 'ufo'
import type { ModuleOptions } from '../../module'

export const useDirectusUrl = (): string => {
  const config = useRuntimeConfig()
  const url = (config.public.directus as ModuleOptions).url
  return withoutTrailingSlash(url)
}
