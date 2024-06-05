import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateBusinessProfile = createAsyncThunk(
    'businessProfile/update',
    async ({ profileData }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(
                `${BASE_URL}/buyer/update-business-profile`,
                profileData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);

const businessProfileSlice = createSlice({
    name: 'businessProfile',
    initialState: {
        status: 'idle',
        message: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateBusinessProfile.pending, (state) => {
                state.status = 'loading';
                state.message = '';
                state.error = null;
            })
            .addCase(updateBusinessProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(updateBusinessProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.message = '';
                state.error = action.payload || action.error.message;
            });
    },
});

export default businessProfileSlice.reducer;
