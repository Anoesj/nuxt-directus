import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin, addImportsDir } from '@nuxt/kit';

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();

const JOIN_LEADING_SLASH_RE = /^\.?\//;
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const module = defineNuxtModule({
  meta: {
    name: "nuxt-directus",
    configKey: "directus",
    compatibility: {
      nuxt: ">=3.0.0"
    }
  },
  defaults: {
    url: process.env.NUXT_PUBLIC_DIRECTUS_URL,
    autoFetch: true,
    autoRefresh: false,
    devtools: false,
    cookieNameToken: "directus_token",
    cookieNameRefreshToken: "directus_refresh_token",
    // Nuxt Cookies Docs @ https://nuxt.com/docs/api/composables/use-cookie
    cookieMaxAge: 6048e5,
    cookieSameSite: "lax",
    cookieSecure: false
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {};
    nuxt.options.runtimeConfig.public.directus = defu(
      nuxt.options.runtimeConfig.public.directus,
      {
        url: options.url,
        autoFetch: options.autoFetch,
        autoRefresh: options.autoRefresh,
        onAutoRefreshFailure: options.onAutoRefreshFailure,
        fetchUserParams: options.fetchUserParams,
        token: options.token,
        devtools: options.devtools,
        cookieNameToken: options.cookieNameToken,
        cookieNameRefreshToken: options.cookieNameRefreshToken,
        cookieMaxAge: options.cookieMaxAge || options.maxAgeRefreshToken,
        cookieSameSite: options.cookieSameSite,
        cookieSecure: options.cookieSecure
      }
    );
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "plugin"));
    addImportsDir(resolve(runtimeDir, "composables"));
    if (options.maxAgeRefreshToken) {
      console.warn(
        "maxAgeRefreshToken is deprecated, please use cookieMaxAge instead"
      );
    }
    if (options.devtools) {
      const adminUrl = joinURL(nuxt.options.runtimeConfig.public.directus.url, "/admin/");
      nuxt.hook("devtools:customTabs", (iframeTabs) => {
        iframeTabs.push({
          name: "directus",
          title: "Directus",
          icon: "simple-icons:directus",
          view: {
            type: "iframe",
            src: adminUrl
          }
        });
      });
    }
  }
});

export { module as default };
