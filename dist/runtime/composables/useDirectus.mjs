import { useNuxtApp, useRuntimeConfig } from "#app";
import { useDirectusUrl } from "./useDirectusUrl.mjs";
import { useDirectusToken } from "./useDirectusToken.mjs";
export const useDirectus = () => {
  const nuxt = useNuxtApp();
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig();
  const token = useDirectusToken();
  return async (url, fetchOptions = {}) => {
    const headers = {};
    if (token && token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (config.directus.token) {
      headers.Authorization = `Bearer ${config.directus.token}`;
    }
    try {
      return await $fetch(url, {
        baseURL,
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (err) {
      console.error("[Directus Error]: " + err);
      throw err;
    }
  };
};
