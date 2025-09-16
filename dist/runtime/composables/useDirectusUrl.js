import { useRuntimeConfig } from "#app";
import { withoutTrailingSlash } from "ufo";
export const useDirectusUrl = () => {
  const config = useRuntimeConfig();
  const url = config.public.directus.url;
  return withoutTrailingSlash(url);
};
