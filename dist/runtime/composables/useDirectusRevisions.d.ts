import type { DirectusQueryParams } from '../types';
export declare const useDirectusRevisions: () => {
    getRevisionById: <T>(data: {
        id: number;
        params: DirectusQueryParams;
    }) => Promise<T[]>;
    getRevisions: <T_1>(data: {
        params: DirectusQueryParams;
    }) => Promise<T_1[]>;
};
