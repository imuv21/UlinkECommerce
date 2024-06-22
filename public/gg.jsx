import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: '',
    message: '',
    signupEmail: null,
    signupData: null,
};

// Create an async thunk for updating user details
export const updateUserDetails = createAsyncThunk(
    'auth/updateUserDetails',
    async ({ profile, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://api.ulinkit.com/api/user/update-details', null, {
                params: { profile },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

// Create the slice
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
                state.user = action.payload.data;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.status = 'error';
                state.message = action.payload || 'Failed to update user details';
            });
    },
});

export const { loginSuccess, loginFailure, signupSuccess, signupFailure, logout } = authSlice.actions;
export default authSlice.reducer;
