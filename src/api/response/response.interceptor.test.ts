import {responseInterceptor} from "./response.interceptor";

describe('responseInterceptor', () => {

    test('should return undefined', async () => {
        expect(await responseInterceptor(undefined)).toBeUndefined();
    });

    test('should return null if response status is 204', async () => {
        const result = await responseInterceptor({ status: 204 } as any);
        expect(result).toBeNull();
    });

    test('should return response if status is 200', async () => {
        const expected = { data: 'example data', status: 200 } as any;
        const result = await responseInterceptor(expected as any);
        expect(result).toEqual(expected);
    });

    test('throws error if status is 403', async () => {
        const expected =  { status: 403 } as any;
        jest.spyOn(global, 'alert').mockImplementation(() => {});
        const act = async () => await responseInterceptor(expected as any);
        await expect(act).rejects.toThrowError('403 - undefined');
        expect(global.alert).toHaveBeenCalledWith('Unauthorized access');
    });

    test('throws error if status is 401', async () => {
        const locationAssignMock = jest.fn();
        const origin = window.location;
        // @ts-ignore
        delete window.location;
        // @ts-ignore
        window.location = { assign: locationAssignMock };

        window.location.href = 'any-page';
        const expected =  { status: 401 } as any;
        await responseInterceptor(expected);
        //expect(global.localStorage.clear).toHaveBeenCalled();
        expect(window.location.href).toBe('./');
        window.location = origin;
    });
});
