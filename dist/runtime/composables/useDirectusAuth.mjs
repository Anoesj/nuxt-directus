import { useRuntimeConfig } from "#app";
import { useDirectus } from "./useDirectus.mjs";
import { useDirectusUser } from "./useDirectusUser.mjs";
import { useDirectusUrl } from "./useDirectusUrl.mjs";
import { useDirectusToken } from "./useDirectusToken.mjs";
export const useDirectusAuth = () => {
  const url = useDirectusUrl();
  const config = useRuntimeConfig();
  const directus = useDirectus();
  const user = useDirectusUser();
  const token = useDirectusToken();
  const setToken = (value) => {
    token.value = value;
  };
  const setUser = (value) => {
    user.value = value;
  };
  const fetchUser = async () => {
    if (token.value) {
      try {
        if (config.directus.fetchUserParams?.filter) {
          config.directus.fetchUserParams.filter = JSON.stringify(
            config.directus.fetchUserParams.filter
          );
        }
        if (config.directus.fetchUserParams?.deep) {
          config.directus.fetchUserParams.deep = JSON.stringify(
            config.directus.fetchUserParams.deep
          );
        }
        if (config.directus.fetchUserParams) {
          const res = await directus("/users/me", {
            params: config.directus.fetchUserParams
          });
          setUser(res.data);
        } else {
          const res = await directus("/users/me");
          setUser(res.data);
        }
      } catch (e) {
        setToken(null);
      }
    }
    return user;
  };
  const login = async (data) => {
    setToken(null);
    const response = await directus("/auth/login", {
      method: "POST",
      body: data
    });
    if (!response.data.access_token) {
      throw new Error("Login failed, please check your credentials.");
    }
    setToken(response.data.access_token);
    const user2 = await fetchUser();
    return {
      user: user2.value,
      access_token: response.data.access_token,
      expires: response.data.expires
    };
  };
  const createUser = async (data) => {
    return await directus("/users", {
      method: "POST",
      body: data
    });
  };
  const requestPasswordReset = async (data) => {
    await directus("/auth/password/request", {
      method: "POST",
      body: data
    });
  };
  const resetPassword = async (data) => {
    await directus("/auth/password/reset", {
      method: "POST",
      body: data
    });
  };
  const logout = async () => {
    setToken(null);
    setUser(null);
    await fetchUser();
  };
  return {
    setToken,
    setUser,
    fetchUser,
    login,
    requestPasswordReset,
    resetPassword,
    logout,
    createUser,
    register: createUser
  };
};
