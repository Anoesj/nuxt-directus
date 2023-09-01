import { useDirectus } from "./useDirectus.mjs";
export const useDirectusCollections = () => {
  const directus = useDirectus();
  async function getCollections() {
    const collectionsInfo = await directus("/collections/", {
      method: "GET"
    });
    return collectionsInfo.data;
  }
  async function getCollection(collection) {
    const collectionInfo = await directus(`/collections/${collection}`, {
      method: "GET"
    });
    return collectionInfo.data;
  }
  async function createCollection(data) {
    const collectionInfo = await directus("/collections", {
      method: "POST",
      body: data
    });
    return collectionInfo.data;
  }
  async function updateCollection(collection, data) {
    const collectionInfo = await directus(`/collections/${collection}`, {
      method: "PATCH",
      body: {
        meta: data.meta
      }
    });
    return collectionInfo.data;
  }
  async function deleteCollection(collection) {
    await directus(`/collections/${collection}`, {
      method: "DELETE"
    });
  }
  return {
    getCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
  };
};
