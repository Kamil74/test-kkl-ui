import {MethodTypes} from "../makeRequest";

export function getOptions(method: MethodTypes, signal?: AbortSignal, body?: any) {
    let contentType = 'application/json';
    if (method === 'DOWNLOAD') {
        method = 'GET';
        contentType = 'application/octet-stream';
    }
    if (method === 'UPLOAD') {
        method = 'POST';
        contentType = 'application/x-www-form-urlencoded';
    }
    const options: RequestInit = {
        method: method,
        headers: {
            'Content-Type': contentType,
        },
        signal
    } as RequestInit;
    if (body) {
        options.body = JSON.stringify(body);
    }
    return options;
}
