import { useRoute, useRuntimeConfig, navigateTo } from "#app";
import { useDirectus } from "./useDirectus.js";
import { useDirectusToken } from "./useDirectusToken.js";
import { useDirectusUrl } from "./useDirectusUrl.js";
import { useDirectusUser } from "./useDirectusUser.js";
export const useDirectusAuth = () => {
  const config = useRuntimeConfig();
  const directus = useDirectus();
  const baseUrl = useDirectusUrl();
  const user = useDirectusUser();
  const { token, refreshToken, expires } = useDirectusToken();
  const setAuthCookies = (_token, _refreshToken, _expires) => {
    token.value = _token;
    refreshToken.value = _refreshToken;
    expires.value = _expires;
  };
  const removeTokens = () => {
    token.value = null;
    expires.value = null;
    refreshToken.value = null;
  };
  const setUser = (value) => {
    user.value = value;
  };
  const fetchUser = async (useStaticToken) => {
    if (token.value) {
      try {
        const directusConfig = config.public.directus;
        if (directusConfig.fetchUserParams?.filter) {
          directusConfig.fetchUserParams.filter = JSON.stringify(directusConfig.fetchUserParams.filter);
        }
        if (directusConfig.fetchUserParams?.deep) {
          directusConfig.fetchUserParams.deep = JSON.stringify(directusConfig.fetchUserParams.deep);
        }
        if (directusConfig.fetchUserParams) {
          const res = await directus("/users/me", {
            params: directusConfig.fetchUserParams
          }, useStaticToken);
          setUser(res.data);
        } else {
          const res = await directus("/users/me", {}, useStaticToken);
          setUser(res.data);
        }
      } catch (e) {
        console.error("Couldn't fetch user", e);
      }
    }
    return user;
  };
  const login = async (data, useStaticToken) => {
    removeTokens();
    const response = await $fetch("/auth/login", {
      baseURL: baseUrl,
      body: data,
      method: "POST"
    });
    if (!response.data.access_token) {
      throw new Error("Login failed, please check your credentials.");
    }
    const newExpires = (response.data.expires ?? 0) + (/* @__PURE__ */ new Date()).getTime();
    setAuthCookies(response.data.access_token, response.data.refresh_token, newExpires);
    const user2 = await fetchUser();
    return {
      user: user2.value,
      access_token: response.data.access_token,
      expires: newExpires,
      refresh_token: response.data.refresh_token
    };
  };
  const loginWithLdap = async (data, useStaticToken) => {
    removeTokens();
    const response = await $fetch("/auth/login/ldap", {
      baseURL: baseUrl,
      body: data,
      method: "POST"
    });
    if (!response.data.access_token) {
      throw new Error("LDAP Login failed, please check your credentials.");
    }
    const newExpires = (response.data.expires ?? 0) + (/* @__PURE__ */ new Date()).getTime();
    setAuthCookies(response.data.access_token, response.data.refresh_token, newExpires);
    const user2 = await fetchUser();
    return {
      user: user2.value,
      access_token: response.data.access_token,
      expires: newExpires,
      refresh_token: response.data.refresh_token
    };
  };
  const loginWithProvider = async (provider, redirectOnLogin) => {
    removeTokens();
    const route = useRoute();
    const redirect = `${window.location.origin}${redirectOnLogin ?? route.fullPath}`;
    await navigateTo(`${baseUrl}/auth/login/${provider}?redirect=${encodeURIComponent(redirect)}`, { external: true });
  };
  const createUser = async (data, useStaticToken) => {
    return await directus("/users", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const inviteUser = async (data) => {
    return await directus("/users/invite", {
      method: "POST",
      body: data
    });
  };
  const acceptInvite = async (data) => {
    return await directus("/users/invite/accept", {
      method: "POST",
      body: data
    });
  };
  const requestPasswordReset = async (data, useStaticToken) => {
    await directus("/auth/password/request", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const resetPassword = async (data, useStaticToken) => {
    await directus("/auth/password/reset", {
      method: "POST",
      body: data
    }, useStaticToken);
  };
  const logout = async () => {
    await $fetch("/auth/logout", {
      baseURL: baseUrl,
      body: { refresh_token: refreshToken.value },
      method: "POST"
    });
    removeTokens();
    setUser(null);
    await fetchUser();
  };
  return {
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    // Alias for createUser
    register: createUser,
    inviteUser,
    acceptInvite,
    loginWithProvider,
    setAuthCookies
  };
};
