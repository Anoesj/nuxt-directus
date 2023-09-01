import type { NitroFetchOptions } from 'nitropack';
export declare const useDirectus: () => <T>(url: string, fetchOptions?: NitroFetchOptions<string>, useStaticToken?: boolean) => Promise<T>;
