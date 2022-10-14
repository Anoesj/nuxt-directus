import { useDirectusAuth } from "./composables/useDirectusAuth.mjs";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  if (config.directus.autoFetch) {
    const { fetchUser } = useDirectusAuth();
    await fetchUser();
  }
});
