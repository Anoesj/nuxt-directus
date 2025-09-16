import type { DirectusQueryParams, DirectusNotificationObject } from '../types/index.js';
export declare const useDirectusNotifications: () => {
    getNotifications: <T>(data: {
        params: DirectusQueryParams;
    }) => Promise<T[]>;
    getNotificationByKey: <T>(data: {
        id: number;
        params: DirectusQueryParams;
    }) => Promise<T[]>;
    createNotification: <T>(data: {
        notification: DirectusNotificationObject;
    }) => Promise<T[]>;
    deleteNotification: (data: {
        notifications: Array<string> | string;
    }) => Promise<void>;
};
