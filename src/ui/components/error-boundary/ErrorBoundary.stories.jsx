import { MemoryRouter } from 'react-router-dom';
import ErrorBoundaryComponent from './ErrorBoundaryComponent';

export default {
    tags: ['UI'],
    title: 'ErrorBoundaryComponent',
    component: ErrorBoundaryComponent,
    decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>]
}

export const ErrorBoundaryInitial = {
    args: {}
}