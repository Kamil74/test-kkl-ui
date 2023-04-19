import {getOptions} from "./getOptions";
import {getUrl} from "./getUrl";
import {MethodTypes} from "../makeRequest";

export function getRequest(url: string, method: MethodTypes, body?: any, signal?: AbortSignal) {
    const options = getOptions(method, signal, body);
    return new Request(getUrl(url), options);
}
