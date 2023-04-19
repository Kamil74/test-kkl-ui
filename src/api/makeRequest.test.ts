import {makeRequest} from "./makeRequest";
import {responseInterceptor} from "./response/response.interceptor";
import {requestInterceptor} from "./request/request.interceptor";
import {getRequest} from "./request";

jest.mock('./response/response.interceptor');
jest.mock('./request/request.interceptor');
jest.mock('./request/getRequest');

describe('makeRequest', () => {
    const responseInterceptorMock = responseInterceptor as jest.MockedFunction<typeof responseInterceptor>;
    const requestInterceptorMock = requestInterceptor as jest.MockedFunction<typeof requestInterceptor>;
    const getRequestMock = getRequest as jest.MockedFunction<typeof getRequest>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should transfer right args', async () => {
        getRequestMock.mockReturnValueOnce("request" as any)
        requestInterceptorMock.mockReturnValueOnce("intercepted-request" as any);
        responseInterceptorMock.mockReturnValueOnce(Promise.resolve("response" as any));
        jest.spyOn(global, 'fetch').mockImplementation(() => "response" as any);

        await makeRequest("url", 'GET', "body", "signal" as any);

        expect(getRequestMock).toHaveBeenCalledWith("url", 'GET', "body", "signal" as any);
        expect(requestInterceptorMock).toHaveBeenCalledWith("request");
        expect(global.fetch).toHaveBeenCalledWith("intercepted-request");
    });

    test("should return json if method is not 'DOWNLOAD'", async () => {
        responseInterceptorMock.mockReturnValueOnce(Promise.resolve({json: () => Promise.resolve("JSON")} as any));
        jest.spyOn(global, 'fetch').mockImplementation(() => "response" as any);

        const result = await makeRequest("url", 'GET', "body", "signal" as any);

        expect(result).toBe("JSON");
    });

    test("should return blob if method is 'DOWNLOAD'", async () => {
        responseInterceptorMock.mockReturnValueOnce(Promise.resolve({blob: () => Promise.resolve("BLOB")} as any));
        jest.spyOn(global, 'fetch').mockImplementation(() => "response" as any);

        const result = await makeRequest("url", 'DOWNLOAD', "body", "signal" as any);

        expect(result).toBe("BLOB");
    });

    test("should return undefined", async () => {
        responseInterceptorMock.mockReturnValueOnce(Promise.resolve(undefined));
        jest.spyOn(global, 'fetch').mockImplementation(() => "response" as any);

        const result = await makeRequest("url", 'DOWNLOAD', "body", "signal" as any);

        expect(result).toBe(undefined);
    });
});
