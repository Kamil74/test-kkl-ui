import {getCustomError} from './getCustomError';
import { getError } from './getError';
jest.mock('./getCustomError');
describe('getError', () => {
    it('returns the correct error message', async () => {
        const response = new Response(JSON.stringify({ message: 'Test error' }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-type': 'application/json' },
        });
        const error = await getError(response);
        expect(error).toBe('Test error');
    });

    it('returns the first error if errors is an array', async () => {
        const expectedError = 'First error';
        const response = new Response(
            JSON.stringify({ errors: [expectedError, 'Second error'] }),
            {
                status: 400,
                statusText: 'Bad Request',
                headers: { 'Content-type': 'application/json' },
            }
        );
        (getCustomError as jest.Mock).mockImplementation((errors) =>
            errors === (response as any).errors ? expectedError : null);
        const error = await getError(response);
        expect(error).toBe('First error');
    });

    it('returns origin error from title', async () => {
        const expectedError = 'First error';
        const response = new Response(
            JSON.stringify({ title: expectedError }),
            {
                status: 400,
                statusText: 'Bad Request',
                headers: { 'Content-type': 'application/json' },
            }
        );
        (getCustomError as jest.Mock).mockReturnValue(null);
        const error = await getError(response);
        expect(error).toBe('First error');
    });
    it('returns origin error from message', async () => {
        const expectedError = 'First error';
        const response = new Response(
            JSON.stringify({ message: expectedError }),
            {
                status: 400,
                statusText: 'Bad Request',
                headers: { 'Content-type': 'application/json' },
            }
        );
        (getCustomError as jest.Mock).mockReturnValue(null);
        const error = await getError(response);
        expect(error).toBe('First error');
    });

    it('getError returns origin error from message', async () => {
        const expectedError = 'First error';
        const response = new Response(
            JSON.stringify({ error: {message: expectedError} }),
            {
                status: 400,
                statusText: 'Bad Request',
                headers: { 'Content-type': 'application/json' },
            }
        );
        (getCustomError as jest.Mock).mockReturnValue(null);
        const error = await getError(response);
        expect(error).toBe('First error');
    });

    it('returns the custom error message', async () => {
        const response = new Response(JSON.stringify({ errors: ['some-error'] }), {
            status: 400,
            statusText: 'Bad Request',
        });
        jest.mock('./getCustomError');
        (getCustomError as jest.Mock).mockReturnValue('Custom error message');

        const error = await getError(response);

        expect(error).toEqual('Custom error message');
        expect(getCustomError).toHaveBeenCalledWith(['some-error']);
    });

    it('returns a generic error message if response.json() throws an error', async () => {
        const response = new Response('Some error message', {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-type': 'text/plain' },
        });
        const error = await getError(response);
        expect(error).toBe('500 - Internal Server Error');
    });
});
