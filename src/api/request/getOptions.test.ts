import {getOptions} from "./getOptions";

describe('getOptions', () => {
    test('should return GET request options for DOWNLOAD method', () => {
        const options = getOptions('DOWNLOAD');
        expect(options).toMatchObject({
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });
    });

    test('should return POST request options for UPLOAD method', () => {
        const options = getOptions('UPLOAD', undefined, { file: 'someFile' });
        expect(options).toMatchObject({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ file: 'someFile' }),
        });
    });

    test('should return default request options for unknown method', () => {
        const options = getOptions('UNKNOWN_METHOD' as any);
        expect(options).toMatchObject({
            method: 'UNKNOWN_METHOD',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    });

    test('should include signal in options', () => {
        const abortController = new AbortController();
        const options = getOptions('GET', abortController.signal);
        expect(options.signal).toBe(abortController.signal);
    });

    test('should include body in options', () => {
        const options = getOptions('POST', undefined, { id: 1, name: 'test' });
        expect(options.body).toEqual(JSON.stringify({ id: 1, name: 'test' }));
    });
});
