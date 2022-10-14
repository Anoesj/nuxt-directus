import { useRuntimeConfig } from "#app";
export const useDirectusUrl = () => {
  const config = useRuntimeConfig();
  return config.directus.url;
};
