import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { useDirectusToken } from "./composables/useDirectusToken.js";
import { useDirectusUser } from "./composables/useDirectusUser.js";
import { useDirectusAuth } from "./composables/useDirectusAuth.js";
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const { fetchUser } = useDirectusAuth();
  const { token, checkAutoRefresh } = useDirectusToken();
  const user = useDirectusUser();
  async function checkIfUserExists() {
    if (config.public.directus.autoFetch) {
      if (!user.value && token.value) {
        await fetchUser();
      }
    }
  }
  await checkAutoRefresh();
  await checkIfUserExists();
  nuxtApp.hook("page:start", async () => {
    if (import.meta.client) {
      await checkAutoRefresh();
      await checkIfUserExists();
    }
  });
});
