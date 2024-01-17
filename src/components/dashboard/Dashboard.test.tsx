import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { authSlice } from '../../store/auth-store';
import { linksSlice } from '../../store/link-store';
import { render, screen } from '@testing-library/react';
import { Store, AnyAction, configureStore, createSlice } from '@reduxjs/toolkit';

const LinksMockState = {
    links: [],
    loading: false
};

const AuthMockState = {
    user: {
        email: "siskoftn@gmail.com",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/link-sharing-183d2.appspot.com/o/profile%2Fsiskoftn%40gmail.com%2FprofileImage?alt=media&token=4811cd55-3d41-4c43-ad70-52d868df558d",
        displayName: "Daniel Sisovic"
    },
    loading: true
};

const store = configureStore({
    reducer: {
        auth: createSlice({
            name: 'auth',
            initialState: AuthMockState,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reducers: (authSlice as any).reducers
        }).reducer,
        list: createSlice({
            name: 'links',
            initialState: LinksMockState,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reducers: (linksSlice as any).reducers
        }).reducer
    },
})

const ReduxProvider = ({ children, reduxStore }: { children: React.ReactNode, reduxStore: Store<unknown, AnyAction> }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

describe('Dashboard component', () => {
    it('should render initial state', () => {
        render(<MemoryRouter><ReduxProvider reduxStore={store}><Dashboard /></ReduxProvider></MemoryRouter>);

        const navLinkElement = screen.getByTestId('link-nav');

        expect(navLinkElement).toBeVisible();
    });
});