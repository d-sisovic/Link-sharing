import Register from './Register';
import { MemoryRouter } from 'react-router';
import { render, screen} from '@testing-library/react';

const initialFormValues = { email: "siskoftn@gmail.com", password: "Password123", confirmPassword: "Password123" };

vi.mock('react-hook-form', () => ({
    ...vi.importActual('react-hook-form'),
    useForm: vi.fn().mockReturnValue({
        register: vi.fn(),
        handleSubmit: vi.fn(),
        formState: { errors: {}, isValid: true },
        getValues: vi.fn((keysToValue?: Array<'email' | 'password' | 'confirmPassword'>) =>
            keysToValue?.length ? keysToValue.map(key => initialFormValues[key]) : initialFormValues)
    })
}));

describe('Register component', () => {
    it('should render initial state', () => {
        render(<MemoryRouter><Register></Register></MemoryRouter>);

        const createAccountElement = screen.getByText('Create account');

        expect(createAccountElement).toBeVisible();
    });

    it('should have enabled button, if all fields are valid', () => {
        render(<MemoryRouter><Register></Register></MemoryRouter>);

        const buttonElement = screen.getByTestId('button');

        expect(buttonElement).not.toBeDisabled();
    });
});