import type { DirectusCollections, DirectusItemRequest, DirectusItemCreation, DirectusItemDeletion, DirectusItemUpdate, DirectusQueryParamsMeta } from '../types/index.js';
export declare const useDirectusItems: <Collections extends DirectusCollections>() => {
    getItems: {
        <C extends keyof Collections, D extends DirectusItemRequest<Collections>[C] & {
            params: {
                meta: NonNullable<D["params"]["meta"]>;
            };
        }>(collection: C, data: D): Promise<{
            meta: DirectusQueryParamsMeta;
            data: Collections[C][];
        }>;
        <C extends keyof Collections, D_1 extends DirectusItemRequest<Collections>[C]>(collection: C, data?: D_1): Promise<Collections[C][]>;
    };
    getSingletonItem: <C extends keyof Collections, D_2 extends DirectusItemRequest<Collections>[C]>(collection: C, data?: D_2) => Promise<Collections[C]>;
    getItemById: <C extends keyof Collections, D_3 extends DirectusItemRequest<Collections>[C]>(collection: C, data: D_3) => Promise<Collections[C]>;
    createItems: <C extends keyof Collections, D_4 extends DirectusItemCreation<Collections>[C]>(collection: C, data: D_4) => Promise<Collections[C][]>;
    deleteItems: <C extends keyof Collections, D_5 extends DirectusItemDeletion<Collections>[C]>(collection: C, data: D_5) => Promise<void>;
    updateItem: <C extends keyof Collections, D_6 extends DirectusItemUpdate<Collections>[C]>(collection: C, data: D_6) => Promise<Collections[C]>;
};
