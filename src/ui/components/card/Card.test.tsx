import Card from './Card';
import { screen, render } from '@testing-library/react';

describe('Card component', () => {
    it('should render initial state', () => {
        render(<Card><h1>Card title</h1></Card>);

        const cardTitleElement = screen.getByText('Card title');

        expect(cardTitleElement).toBeVisible();
    });
});