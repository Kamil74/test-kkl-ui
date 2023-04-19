import {makeRequest} from "./makeRequest";

interface Api {
    get(url: string, signal: AbortSignal): Promise<any>
    get<T>(url: string, signal: AbortSignal): Promise<T | null | undefined>
    put(url: string, body: any, signal: AbortSignal): Promise<any>
    put<T>(url: string, body: any, signal: AbortSignal): Promise<T | null | undefined>
    post(url: string, body: any, signal?: AbortSignal): Promise<any>;
    post<T>(url: string, body: any, signal?: AbortSignal): Promise<T | null | undefined>
    delete(url: string, signal?: AbortSignal): Promise<any>
    delete<T>(url: string, signal?: AbortSignal): Promise<T | null | undefined>
    download(url: string, signal: AbortSignal): Promise<any>
    download<T>(url: string, signal: AbortSignal): Promise<T | null | undefined>
    upload(url: string, body: any, signal?: AbortSignal): Promise<any>
    upload<T>(url: string, body: any, signal?: AbortSignal): Promise<T | null | undefined>
}
export const api: Api = {
    get: async (url: string, signal: AbortSignal) =>
        await makeRequest(url, 'GET', undefined, signal),
    put: async (url: string, body: any, signal: AbortSignal) =>
        await makeRequest(url, 'PUT', body, signal),
    post: async (url: string, body: any, signal?: AbortSignal) =>
        await makeRequest(url, 'POST', body, signal),
    delete: async (url: string, signal?: AbortSignal) =>
        await makeRequest(url, 'DELETE', undefined, signal),
    download: async (url: string, signal: AbortSignal) =>
        await makeRequest(url, 'DOWNLOAD', undefined, signal),
    upload: async (url: string, body: any, signal?: AbortSignal) =>
        await makeRequest(url, 'UPLOAD', body, signal),
};



