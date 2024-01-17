import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

export default {
    tags: ['autodocs'],
    title: 'NotFoundPage',
    component: NotFoundPage,
    decorators: [(story) => <MemoryRouter>{story()}</MemoryRouter>]
}

export const NotFoundInitialState = {
    args: {}
}