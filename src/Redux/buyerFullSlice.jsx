import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getBuyerFullDetail = createAsyncThunk(
    'buyerFull/getBuyerFullDetail',
    async({id}, { getState, rejecteWithValue}) => {
      try{
        const {auth: {token: authToken}}= getState();
        const response = await axios.get(`${BASE_URL}/admin/get-user-details?id=${id}`,{
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
        console.log('response', response.data)
        return response.data
      }
    
      catch(error){
        return rejecteWithValue(error.response.data);
      }
    }
)
const buyerFullSlice = createSlice({
    name: 'buyerFull',
    initialState: {
        buyers: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBuyerFullDetail.pending, (state) => {
            state.loading = 'loading...';
            state.error = null
            console.log('buyerFullDetail')
        })
        .addCase(getBuyerFullDetail.fulfilled, (state, action) => {
            state.loading = 'successfully';
            console.log('hey hero:', action.payload.data)
            state.buyers = action.payload.data;
        })
        .addCase(getBuyerFullDetail.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload
            console.log('failed to load full buyer data')
        })
    }
})

export default buyerFullSlice.reducer;

