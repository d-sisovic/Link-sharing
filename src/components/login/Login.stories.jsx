import Login from './Login';
import { RoutePaths } from '../../ts/enums/rout-paths.enum';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    tags: ['autodocs'],
    title: 'Login',
    component: Login,
    decorators: [(story) =>
        <MemoryRouter initialEntries={[`/${RoutePaths.LOGIN}`]}>
            <Routes>
                <Route path={RoutePaths.LOGIN} element={story()} />
            </Routes>
        </MemoryRouter>]
}

export const RegisterInitialState = {
    args: {}
}