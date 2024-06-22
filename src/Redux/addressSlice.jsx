import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAddresses = createAsyncThunk(
    'address/getAddresses',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.get(`https://api.ulinkit.com/api/user/get-address`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.data) {
                return response.data.data;
            } else {
                return rejectWithValue('Invalid API response');
            }
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (addressData, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post(`https://api.ulinkit.com/api/user/add-address`, addressData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.status) {
                return response.data.message;
            } else {
                return rejectWithValue('Failed to add address');
            }
        } catch (error) {
            console.error('Add Address Error:', error);
            return rejectWithValue(error.response ? error.response.data : 'Network error');
        }
    }
);

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async ({ id }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.delete(`https://api.ulinkit.com/api/user/delete-address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return id; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async ({ id, formData }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            const response = await axios.post('https://api.ulinkit.com/api/user/update-address', {
                ...formData,
                id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        status: 'idle',
        error: null,
        addAddressStatus: 'idle',
        addAddressError: null,
        deleteAddressStatus: 'idle',
        deleteAddressError: null,
        updateAddressStatus: 'idle',
        updateAddressError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.addresses = action.payload;
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch addresses';
            })
            .addCase(addAddress.pending, (state) => {
                state.addAddressStatus = 'loading';
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.addAddressStatus = 'succeeded';
                state.addresses.push(action.payload); 
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.addAddressStatus = 'failed';
                state.addAddressError = action.payload || 'Failed to add address';
            })
            .addCase(deleteAddress.pending, (state) => {
                state.deleteAddressStatus = 'loading';
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.deleteAddressStatus = 'succeeded';
                state.addresses = state.addresses.filter(address => address.id !== action.payload);
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.deleteAddressStatus = 'failed';
                state.deleteAddressError = action.payload || 'Failed to delete address';
            })
            .addCase(updateAddress.pending, (state) => {
                state.updateAddressStatus = 'loading';
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.updateAddressStatus = 'succeeded';
                const index = state.addresses.findIndex(address => address.id === action.payload.id);
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.updateAddressStatus = 'failed';
                state.updateAddressError = action.payload || 'Failed to update address';
            });
    },
});

export default addressSlice.reducer;
