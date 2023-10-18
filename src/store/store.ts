import listReducer from "./link-store";
import authReducer from "./auth-store";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    list: listReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;