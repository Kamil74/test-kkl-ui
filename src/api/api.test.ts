import { api } from './api';
import { makeRequest } from './makeRequest';

jest.mock('./makeRequest');

describe('api', () => {
    const url = 'http://example.com';
    const body = {data: 'some data'};
    const signal = {data: "signal"} as any;

    beforeEach(() => {
        (makeRequest as jest.MockedFunction<typeof makeRequest>).mockResolvedValueOnce('response');
        jest.clearAllMocks();
    });

    test('should call makeRequest with method GET', async () => {
        const result = await api.get(url, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'GET', undefined, signal);
        expect(result).toEqual('response');
    });

    test('should call makeRequest with method PUT and body', async () => {
        const result = await api.put(url, {...body}, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'PUT', body, signal);
        expect(result).toEqual('response');
    });

    test('should call makeRequest with method DOWNLOAD', async () => {
        const result = await api.download(url, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'DOWNLOAD', undefined, signal);
        expect(result).toEqual('response');
    });

    it('should call makeRequest with method POST and body', async () => {
        const result = await api.post(url, {...body}, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'POST', body, signal);
        expect(result).toEqual('response');
    });

    test('should call makeRequest with method DELETE', async () => {
        const result = await api.delete(url, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'DELETE', undefined, signal);
        expect(result).toEqual('response');
    });

    test('should call makeRequest with method UPLOAD and body', async () => {
        const result = await api.upload(url, {...body}, {...signal});

        expect(makeRequest).toHaveBeenCalledWith(url, 'UPLOAD', body, signal);
        expect(result).toEqual('response');
    });
});
