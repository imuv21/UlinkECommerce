import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const verifyOtp = createAsyncThunk(
    'otp/verifyOtp',
    async ({ otp, username, role }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/verifyOtp?otp=${otp}&username=${username}&role=${role}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const otpSlice = createSlice({
    name: 'otp',
    initialState: {
        message: '',
        success: false,
        email: '',
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
                state.success = action.payload.success;
                state.email = action.payload.email;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message || 'OTP verification failed';
            });
    },
});

export default otpSlice.reducer;
