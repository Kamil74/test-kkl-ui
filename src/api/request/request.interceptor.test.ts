import {requestInterceptor} from "./request.interceptor";
import * as auth from "shared/services";

jest.mock("shared/services");
describe("requestInterceptor", () => {

    test("should set the authorization token in headers if user is logged in", () => {
        const user = { token: "myToken" } as any;

        jest.spyOn(auth, "getCurrentUser")
            .mockReturnValueOnce(user);
        const request = new Request("http://example.com");

        const result = requestInterceptor(request);

        expect(result.headers.get("Authorization"))
            .toEqual(`Bearer ${user.token}`);
    });

    test("should return the original request if user is not logged in", () => {
        jest.spyOn(auth, "getCurrentUser")
            .mockReturnValueOnce(undefined);
        const request = new Request("http://example.com");

        const result = requestInterceptor(request);

        expect(result).toEqual(request);
    });
});
