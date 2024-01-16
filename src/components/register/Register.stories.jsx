import Register from './Register';
import { RoutePaths } from '../../ts/enums/rout-paths.enum';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export default {
    tags: ['autodocs'],
    title: 'Register',
    component: Register,
    decorators: [(story) =>
        <MemoryRouter initialEntries={[`/${RoutePaths.REGISTER}`]}>
            <Routes>
                <Route path={RoutePaths.REGISTER} element={story()} />
            </Routes>
        </MemoryRouter>]
}

export const RegisterInitialState = {
    args: {}
}