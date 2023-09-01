import type { Ref } from 'vue';
import type { DirectusAuthCredentials, DirectusAuthResponse, DirectusAcceptInvite, DirectusInviteCreation, DirectusPasswordForgotCredentials, DirectusPasswordResetCredentials, DirectusRegisterCredentials, DirectusUser } from '../types';
export declare const useDirectusAuth: <User = DirectusUser>() => {
    setUser: (value: User) => void;
    fetchUser: (useStaticToken?: boolean) => Promise<Ref<User>>;
    login: (data: DirectusAuthCredentials, useStaticToken?: boolean) => Promise<DirectusAuthResponse>;
    requestPasswordReset: (data: DirectusPasswordForgotCredentials, useStaticToken?: boolean) => Promise<void>;
    resetPassword: (data: DirectusPasswordResetCredentials, useStaticToken?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    createUser: (data: DirectusRegisterCredentials, useStaticToken?: boolean) => Promise<User>;
    register: (data: DirectusRegisterCredentials, useStaticToken?: boolean) => Promise<User>;
    inviteUser: (data: DirectusInviteCreation) => Promise<void>;
    acceptInvite: (data: DirectusAcceptInvite) => Promise<void>;
    loginWithProvider: (provider: string, redirectOnLogin?: string) => Promise<void>;
    setAuthCookies: (_token: string, _refreshToken: string, _expires: number) => void;
};
