import { DirectusAuthResponse } from '../types';
export declare const useDirectusToken: () => {
    token: CookieRef<string | null>;
    refreshToken: CookieRef<string | null>;
    expires: CookieRef<number | null>;
    token_expires_in: import("vue").ComputedRef<number>;
    token_expired: import("vue").ComputedRef<boolean>;
    refreshTokens: () => Promise<DirectusAuthResponse | null>;
    checkAutoRefresh: () => Promise<void>;
};
