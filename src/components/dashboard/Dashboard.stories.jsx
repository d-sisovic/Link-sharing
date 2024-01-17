import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import Profile from '../profile/Profile';
import LinkWrapper from '../link/LinkWrapper';
import { authSlice } from '../../store/auth-store';
import { linksSlice } from '../../store/link-store';
import { RoutePaths } from '../../ts/enums/rout-paths.enum';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { AvailablePlatform } from '../../ts/enums/available-platform.enum';

export const LinksMockState = {
    links: [],
    loading: false
};

export const LinksFullMockState = {
    links: [
        {
            id: '1',
            value: 'https://www.linkedin.com/in/daniel-sisovic-0838a617b/',
            index: 0,
            platform: AvailablePlatform.LINKEDIN
        },
        {
            id: '2',
            value: 'https://github.com/d-sisovic',
            index: 1,
            platform: AvailablePlatform.GITHUB
        }
    ],
    loading: false
};

export const AuthMockState = {
    user: {
        email: "siskoftn@gmail.com",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d",
        displayName: "Daniel Sisovic"
    },
    loading: true
};

const MockStore = ({ authState, linksState, children }) => <Provider
    store={configureStore({
        reducer: {
            auth: createSlice({
                name: 'auth',
                initialState: authState,
                reducers: authSlice.reducers
            }).reducer,
            list: createSlice({
                name: 'links',
                initialState: linksState,
                reducers: linksSlice.reducers
            }).reducer
        },
    })}>
    {children}
</Provider>;

export default {
    title: 'Dashboard',
    tags: ['Components'],
    component: Dashboard,
    decorators: [(story) => <MemoryRouter initialEntries={[`/`]}>
        <Routes>
            <Route path={RoutePaths.HOME} element={story()}>
                <Route path={RoutePaths.LINK} element={<LinkWrapper />} />
                <Route path={RoutePaths.PROFILE} element={<Profile />} />
            </Route>
        </Routes>
    </MemoryRouter>],
    excludeStories: /.*(?:AuthMockState|LinksFullMockState|LinksMockState)$/,
};

export const DashboardInitial = {
    decorators: [(story) => <MockStore authState={AuthMockState} linksState={LinksMockState}>{story()}</MockStore>]
};

export const DashboardWithLinks = {
    decorators: [(story) => <MockStore authState={AuthMockState} linksState={LinksFullMockState}>{story()}</MockStore>]
};