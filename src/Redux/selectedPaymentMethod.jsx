import { createSlice } from '@reduxjs/toolkit';

const selectedPaymentMethodSlice = createSlice({
    name: 'selectedPaymentMethod',
    initialState: {
       paymentMethod : null,
    },
    reducers: {
        setSelectedPaymentMethod(state, action) {
            state.paymentMethod = action.payload;
        },
    },
});

export const { setSelectedPaymentMethod } = selectedPaymentMethodSlice.actions;
export default selectedPaymentMethodSlice.reducer;
