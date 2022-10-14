import type { DirectusQueryParams, DirectusNotificationObject } from '../types';
export declare const useDirectusNotifications: () => {
    getNotifications: <T>(data: {
        params: DirectusQueryParams;
    }) => Promise<T[]>;
    getNotificationByKey: <T_1>(data: {
        id: number;
        params: DirectusQueryParams;
    }) => Promise<T_1[]>;
    createNotification: <T_2>(data: {
        notification: DirectusNotificationObject;
    }) => Promise<T_2[]>;
    deleteNotification: (data: {
        notifications: Array<string> | string;
    }) => Promise<void>;
};
