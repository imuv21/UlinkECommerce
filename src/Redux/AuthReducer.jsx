import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: '',
    message: '',
    signupEmail: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = 'success';
            state.message = action.payload.message;
        },
        loginFailure(state, action) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.status = 'error';
            state.message = action.payload.message;
        },
        signupSuccess(state, action) {
            state.signupEmail = action.payload.email;
            state.status = 'success';
            state.message = action.payload.message;
        },
        signupFailure(state, action) {
            state.status = 'error';
            state.message = action.payload.message;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.status = '';
            state.message = '';
            state.signupEmail = null;
        },
    },
});

export const { loginSuccess, loginFailure, signupSuccess, signupFailure, logout } = authSlice.actions;
export default authSlice.reducer;
