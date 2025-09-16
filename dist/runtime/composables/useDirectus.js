import { useRuntimeConfig, createError } from "#app";
import { joinURL } from "ufo";
import { useDirectusUrl } from "./useDirectusUrl.js";
import { useDirectusToken } from "./useDirectusToken.js";
export const useDirectus = () => {
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig();
  const { token, token_expired, checkAutoRefresh } = useDirectusToken();
  return async (url, fetchOptions = {}, useStaticToken = true) => {
    const headers = {};
    await checkAutoRefresh();
    const directusConfig = config.public.directus;
    if (token?.value && !token_expired.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (directusConfig.token && useStaticToken) {
      headers.Authorization = `Bearer ${directusConfig.token}`;
    }
    try {
      return await $fetch(joinURL(baseURL, url), {
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (_err) {
      const err = _err;
      if (import.meta.dev) {
        console.error("[Directus Error]: " + err);
        console.log(err.response._data);
      } else {
        console.error(
          "[Directus Error]: " + err.response?.status + ", " + err.response?.statusText
        );
      }
      throw createError({
        statusCode: err.response?.status,
        statusMessage: err.response?.statusText,
        data: err.response?._data
      });
    }
  };
};
