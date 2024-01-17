import Profile from './Profile';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { Store, AnyAction, configureStore, createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
    loading: false,
    user: {
        email: 'siskoftn@gmail.com',
        photoURL: "https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d",
        displayName: 'Daniel Sisovic'
    }
};

const initialLinksState = {
    loading: false,
    links: []
};

const mockStore = configureStore({
    reducer: {
        auth: createSlice({
            name: 'auth',
            initialState: initialAuthState,
            reducers: {}
        }).reducer,
        list: createSlice({
            name: 'links',
            initialState: initialLinksState,
            reducers: {}
        }).reducer
    },
});

const ReduxProvider = ({ reduxStore, children }: { children: React.ReactNode, reduxStore: Store<unknown, AnyAction> }) => (
    <Provider store={reduxStore}>{children}</Provider>
);

describe('Profile component', () => {
    it('should render initial state', () => {
        render(<ReduxProvider reduxStore={mockStore}><Profile /></ReduxProvider>);

        const profileDetailElement = screen.getByText('Profile Details');

        expect(profileDetailElement).toBeVisible();
    });
}); 