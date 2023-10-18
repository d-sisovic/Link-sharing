import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../ts/models/user.model';

const initialState = { loading: true, user: null } as { loading: boolean; user: IUser | null };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateProfileURL: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        updateNameEmail: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        setAuth: (state, action) => {
            const { user } = action.payload;

            state.user = user;
            state.loading = false;
        }
    }
});

export const { setAuth, updateNameEmail, updateProfileURL } = authSlice.actions;

export default authSlice.reducer;