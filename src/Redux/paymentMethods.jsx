import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


const initialState = {
    loading: false,
    success: false,
    error: null,
    bankDetails: [],
    upiDetails: [],
    cardDetails: [],
};

export const addBankDetailBuyer = createAsyncThunk(
    'paymentMethods/addBankDetailBuyer',
    async ({ details, type }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const endpoint = `${BASE_URL}/buyer/save-payment-method`;

            const response = await axios.post(
                endpoint,
                { ...details, type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Network Error');
        }
    }
);

export const fetchPaymentDetails = createAsyncThunk(
    'paymentMethods/fetchPaymentDetails',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(
                `${BASE_URL}/buyer/get-payment-methods`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Network Error');
        }
    }
);

export const editBankDetailBuyer = createAsyncThunk(
    'paymentMethods/editBankDetailBuyer',
    async ({ details, type }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const endpoint = `${BASE_URL}/buyer/update-payment-methods`;

            const response = await axios.post(
                endpoint,
                { ...details, type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Network Error');
        }
    }
);

export const deletePaymentMethod = createAsyncThunk(
    'paymentMethods/deletePaymentMethod',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const endpoint = `${BASE_URL}/buyer/delete-payment-methods?id=${id}`;

            const response = await axios.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Network Error');
        }
    }
);

const bankSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBankDetailBuyer.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(addBankDetailBuyer.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(addBankDetailBuyer.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(fetchPaymentDetails.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.bankDetails = action.payload.bankDetails || [];
                state.upiDetails = action.payload.upiDetails || [];
                state.cardDetails = action.payload.cardDetails || [];
                state.error = null;
            })
            .addCase(fetchPaymentDetails.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(deletePaymentMethod.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(deletePaymentMethod.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(editBankDetailBuyer.pending, (state) => {
                state.loading = true;
                state.success = false;
                state.error = null;
            })
            .addCase(editBankDetailBuyer.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(editBankDetailBuyer.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export default bankSlice.reducer;
