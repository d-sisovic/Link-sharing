import Profile from './Profile';
import { Provider } from 'react-redux';
import { authSlice } from '../../store/auth-store';
import { linksSlice } from '../../store/link-store';
import { RoutePaths } from '../../ts/enums/rout-paths.enum';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { AvailablePlatform } from '../../ts/enums/available-platform.enum';

export const LinksMockState = {
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
    tags: ['autodocs'],
    title: 'Profile',
    component: Profile,
    decorators: [(story) =>
        <MemoryRouter initialEntries={[`/${RoutePaths.PROFILE}`]}>
            <Routes>
                <Route path={RoutePaths.PROFILE} element={story()} />
            </Routes>
        </MemoryRouter>],
    excludeStories: /.*(?:AuthMockState|LinksMockState)$/,
}

export const ProfileInitialState = {
    decorators: [(story) => <MockStore authState={AuthMockState} linksState={LinksMockState}>{story()}</MockStore>]
}