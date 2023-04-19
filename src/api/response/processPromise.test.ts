import {processPromise} from "./processPromise";

describe('processPromise', () => {
    test('should return the response when promise is resolved', async () => {
        const response = new Response();
        const promise = Promise.resolve(response);
        const result = await processPromise(promise);
        expect(result).toBe(response);
    });

    test('should return undefined when promise is aborted', async () => {
        const promise = new Promise<Response>((_, reject) => {
            const error = new Error('Aborted');
            // @ts-ignore
            error.name = 'AbortError';
            reject(error);
        });
        const result = await processPromise(promise);
        expect(result).toBeUndefined();
    });

    test('should throw an error when promise is rejected', async () => {
        const error = new Error('An error occurred');
        const promise = Promise.reject(error);
        await expect(processPromise(promise)).rejects.toThrowError(error);
    });

    test('should throw an error when response is undefined', async () => {
        const promise = Promise.resolve(undefined as unknown as Response);
        await expect(processPromise(promise)).rejects.toThrowError('Response is undefined');
    });
});
