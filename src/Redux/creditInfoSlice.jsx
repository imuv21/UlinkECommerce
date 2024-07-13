import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateCreditInfo = createAsyncThunk(
    'creditInfo/updateCreditInfo',
    async (creditInfoData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/buyer/update-credit-info`,
                creditInfoData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log("Response data:", response.data)
            return response.data
        }
        catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCreditInfo = createAsyncThunk(
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

const creditInfoSlice = createSlice({
    name: 'creditInfo',
    initialState: {
        credit: null,
        status: 'idle',
        message: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreditInfo.pending, (state) => {
                state.status = 'loading';
                state.message = 'Credit info loading'
                state.error - null
                console.log('credit info loading')
            })
            .addCase(fetchCreditInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.credit = action.payload.credit || action.payload ;
                state.message = 'Credit info fetched successfully';
                state.error = null
                console.log('Credit info fetched successfully')
            })
            .addCase(fetchCreditInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Failed to fetch credit info';
                state.error = action.payload || action.error.message;
                console.log('Credit info fetch failed');
            })
            .addCase(updateCreditInfo.pending, (state) => {
                state.status = 'loading';
                state.message = 'Credit info loading...';
                state.error = null;
                console.log('credit info loading');
            })
            .addCase(updateCreditInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.credit = action.payload.credit || action.payload;
                state.message = 'Credti info updated successfully';
                state.error = null;    
                console.log('Credit info upadated Successfully')
            })
            .addCase(updateCreditInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Failed to update credit info';
                state.error = action.payload || action.error.message;
                console.log('Credit info update failed');
            })
    }
});

export default creditInfoSlice.reducer;
