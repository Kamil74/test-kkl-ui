import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
import { loaderStore } from './loaderStore';

const snackbarZIndex = 5;
const primaryColor = 'purple';
jest.mock('@mui/material', () => ({
    Backdrop: ({ open, children, sx }) => {
        for (const key in sx)
            if (typeof sx[key] === 'function')
                sx[key] = sx[key]({
                    zIndex:{snackbar: snackbarZIndex},
                    palette:{primary:{main:primaryColor}}});
        return (
        <div data-testid="mock-backdrop" data-open={open} style={sx}>{children}</div>
    )},
    CircularProgress: () => <div data-testid="mock-circular-progress" />,
}));

describe('Loader', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should render the backdrop when loader is open', () => {
        loaderStore.setState({ isOpen: true });
        render(<Loader />);
        const backdrop = screen.getByTestId('mock-backdrop');
        const circularProgress = screen.getByTestId('mock-circular-progress');
        expect(circularProgress).toBeInTheDocument();
        expect(backdrop).toHaveAttribute('data-open', 'true');
    });

    test('should not render the backdrop when loader is closed', () => {
        loaderStore.setState({ isOpen: false });
        render(<Loader />);
        const backdrop = screen.getByTestId('mock-backdrop');
        expect(backdrop).toHaveAttribute('data-open', 'false');
    });


    test('should receive right color and zIndex', () => {
        loaderStore.setState({ isOpen: true });
        render(<Loader />);
        const backdrop = screen.getByTestId('mock-backdrop');
        expect(backdrop).toHaveStyle({
            zIndex: snackbarZIndex + 1,
            color: primaryColor,
        });
    });
});
