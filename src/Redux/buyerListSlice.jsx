import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//  create a async thunk
export const getBuyerList = createAsyncThunk(
    'buyerList/getBuyerList'
    , async (_, { getState, rejectWithValue}) => {
        try {
            const {auth: {token: authToken}}= getState();
            const response = await axios.get(`${BASE_URL}/admin/get-user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                }
            });
            console.log(response.data)
            return response.data;

        } catch (error) {
           const errorMessage = error.response?.data?.message || error.message;
            return rejectWithValue(errorMessage);
        }
    }
)
const buyerListSlice = createSlice({
    name: 'buyerList',
    initialState: {
        data: null,
        status: 'idle',
        message: '',
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBuyerList.pending, (state) => {
            state.status = 'loading';
            state.message = 'Buyer list loading...';
            state.error = null;
            console.log('Buyer list is loading');
        })
        .addCase(getBuyerList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log('Data fetched:', action.payload.data)
            state.data = action.payload.data;
            //  fetched data is successfully
         
            state.message = 'Buyer list is fetching successfullly';
            state.error = null;
            console.log('Buyer list fetched successfully')
        })
        .addCase(getBuyerList.rejected, (state, action) => {
            state.status ='failed' ;
            state.message = 'Buyer list fetched failed';
            state.error = action.payload || action.error.message;
        })
    }
})
export default buyerListSlice.reducer;