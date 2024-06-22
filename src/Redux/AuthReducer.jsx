import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateUserDetails = createAsyncThunk(
    'auth/updateUserDetails',
    async (profile, { getState }) => {
        const { auth } = getState();
        const token = auth.token;
        const response = await axios.post(
            `${BASE_URL}/user/update-details`,
            null,
            {
                params: { profile: JSON.stringify(profile) },
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    }
);


const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: '',
    message: '',
    signupEmail: null,
    signupData: null,
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
            state.signupData = action.payload.signupData;
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
    extraReducers: (builder) => {
        builder
            .addCase(updateUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.status = 'success';
                state.message = action.payload.message;
                if (state.user) {
                    state.user.firstname = action.payload.data.firstname;
                    state.user.lastname = action.payload.data.lastname;
                    state.user.wpcountrycode = action.payload.data.wpcountrycode;
                    state.user.whatsappnumber = action.payload.data.whatsappnumber;
                }
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload || 'Failed to update user details';
            });
    },
});

export const { loginSuccess, loginFailure, signupSuccess, signupFailure, logout } = authSlice.actions;
export default authSlice.reducer;

