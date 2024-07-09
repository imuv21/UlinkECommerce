import { createSlice } from '@reduxjs/toolkit';

const selectedAddressSlice = createSlice({
    name: 'selectedAddress',
    initialState: {
        address: null,
    },
    reducers: {
        setSelectedAddress(state, action) {
            state.address = action.payload;
        },
    },
});

export const { setSelectedAddress } = selectedAddressSlice.actions;
export default selectedAddressSlice.reducer;
