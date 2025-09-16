import type { DirectusUserRequest, DirectusUserCreation, DirectusUserUpdate, DirectusUserDeletion, DirectusItems, DirectusUser } from '../types/index.js';
export declare const useDirectusUsers: () => {
    getUsers: <T extends DirectusUser>(data?: DirectusUserRequest) => Promise<DirectusItems<T> | T[]>;
    getUserById: <T>(data: DirectusUserRequest) => Promise<T>;
    createUsers: <T>(data: DirectusUserCreation) => Promise<T | T[]>;
    deleteUsers: (data: DirectusUserDeletion) => Promise<void>;
    updateUser: <T>(data: DirectusUserUpdate) => Promise<T>;
};
