import {fireEvent, render, screen} from '@testing-library/react';
import { Snackbar } from './Snackbar';
import { snackbarStore } from './snackbarStore';
jest.mock('@mui/material', () => ({
    Snackbar: ({ open, onClose, children, TransitionComponent }) => (
        <div data-testid="mock-snackbar" data-open={open}>
            {TransitionComponent && <TransitionComponent />}
            {children}
            <button onClick={onClose} data-testid="close-btn" />
        </div>
    ),
    Alert: ({ severity, onClose, children }) => (
        <div data-testid="mock-alert" data-severity={severity}>
            {children}
            <button onClick={onClose} data-testid="alert-close-btn" />
        </div>
    ),
    Slide: ({ children }) => <div data-testid="mock-slide">{children}</div>
}));

describe('Snackbar', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render the snackbar when open', () => {
        snackbarStore.setState({ isOpen: true, message: 'Test Message', severity: 'success' });
        render(<Snackbar />);
        const snackbar = screen.getByTestId('mock-snackbar');
        const alert = screen.getByTestId('mock-alert');
        const slide = screen.getByTestId('mock-slide');
        expect(snackbar).toHaveAttribute('data-open', 'true');
        expect(alert).toHaveAttribute('data-severity', 'success');
        expect(alert).toHaveTextContent('Test Message');
        expect(slide).toBeInTheDocument();
    });

    test('should not render the snackbar when closed', () => {
        snackbarStore.setState({ isOpen: false, message: null, severity: null });
        render(<Snackbar />);
        const snackbar = screen.getByTestId('mock-snackbar');
        expect(snackbar).toHaveAttribute('data-open', 'false');
    });

    test('should close the snackbar when close button is clicked', () => {
        snackbarStore.setState({ isOpen: true, message: 'Test Message', severity: 'success' });
        render(<Snackbar />);
        const closeBtn = screen.getByTestId('close-btn');
        fireEvent.click(closeBtn);
        const snackbar = screen.getByTestId('mock-snackbar');
        expect(snackbar).toHaveAttribute('data-open', 'false');
    });

    test('should close the snackbar when alert close button is clicked', () => {
        snackbarStore.setState({ isOpen: true, message: 'Test Message', severity: 'success' });
        render(<Snackbar />);
        const closeBtn = screen.getByTestId('alert-close-btn');
        fireEvent.click(closeBtn);
        const snackbar = screen.getByTestId('mock-snackbar');
        expect(snackbar).toHaveAttribute('data-open', 'false');
    });
});
