import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineNuxtModule, isNuxt2, addPlugin, addImportsDir } from '@nuxt/kit';

function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
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
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();

const module = defineNuxtModule({
  meta: {
    name: "nuxt-directus",
    configKey: "directus",
    compatibility: {
      nuxt: "^3.0.0-rc.9 || ^2.16.0",
      bridge: true
    }
  },
  defaults: {
    url: process.env.DIRECTUS_URL,
    autoFetch: true
  },
  setup(options, nuxt) {
    if (isNuxt2() && !nuxt?.options?.runtimeConfig?.public?.directus) {
      nuxt.options.publicRuntimeConfig.directus = defu(
        nuxt.options.publicRuntimeConfig.directus,
        {
          url: options.url,
          autoFetch: options.autoFetch,
          fetchUserParams: options.fetchUserParams,
          token: options.token
        }
      );
    }
    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {};
    nuxt.options.runtimeConfig.public.directus = defu(nuxt.options.runtimeConfig.directus, {
      url: options.url,
      autoFetch: options.autoFetch,
      fetchUserParams: options.fetchUserParams,
      token: options.token
    });
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "plugin"));
    addImportsDir(resolve(runtimeDir, "composables"));
  }
});

export { module as default };
