import { useDirectus } from "./useDirectus.mjs";
export const useDirectusNotifications = () => {
  const directus = useDirectus();
  const getNotifications = async (data) => {
    if (data.params?.filter) {
      data.params.filter = JSON.stringify(data.params.filter);
    }
    if (data.params?.deep) {
      data.params.deep = JSON.stringify(data.params.deep);
    }
    const notifications = await directus("/notifications", {
      method: "GET",
      params: data.params
    });
    return notifications.data;
  };
  const getNotificationByKey = async (data) => {
    const notifications = await directus(
      `/notifications/${data.id}`,
      {
        method: "GET",
        params: data.params
      }
    );
    return notifications.data;
  };
  const createNotification = async (data) => {
    const notification = await directus("/notifications", {
      method: "POST",
      body: data.notification
    });
    return notification.data;
  };
  const deleteNotification = async (data) => {
    await directus("/notifications", {
      method: "DELETE",
      body: data.notifications
    });
  };
  return {
    getNotifications,
    getNotificationByKey,
    createNotification,
    deleteNotification
  };
};
