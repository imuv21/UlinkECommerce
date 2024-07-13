import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateBusinessProfile = createAsyncThunk(
    'businessProfile/update',
    async (formdata, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(
                `${BASE_URL}/buyer/update-business-profile`,
                formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Response data: ", response.data)
            return response.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue(error.message);
        }
    }
);
export const fetchBusinessProfile = createAsyncThunk(
    'creditInfo/fetchCreditInfo',
    async ({token}, { getState, rejectWithValue }) => {
        try {
            const { auth: { token: authToken } } = getState();
            const response = await axios.get(`${BASE_URL}/buyer/get-business-profile`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            return response.data;
        } 
        catch(error){
            const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
);
const businessProfileSlice = createSlice({
    name: 'businessProfile',
    initialState: {
        profile: null,
        status: 'idle',
        message: '',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBusinessProfile.pending, (state) => {
                state.status = 'loading';
                state.message = 'Business profile loading...';
                state.error = null;
                console.log('fetching business profile...');
            })
            .addCase(fetchBusinessProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload.profile || action.payload; 
                state.message = 'Business profile fetched successfully';
                state.error = null;
                console.log('business profile fetched successfully');
            })
            .addCase(fetchBusinessProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.message = ' Business profile fetch failed';
                state.error = action.payload || action.error.message;
                console.log('business profile fetch failed');
            })
            .addCase(updateBusinessProfile.pending, (state) => {
                state.status = 'loading';
                state.message = 'Business profile updating...';
                state.error = null;
                console.log('updating business profile...');
            })
            .addCase(updateBusinessProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile=  action.payload.profile || action.payload;
                state.message = action.payload.message;
                state.error = null;
                console.log('business profile updated successfully');
            })
            .addCase(updateBusinessProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.message = ' Business profile update failed';
                state.error = action.payload || action.error.message;
                console.log('business profile update failed');
            });
    },
});
export default businessProfileSlice.reducer;
