import type { DirectusThumbnailOptions, DirectusFileRequest, ArrayOfOrSingle } from '../types/index.js';
export declare const useDirectusFiles: () => {
    getFiles: <T>(data: DirectusFileRequest) => Promise<T[]>;
    getThumbnail: (fileId: string, options?: DirectusThumbnailOptions) => string;
    uploadFiles: (fileData: any, options?: any) => Promise<any>;
    deleteFiles: (fileId: ArrayOfOrSingle<string>) => Promise<void>;
};
