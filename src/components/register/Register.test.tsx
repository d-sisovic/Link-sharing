import Register from './Register';
import { MemoryRouter } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('react-hook-form', () => ({
    ...vi.importActual('react-hook-form'),
    useForm: vi.fn().mockReturnValue({
        register: vi.fn(),
        handleSubmit: vi.fn(),
        formState: { errors: {}, isValid: true },
        getValues: vi.fn(() => ({ email: "siskoftn@gmail.com", password: "Password123", confirmPassword: "Password123" }))
    })
}));

describe('Register component', () => {
    beforeEach(() => render(<MemoryRouter><Register></Register></MemoryRouter>));

    it('should render initial state', () => {
        const createAccountElement = screen.getByText('Create account');

        expect(createAccountElement).toBeVisible();
    });

    it('should have enabled button, if all fields are valid', () => {
        const buttonElement = screen.getByTestId('button');

        expect(buttonElement).not.toBeDisabled();
    });

    it('should call button, if all fields are valid and button is clicked', () => {
        const buttonElement = screen.getByTestId('button');
        const spyOnClickHandler = vi.spyOn(Register.prototype, 'onRegister');

        fireEvent(buttonElement, new MouseEvent('click'));

        expect(spyOnClickHandler).toHaveBeenCalledTimes(1);

        spyOnClickHandler.mockRestore();
    });
});