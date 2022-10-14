import { useCookie, useNuxtApp } from "#app";
export const useDirectusToken = () => {
  const nuxtApp = useNuxtApp();
  nuxtApp._cookies = nuxtApp._cookies || {};
  if (nuxtApp._cookies.directus_token) {
    return nuxtApp._cookies.directus_token;
  }
  const cookie = useCookie("directus_token");
  nuxtApp._cookies.directus_token = cookie;
  return cookie;
};
