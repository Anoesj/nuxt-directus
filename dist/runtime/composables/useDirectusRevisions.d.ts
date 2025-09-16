import type { DirectusQueryParams } from '../types/index.js';
export declare const useDirectusRevisions: () => {
    getRevisionById: <T>(data: {
        id: number;
        params: DirectusQueryParams;
    }) => Promise<T[]>;
    getRevisions: <T>(data: {
        params: DirectusQueryParams;
    }) => Promise<T[]>;
};
