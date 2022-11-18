import type { Ref } from 'vue';
import type { DirectusAuthResponse, DirectusAuthCredentials, DirectusUser, DirectusPasswordForgotCredentials, DirectusPasswordResetCredentials, DirectusRegisterCredentials } from '../types';
export declare const useDirectusAuth: <User = DirectusUser>() => {
    setToken: (value: string | null) => void;
    setUser: (value: User) => void;
    fetchUser: () => Promise<Ref<User>>;
    login: (data: DirectusAuthCredentials) => Promise<DirectusAuthResponse<User>>;
    requestPasswordReset: (data: DirectusPasswordForgotCredentials) => Promise<void>;
    resetPassword: (data: DirectusPasswordResetCredentials) => Promise<void>;
    logout: () => Promise<void>;
    createUser: (data: DirectusRegisterCredentials) => Promise<User>;
    register: (data: DirectusRegisterCredentials) => Promise<User>;
};
