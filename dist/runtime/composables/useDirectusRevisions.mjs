import { useDirectus } from "./useDirectus.mjs";
export const useDirectusRevisions = () => {
  const directus = useDirectus();
  const getRevisions = async (data) => {
    if (data.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const revisions = await directus("/revisions", {
      method: "GET",
      params: data.params
    });
    return revisions.data;
  };
  const getRevisionById = async (data) => {
    const revisions = await directus(
      `/revisions/${data.id}`,
      {
        method: "GET",
        params: data.params
      }
    );
    return revisions.data;
  };
  return {
    getRevisionById,
    getRevisions
  };
};
