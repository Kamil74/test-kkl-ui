import { snackbarStore } from './snackbarStore';

describe('snackbarStore', () => {
    it('should set the message, severity, and isOpen properties', () => {
        const message = 'Test message';
        const severity = 'any' as any;

        snackbarStore.getState().open(message, severity);

        expect(snackbarStore.getState().message).toBe(message);
        expect(snackbarStore.getState().severity).toBe(severity);
        expect(snackbarStore.getState().isOpen).toBe(true);
    });

    it('should set the isOpen property to false when calling the close function', () => {
        snackbarStore.getState().close();

        expect(snackbarStore.getState().isOpen).toBe(false);
    });
});
