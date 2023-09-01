import { useRuntimeConfig, createError } from "#app";
import { joinURL } from "ufo";
import { useDirectusUrl } from "./useDirectusUrl.mjs";
import { useDirectusToken } from "./useDirectusToken.mjs";
export const useDirectus = () => {
  const baseURL = useDirectusUrl();
  const config = useRuntimeConfig();
  const { token, token_expired, checkAutoRefresh } = useDirectusToken();
  return async (url, fetchOptions = {}, useStaticToken = true) => {
    const headers = {};
    await checkAutoRefresh();
    if (token?.value && !token_expired.value) {
      headers.Authorization = `Bearer ${token.value}`;
    } else if (config.public.directus.token && useStaticToken) {
      headers.Authorization = `Bearer ${config.public.directus.token}`;
    }
    try {
      return await $fetch(joinURL(baseURL, url), {
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers
        }
      });
    } catch (err) {
      if (process.dev) {
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
