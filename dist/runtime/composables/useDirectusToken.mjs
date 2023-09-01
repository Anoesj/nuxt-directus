import { useCookie, useNuxtApp, useRuntimeConfig } from "#app";
import { computed } from "vue";
import { useDirectusUrl } from "./useDirectusUrl.mjs";
export const useDirectusToken = () => {
  const nuxtApp = useNuxtApp();
  const baseUrl = useDirectusUrl();
  const config = useRuntimeConfig().public;
  const _getOrSetCookie = (name) => {
    nuxtApp._cookies = nuxtApp._cookies || {};
    if (nuxtApp._cookies[name]) {
      return nuxtApp._cookies[name];
    }
    const cookie = useCookie(name, {
      maxAge: config.directus.cookieMaxAge,
      sameSite: config.directus.cookieSameSite,
      secure: config.directus.cookieSecure
    });
    nuxtApp._cookies[name] = cookie;
    return cookie;
  };
  const token = () => {
    return _getOrSetCookie(config.directus.cookieNameToken);
  };
  const refreshToken = () => {
    return _getOrSetCookie(config.directus.cookieNameRefreshToken);
  };
  const expires = () => {
    return _getOrSetCookie("directus_token_expired_at");
  };
  const refreshTokens = async () => {
    if (refreshToken() && refreshToken().value) {
      const body = {
        refresh_token: refreshToken().value
      };
      const data = await $fetch("/auth/refresh", {
        baseURL: baseUrl,
        body,
        method: "POST"
      });
      expires().value = (/* @__PURE__ */ new Date()).getTime() + data.data.expires;
      token().value = data.data.access_token;
      refreshToken().value = data.data.refresh_token;
      return data.data;
    } else {
      return null;
    }
  };
  const token_expires_in = computed(() => Math.max(0, (expires().value ?? 0) - (/* @__PURE__ */ new Date()).getTime()));
  const token_expired = computed(() => !token().value || token_expires_in.value === 0);
  const checkAutoRefresh = async () => {
    if (config.directus.autoRefresh) {
      if (token_expired.value) {
        try {
          await refreshTokens();
        } catch (e) {
          refreshToken().value = null;
          if (config.directus.onAutoRefreshFailure) {
            await config.directus.onAutoRefreshFailure();
          }
        }
      }
    }
  };
  return {
    token: token(),
    refreshToken: refreshToken(),
    expires: expires(),
    token_expires_in,
    token_expired,
    refreshTokens,
    checkAutoRefresh
  };
};
