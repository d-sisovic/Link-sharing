import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

describe('NotFoundPage component', () => {
    it('should render initial state', () => {
        render(<MemoryRouter><NotFoundPage></NotFoundPage></MemoryRouter>);

        const pageNotFoundElement = screen.getByText('Page not found');

        expect(pageNotFoundElement).toBeVisible();
    });
});