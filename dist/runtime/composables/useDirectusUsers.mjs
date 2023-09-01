import { useDirectus } from "./useDirectus.mjs";
export const useDirectusUsers = () => {
  const directus = useDirectus();
  const getUsers = async (data) => {
    if (data?.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data?.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const users = await directus("/users", {
      method: "GET",
      params: data?.params
    });
    if (users?.meta) {
      return { meta: users.meta, data: users.data };
    } else {
      return users?.data;
    }
  };
  const getUserById = async (data) => {
    if (data.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const user = await directus(`/users/${data.id}`, {
      method: "GET",
      params: data.params
    });
    return user.data;
  };
  const createUsers = async (data) => {
    const users = await directus("/users", {
      method: "POST",
      body: data.users
    });
    return users.data;
  };
  const deleteUsers = async (data) => {
    await directus("/users", {
      method: "DELETE",
      body: data.users
    });
  };
  const updateUser = async (data) => {
    const user = await directus(`/users/${data.id}`, {
      method: "PATCH",
      body: data.user
    });
    return user.data;
  };
  return {
    getUsers,
    getUserById,
    createUsers,
    deleteUsers,
    updateUser
  };
};
