import { useRuntimeConfig } from "#app";
import { useDirectusUrl } from "./useDirectusUrl.mjs";
import { useDirectus } from "./useDirectus.mjs";
import { useDirectusToken } from "./useDirectusToken.mjs";
export const useDirectusFiles = () => {
  const config = useRuntimeConfig();
  const directusUrl = useDirectusUrl();
  const directus = useDirectus();
  const { token } = useDirectusToken();
  const getFiles = async (data) => {
    if (data.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const files = await directus("/files/", {
      method: "GET",
      params: data.params
    });
    return files.data;
  };
  const getThumbnail = (fileId, options) => {
    const url = new URL(`${directusUrl}/assets/${fileId}`);
    if (options) {
      if (options.width) {
        url.searchParams.append("width", options.width.toFixed(0));
      }
      if (options.height) {
        url.searchParams.append("height", options.height.toFixed(0));
      }
      if (options.quality) {
        url.searchParams.append("quality", options.quality.toFixed(0));
      }
      if (options.withoutEnlargement) {
        url.searchParams.append("withoutEnlargement", "true");
      }
      if (options.fit) {
        url.searchParams.append("fit", options.fit);
      }
      if (options.format) {
        url.searchParams.append("format", options.format);
      }
      if (options.key) {
        url.searchParams.append("key", options.key);
      }
    }
    if (token && token.value) {
      url.searchParams.append("access_token", token.value);
    } else if (config.public.directus.token) {
      url.searchParams.append("access_token", config.public.directus.token);
    }
    return url.href;
  };
  return { getFiles, getThumbnail };
};
