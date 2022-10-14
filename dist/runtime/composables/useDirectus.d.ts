import type { FetchOptions } from 'ohmyfetch';
export declare const useDirectus: () => <T>(url: string, fetchOptions?: FetchOptions) => Promise<T>;
