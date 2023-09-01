import type { DirectusCollections, DirectusCollectionCreation, DirectusCollectionUpdate, DirectusCollectionInfo } from '../types';
export declare const useDirectusCollections: <Collections extends DirectusCollections>() => {
    getCollections: () => Promise<DirectusCollectionInfo<Collections>[keyof Collections][]>;
    getCollection: <C extends keyof Collections>(collection: C) => Promise<DirectusCollectionInfo<Collections>[C]>;
    createCollection: <D extends DirectusCollectionCreation>(data: D) => Promise<D>;
    updateCollection: <C_1 extends keyof Collections, D_1 extends DirectusCollectionUpdate<Collections, C_1>>(collection: C_1, data: D_1) => Promise<D_1>;
    deleteCollection: <C_2 extends keyof Collections>(collection: C_2) => Promise<void>;
};
