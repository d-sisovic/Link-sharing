import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';
import ErrorBoundaryComponent from './ErrorBoundaryComponent';

describe('Error boundary component', () => {
    it('render initial state', () => {
        render(<MemoryRouter><ErrorBoundaryComponent></ErrorBoundaryComponent></MemoryRouter>);

        const headerTitle = screen.getByText('Unexpected Error');

        expect(headerTitle).toBeVisible();
    });
});