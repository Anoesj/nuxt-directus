import type { DirectusCollections, DirectusCollectionCreation, DirectusCollectionUpdate, DirectusCollectionInfo } from '../types/index.js';
export declare const useDirectusCollections: <Collections extends DirectusCollections>() => {
    getCollections: () => Promise<DirectusCollectionInfo<Collections>[keyof Collections][]>;
    getCollection: <C extends keyof Collections>(collection: C) => Promise<DirectusCollectionInfo<Collections>[C]>;
    createCollection: <D extends DirectusCollectionCreation>(data: D) => Promise<D>;
    updateCollection: <C extends keyof Collections, D extends DirectusCollectionUpdate<Collections, C>>(collection: C, data: D) => Promise<D>;
    deleteCollection: <C extends keyof Collections>(collection: C) => Promise<void>;
};
