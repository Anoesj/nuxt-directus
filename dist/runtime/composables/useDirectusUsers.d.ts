import { DirectusUserRequest, DirectusUserCreation, DirectusUserUpdate, DirectusUserDeletion, DirectusItems, DirectusUser } from '../types';
export declare const useDirectusUsers: () => {
    getUsers: <T extends DirectusUser>(data?: DirectusUserRequest) => Promise<DirectusItems<T> | T[]>;
    getUserById: <T_1>(data: DirectusUserRequest) => Promise<T_1>;
    createUsers: <T_2>(data: DirectusUserCreation) => Promise<T_2 | T_2[]>;
    deleteUsers: (data: DirectusUserDeletion) => Promise<void>;
    updateUser: <T_3>(data: DirectusUserUpdate) => Promise<T_3>;
};
