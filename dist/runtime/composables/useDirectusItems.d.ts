import type { DirectusCollections, DirectusItemRequest, DirectusItemCreation, DirectusItemDeletion, DirectusItemUpdate, DirectusQueryParamsMeta } from '../types';
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
        <C_1 extends keyof Collections, D_1 extends DirectusItemRequest<Collections>[C_1]>(collection: C_1, data?: D_1): Promise<Collections[C_1][]>;
    };
    getSingletonItem: <C_2 extends keyof Collections, D_2 extends DirectusItemRequest<Collections>[C_2]>(collection: C_2, data?: D_2) => Promise<Collections[C_2]>;
    getItemById: <C_3 extends keyof Collections, D_3 extends DirectusItemRequest<Collections>[C_3]>(collection: C_3, data: D_3) => Promise<Collections[C_3]>;
    createItems: <C_4 extends keyof Collections, D_4 extends DirectusItemCreation<Collections>[C_4]>(collection: C_4, data: D_4) => Promise<Collections[C_4][]>;
    deleteItems: <C_5 extends keyof Collections, D_5 extends DirectusItemDeletion<Collections>[C_5]>(collection: C_5, data: D_5) => Promise<void>;
    updateItem: <C_6 extends keyof Collections, D_6 extends DirectusItemUpdate<Collections>[C_6]>(collection: C_6, data: D_6) => Promise<Collections[C_6]>;
};
