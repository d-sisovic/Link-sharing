import { Provider } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import { authSlice } from '../../store/auth-store';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const AuthMockState = {
    user: {
        email: "siskoftn@gmail.com",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d",
        displayName: "Daniel Sisovic"
    },
    loading: true
};

export const AuthMockLoadedState = {
    ...AuthMockState,
    loading: false
};

const MockAuthStore = ({ authState, children }) => (
    <Provider
        store={configureStore({
            reducer: {
                auth: createSlice({
                    name: 'auth',
                    initialState: authState,
                    reducers: authSlice.reducers
                }).reducer
            },
        })}>
        {children}
    </Provider>
);

export default {
    title: 'PrivateRoute',
    tags: ['Components'],
    component: PrivateRoute,
    decorators: [(story) => <MemoryRouter initialEntries={['/3vNmzdhynOPjGkdRde3fZRRc1043']}>
        <Routes>
            <Route path="/:id" element={story()} />
        </Routes>
    </MemoryRouter>],
    excludeStories: /.*(?:AuthMockState|AuthMockLoadedState)$/,
};

export const PrivateRouteWhileLoading = {
    decorators: [(story) => <MockAuthStore authState={AuthMockState}>{story()}</MockAuthStore>]
};

export const PrivateRouteLoaded = {
    args: {
        component: <p>Loaded component</p>
    },
    decorators: [(story) => <MockAuthStore authState={AuthMockLoadedState}>{story()}</MockAuthStore>]
};