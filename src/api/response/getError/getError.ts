import {getCustomError} from "./getCustomError";

export async function getError(response: Response) {
    let error = '';
    try {
        const payload = await response.json();
        error = getCustomError(payload.errors) || getCustomError(payload.errorCodes);
        if (!error) {
            error = payload.title || payload.error?.message || payload.message;
        }
    } catch {
    }
    return error || `${response.status} - ${response.statusText}`;
}
