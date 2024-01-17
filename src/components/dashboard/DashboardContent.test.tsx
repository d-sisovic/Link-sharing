import DashboardContent from './DashboardContent';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const FakeComponent = () => <p>Outlet text</p>;

describe('DashboardContent component', () => {
    it('should render what is passed to outlet', () => {
        render(<MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route element={<DashboardContent />}>
                    <Route path="/" element={<FakeComponent />} />
                </Route>
            </Routes>
        </MemoryRouter>);

        const outletTextElement = screen.getByText('Outlet text');

        expect(outletTextElement).toBeVisible();
    });
});