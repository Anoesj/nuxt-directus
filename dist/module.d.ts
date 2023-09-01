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
     * @default process.env.NUXT_PUBLIC_DIRECTUS_URL
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
     * Auto refesh tokens
     * @default true
     * @type boolean
     */
    autoRefresh?: boolean;
    /**
     * Auto refesh tokens
     * @default true
     * @type boolean
     */
    onAutoRefreshFailure?: () => Promise<void>;
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
    /**
     * Add Directus Admin Dashboard in Nuxt Devtools
     *
     * @default false
     */
    devtools?: boolean;
    /**
     * Token Cookie Name
     * @type string
     * @ default 'directus_token'
     */
    cookieNameToken?: string;
    /**
     * Refresh Token Cookie Name
     * @type string
     * @default 'directus_refresh_token'
     */
    cookieNameRefreshToken?: string;
    /**
     * The max age for auth cookies in milliseconds.
     * This should match your directus env key REFRESH_TOKEN_TTL
     * @type string
     * @default 604800000
     */
    cookieMaxAge?: number;
    /**
     * The max age for auth cookies in milliseconds.
     * This should match your directus env key REFRESH_TOKEN_TTL
     * @type string
     * @default 604800000
     */
    maxAgeRefreshToken?: number;
    /**
     * The SameSite attribute for auth cookies.
     * @type string
     * @default 'lax'
     */
    cookieSameSite?: 'strict' | 'lax' | 'none' | undefined;
    /**
     * The Secure attribute for auth cookies.
     * @type boolean
     * @default false
     */
    cookieSecure?: boolean;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

declare module '@nuxt/schema' {
    interface ConfigSchema {
        directus?: ModuleOptions;
        publicRuntimeConfig?: {
            directus?: ModuleOptions;
        };
    }
}

export { ModuleOptions, _default as default };
