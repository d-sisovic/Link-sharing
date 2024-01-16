import Button from "./Button";
import { render, screen } from '@testing-library/react';

const clickHandler = vi.fn();

describe('Button component', () => {
    it('should render initial state', () => {
        const label = 'Test button';
        render(<Button disabled={false} outlineMode={false} label={label} clickHandler={clickHandler} ></Button>);

        const labelElement = screen.getByText(label);

        expect(labelElement).toBeVisible();
    });

    it('should be disabled if passed disabled=true', () => {
        const label = 'Test button';
        render(<Button disabled={true} outlineMode={false} label={label} clickHandler={clickHandler} ></Button>);

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toBeDisabled();
    });
});