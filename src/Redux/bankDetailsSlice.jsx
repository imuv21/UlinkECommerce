import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const addBankDetails = createAsyncThunk(
    'bankDetails/addBankDetails',
    async ({ bankDetails }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/seller/add-bank-details`, bankDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

export const fetchBankDetails = createAsyncThunk(
    'bankDetails/fetchBankDetails',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/seller/get-bank-details`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

export const deleteBankDetails = createAsyncThunk(
    'bankDetails/deleteBankDetails',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`${BASE_URL}/seller/delete-bank-details?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

export const updateBankDetails = createAsyncThunk(
    'bankDetails/updateBankDetails',
    async ({ id, bankDetails }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`${BASE_URL}/seller/update-bank-details`, { id, ...bankDetails }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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


const bankDetailsSlice = createSlice({
    name: 'bankDetails',
    initialState: {
        bankDetails: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(addBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.bankDetails = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(addBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(fetchBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.bankDetails = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(fetchBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(deleteBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(deleteBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.bankDetails = state.bankDetails.filter(bank => bank.id !== action.meta.arg);
                state.message = action.payload.message;
            })
            .addCase(deleteBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(updateBankDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(updateBankDetails.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.bankDetails.findIndex(bank => bank.id === action.meta.arg.id);
                if (index !== -1) {
                    state.bankDetails[index] = action.payload.data;
                }
                state.message = action.payload.message;
            })
            .addCase(updateBankDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            });
    }
});

export default bankDetailsSlice.reducer;
