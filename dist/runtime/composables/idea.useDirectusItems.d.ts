import type { DirectusCollections, DirectusItemRequest, DirectusItemCreation, DirectusItemDeletion, DirectusItemUpdate, DirectusQueryParams, DirectusQueryParamsMeta } from '../types';
declare type PickAndRequire<T, K extends keyof T> = {
    [P in K]-?: T[P];
};
export declare const useDirectusItems: <Collections = DirectusCollections>() => {
    getItems: {
        <Data extends DirectusItemRequest<Collections> & {
            params: {
                meta: DirectusQueryParams['meta'];
            };
        }>(data: Data): Promise<{
            meta: DirectusQueryParamsMeta;
            data: (Data["params"]["fields"] extends string[] ? PickAndRequire<Collections[Data["collection"]], Extract<keyof Collections[Data["collection"]], Data["params"]["fields"][number]>> : Collections[Data["collection"]])[];
        }>;
        <Data_1 extends DirectusItemRequest<Collections>>(data: Data_1): Promise<(Data_1["params"]["fields"] extends string[] ? PickAndRequire<Collections[Data_1["collection"]], Extract<keyof Collections[Data_1["collection"]], Data_1["params"]["fields"][number]>> : Collections[Data_1["collection"]])[]>;
    };
    getSingletonItem: <Data_2 extends DirectusItemRequest<Collections>>(data: Data_2) => Promise<Collections[Data_2["collection"]]>;
    getItemById: <Data_3 extends DirectusItemRequest<Collections>>(data: Data_3) => Promise<Collections[Data_3["collection"]]>;
    createItems: <Data_4 extends DirectusItemCreation<Collections>>(data: Data_4) => Promise<Collections[Data_4["collection"]][]>;
    deleteItems: <Data_5 extends DirectusItemDeletion<Collections>>(data: Data_5) => Promise<void>;
    updateItem: <Data_6 extends DirectusItemUpdate<Collections>>(data: Data_6) => Promise<Collections[Data_6["collection"]]>;
};
export {};
