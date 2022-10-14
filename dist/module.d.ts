import * as _nuxt_schema from '@nuxt/schema';

type ArrayOfOrSingle<T> = T | T[];

interface DirectusQueryParamsMeta {
  total_count?: number;
  filter_count?: number;
}

type DirectusQueryParamsMetaAll = '*';

interface DirectusQueryParams {
  fields?: string[];
  sort?: ArrayOfOrSingle<string>;
  filter?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  page?: number;
  alias?: ArrayOfOrSingle<string>;
  deep?: Record<string, unknown>;
  search?: string;
  meta?: keyof DirectusQueryParamsMeta | DirectusQueryParamsMetaAll;
}

interface ModuleOptions {
    /**
     * Directus API URL
     * @default process.env.DIRECTUS_URL
     * @type string
     */
    url?: string;
    /**
     * Auto fetch user
     * @default true
     * @type boolean
     */
    autoFetch?: boolean;
    /**
     * fetch user params
     * @type boolean
     */
    fetchUserParams?: DirectusQueryParams;
    /**
     * Auth Token
     * @type string
     */
    token?: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

declare module '@nuxt/schema' {
    interface ConfigSchema {
        publicRuntimeConfig?: {
            directus?: ModuleOptions;
        };
    }
}

export { ModuleOptions, _default as default };
