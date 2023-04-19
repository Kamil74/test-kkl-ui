import {getCurrentUser} from "../../shared/services";


export function requestInterceptor(request: Request) {
    const user = getCurrentUser();
    if (user) {
        request.headers.set('Authorization', `Bearer ${user.token}`);
    }
    return request;
}
