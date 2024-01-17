import { Provider } from 'react-redux';
import PhoneWrapper from './PhoneWrapper';
import { authSlice } from '../../store/auth-store';
import { linksSlice } from '../../store/link-store';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const LinksMockState = {
    links: [],
    loading: false
};

export const AuthMockState = {
    user: {
        email: "siskoftn@gmail.com",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d",
        displayName: "Daniel Sisovic"
    },
    loading: false
};

const MockStore = ({ children }) => (
    <Provider
        store={configureStore({
            reducer: {
                auth: createSlice({
                    name: 'auth',
                    initialState: AuthMockState,
                    reducers: authSlice.reducers
                }).reducer,
                list: createSlice({
                    name: 'links',
                    initialState: LinksMockState,
                    reducers: linksSlice.reducers
                }).reducer
            },
        })}>
        {children}
    </Provider>
);

export default {
    title: 'Phone',
    tags: ['Components'],
    component: PhoneWrapper,
    parameters: { layout: 'fullscreen' },
    excludeStories: /.*(?:AuthMockState|LinksMockState)$/,
};

export const PhoneInitialOn1440PX = {
    decorators: [(story) => <MockStore>{story()}</MockStore>]
};