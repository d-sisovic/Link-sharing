import ProfileForm from './ProfileForm';
import { render, screen } from '@testing-library/react';

const formStateHandler = vi.fn();

const user = {
    displayName: 'Daniel Sisovic',
    email: 'siskoftn@gmail.com'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('ProfileForm component', () => {
    it('should render initial state', () => {
        render(<ProfileForm user={user} formStateHandler={formStateHandler}></ProfileForm>);

        const testInputElements = screen.getAllByTestId('test-input');

        expect(testInputElements).toHaveLength(3);
    });
}); 