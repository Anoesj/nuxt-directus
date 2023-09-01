import { useDirectus } from "./useDirectus.mjs";
export const useDirectusItems = () => {
  const directus = useDirectus();
  async function getItems(collection, data) {
    if (data?.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data?.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const items = await directus(`/items/${collection}`, {
      method: "GET",
      params: data?.params
    });
    if ("meta" in items) {
      return { meta: items.meta, data: items.data };
    } else {
      return items.data;
    }
  }
  async function getSingletonItem(collection, data) {
    if (data?.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data?.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const item = await directus(`/items/${collection}`, {
      method: "GET",
      params: data?.params
    });
    return item.data;
  }
  async function getItemById(collection, data) {
    if (data.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const item = await directus(`/items/${collection}/${data.id}`, {
      method: "GET",
      params: data.params
    });
    return item.data;
  }
  async function createItems(collection, data) {
    const items = await directus(`/items/${collection}`, {
      method: "POST",
      body: data.items
    });
    return items.data;
  }
  async function deleteItems(collection, data) {
    await directus(`/items/${collection}`, {
      method: "DELETE",
      body: data.items
    });
  }
  async function updateItem(collection, data) {
    const item = await directus(`/items/${collection}/${data.id}`, {
      method: "PATCH",
      body: data.item
    });
    return item.data;
  }
  return {
    getItems,
    getSingletonItem,
    getItemById,
    createItems,
    deleteItems,
    updateItem
  };
};