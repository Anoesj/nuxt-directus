import type { DirectusThumbnailOptions, DirectusFileRequest } from '../types';
export declare const useDirectusFiles: () => {
    getFiles: <T>(data: DirectusFileRequest) => Promise<T[]>;
    getThumbnail: (fileId: string, options?: DirectusThumbnailOptions) => string;
};
