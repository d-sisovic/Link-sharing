import Login from './Login';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const initialFormValues = { email: "siskoftn@gmail.com", password: "Password123" };

vi.mock('react-hook-form', () => ({
    ...vi.importActual('react-hook-form'),
    useForm: vi.fn().mockReturnValue({
        register: vi.fn(),
        handleSubmit: vi.fn(),
        formState: { errors: {}, isValid: true },
        getValues: vi.fn((keysToValue?: Array<'email' | 'password'>) =>
            keysToValue?.length ? keysToValue.map(key => initialFormValues[key]) : initialFormValues)
    })
}));

describe('Login component', () => {
    beforeEach(() => render(<MemoryRouter><Login /></MemoryRouter>))

    it('should render login page', () => {
        const loginHeaderElement = screen.getByTestId('login-title');

        expect(loginHeaderElement).toBeVisible();
    });

    it('should have enabled button, if all fields are valid', () => {
        const buttonElement = screen.getByTestId('button');

        expect(buttonElement).not.toBeDisabled();
    });
});