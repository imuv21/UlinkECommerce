import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const uploadBuyerDocument = createAsyncThunk(
    'uploadBuyerDoc/upload',
    async ({ file, docType }, { getState, rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const { auth } = getState();
            const token = auth.token;
            // Debugging: Log the formData and headers
            console.log('Uploading document:', { file, docType });
            console.log('Authorization token:', token);
            const response = await axios.post(
                `${BASE_URL}/buyer/upload-document?docType=${docType}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Response from upload:', response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message || error);
        }
    }
);

export const updateBuyerInfo = createAsyncThunk(
    'uploadBuyerDoc/update',
    async (documentInfo , { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
         

            const response = await axios.post(`${BASE_URL}/buyer/update-doc-data`,
                documentInfo,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type" : "application/json"
                    }
                }
            )
            console.log('response All Data : ', response.data)
            return response.data
        }
        catch (error) {
          console.error('Error Response', error.response?.data || error.message);
          return rejectWithValue(error.response?.data || error.message);

        }
    }
);

export const deleteUploadFile = createAsyncThunk(
    'uploadBuyerDoc/delete',
    async ({ documentPath, filename, filesize, id }, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            // Log the payload
            console.log('Payload:', {
                documentPath,
                filename,
                filesize,
                id
            });
            if(!id){      
            throw new Error('Id is requierd')
            }
            const response = await axios.delete(`${BASE_URL}/user/delete-document`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    documentPath, filename, filesize, id
                }
            });
            console.log('Response from delete file API:', response.data);
            return response.data;
        } catch (error) {
           console.log('Error in deleteUploadFile: ', error)
           if(error.response){
            return rejectWithValue(error.response.data)
           } else if(error.request){
            return rejectWithValue('No response received from server')
           }
           else{
            return rejectWithValue(error.message)
           }
    }
}
);

export const fetchUploadFile = createAsyncThunk(
    'uploadBuyerDoc/fetchUploadfile',
    async (_, {getState, rejectWithValue})=> {
        try{
            const {auth} = getState();
            const token = auth.token;
            const response = await axios.get(`${BASE_URL}/buyer/get-business-profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            )
            return response.data
        }
        catch(error){
            let errorMessage = 'An eroor occured while fetching the upload file';
            if(error.message && error.response.data && error.response.data.message){
                errorMessage = error.response.data.message;
            }
            return rejectWithValue(error.message)
        }
    }
);

const uploadBuyerDocumentSlice = createSlice({
    name: 'uploadBuyerDoc',
    initialState: {
        doc: null,
        status: 'idle',
        message: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadBuyerDocument.pending, (state) => {
                  state.status = 'loading',
                    state.message = "uploading document pending....",
                    state.error = null;
                    console.log('uploading document  pending')
            })
            .addCase(uploadBuyerDocument.fulfilled, (state, action) => {
                state.status = 'Succeeded',
                    state.message = 'Document Uploaded Successfully',
                    state.doc =  action.payload,
                    state.error = null
                    console.log('Document uploaded successfully')
            })
            .addCase(uploadBuyerDocument.rejected, (state, action) => {
                    state.status = 'failed',
                    state.message = 'failed to upload document',
                    state.error = action.payload || action.error.message;
                    console.log('uploading document failed')
            })
            .addCase(fetchUploadFile.pending, (state) => {
                state.status = 'loading',
                    state.message = "fetching document pending....",
                    state.error = null
                    console.log('fetching document  pending')
            })
            .addCase(fetchUploadFile.fulfilled, (state, action) => {
                state.status = 'Succedded',
                    state.message = 'Documentd Fetched Successfully',
                    state.doc =  action.payload.documents,
                    state.error = null
                    console.log('Documentd fetched successfully')
            })
            .addCase(fetchUploadFile.rejected, (state, action) => {
                state.status = 'failed',
                    state.message = action.payload || action.error.message,
                    state.error = action.payload || action.error.message
                    console.log("fetched  fetched failed")
            })
            .addCase(updateBuyerInfo.pending, (state) => {
                state.status = 'loading',
                    state.message = "updating document pending....",
                    state.error = null
            })
            .addCase(updateBuyerInfo.fulfilled, (state, action) => {
                state.status = 'Succedded',
                    state.message = 'Documentd Updated Successfully',
                    state.doc =  action.payload,
                    state.error = null
            })
            .addCase(updateBuyerInfo.rejected, (state, action) => {
                state.status = 'failed',
                    state.message = action.payload|| action.error.message,
                    state.error = action.payload || action.error.message
            })
            .addCase(deleteUploadFile.pending, (state) => {
                state.status = 'loading',
                state.error = null
                console.log('deleting document pending')
            })
            .addCase(deleteUploadFile.fulfilled, (state, action) => {
                state.status = 'Succedded',
                    state.message = 'Documentd Deleted Successfully',
                    state.error = null
                    state.doc =  action.payload,
                    console.log('Documents delted successfully')
            })
            .addCase(deleteUploadFile.rejected, (state, action) => {
                state.status = 'failed',
                state.message = action.payload,
                state.error = action.payload || action.error.message
                console.log('Documents delete failed')
            })
    }
});

export default uploadBuyerDocumentSlice.reducer