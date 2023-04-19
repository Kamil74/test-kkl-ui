import {render, screen} from '@testing-library/react';
import App from './App';

jest.mock("./pages", () => ({Login: () => <div data-testid="mock-login"></div>}));
jest.mock("shared/modals", () => ({
    Snackbar: () => <div data-testid="mock-snackbar"></div>,
    Loader: () => <div data-testid="mock-loader"></div>,
}));

test('renders', () => {
    render(<App />);
    expect(screen.getByTestId('mock-login')).toBeInTheDocument();
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
    jest.resetAllMocks()
});
