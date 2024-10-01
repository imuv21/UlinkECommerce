import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


//  create a async thunk
export const getBuyerList = createAsyncThunk(
    'buyerList/getBuyerList'
    , async ({userType = 'BUYER', page = 0, pageSize = 10},{ getState, rejectWithValue}) => {
        try {
            const {auth: {token: authToken}}= getState();
            const response = await axios.get(`${BASE_URL}/admin/get-user`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                params: {
                    userType, page,  pageSize
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
        data: [],
        status: 'idle',
        message: '',
        error: null,
        currentPage: 0,
        totalItems: 0,
        totalPages: 1,
        pageSize: 10
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
            const fetchedData = action.payload.data.data; 
            state.data = fetchedData; 
            state.currentPage = action.payload.data.currentPage; 
            state.totalItems = action.payload.data.totalItems; 
            state.totalPages = action.payload.data.totalPages; 
            state.pageSize = action.payload.data.pageSize; 
            state.message = 'Buyer list fetched successfully';
            state.error = null;
         
        })
        
        .addCase(getBuyerList.rejected, (state, action) => {
            state.status ='failed' ;
            state.message = 'Buyer list fetched failed';
            state.error = action.payload || action.error.message;
        })
    }
})
export default buyerListSlice.reducer;