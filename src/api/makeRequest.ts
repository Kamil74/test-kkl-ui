import {responseInterceptor} from "./response/response.interceptor";
import {requestInterceptor} from "./request/request.interceptor";
import {getRequest} from "./request";
import {processPromise} from "./response/processPromise";

export type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'DOWNLOAD' | 'UPLOAD';
export async function makeRequest(url: string, method: MethodTypes, body?: any, signal?: AbortSignal) {
    let request = getRequest(url, method, body, signal);
    request = requestInterceptor(request);
    const promise = fetch(request);
    const result = await processPromise(promise);
    const response = await responseInterceptor(result);
    return await getFinalizedResponse(method, response);
}
async function getFinalizedResponse(method: MethodTypes, response?: Response | null) {
    if (!response) {
        return response;
    }
    try {
        if (method === 'DOWNLOAD') {
            return await response.blob()
        }
        return await response.json();
    } catch {
        return response;
    }
}

