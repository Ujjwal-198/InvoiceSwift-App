import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';
import { extractErrorMessage } from '../utils/extractError.js';

export const handleSaveInvoice = createAsyncThunk(
    'invoice/save',
    async (data, { rejectWithValue }) => {
        try {
            const resp = await api.post('/invoice/save', { data });
            return resp.data;
        } catch (err) {
            console.error('Raw save error:', err);
            return rejectWithValue(extractErrorMessage(err));
        }
    }
);

export const handleGetAllInvoices = createAsyncThunk(
    'invoice/getAllInvoices',
    async (_, { rejectWithValue }) => {
        try {
            const result = await api.get('/invoice/getAllInvoices');
            if (!result.data.success) {
                throw new Error(result.data.error?.message || 'Failed to fetch user Invoices');
            }
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || 'Failed to fetch user Invoices');
        }
    }
);

export const handleGetInvoiceByNumber = createAsyncThunk(
    'invoice/getInvoiceByNumber',
    async (invoiceNum, { rejectWithValue }) => {
        try {
            const response = await api.get(`/invoice/${invoiceNum}`);
            if (!response.data.success) {
                throw new Error(response.data.error?.message || 'Failed to fetch invoice');
            }
            const invoiceData = response.data.data;

            if (!invoiceData || !invoiceData.invoiceNumber || !Array.isArray(invoiceData.lineItems)) {
                throw new Error('Invalid invoice data structure');
            }

            return invoiceData;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch invoice');
        }
    }
);

export const handleDeleteInvoiceByNumber = createAsyncThunk(
    'invoice/deleteInvoiceByNumber',
    async (invoiceNum, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/invoice/${invoiceNum}`);
            if (!response.data.success) {
                throw new Error(response.data.error?.message || 'Failed to delete invoice');
            }
            return invoiceNum;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || 'Failed to delete invoice');
        }
    }
);


const initialState = {
    data: null,
    invoices: [],
    currentInvoice: null,
    loading: false,
    error: null,
    viewLoading: false,
    viewError: null,
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        clearViewError: (state) => {
            state.viewError = null;
        },
        clearCurrentInvoice: (state) => {
            state.currentInvoice = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // handleSaveInvoice
            .addCase(handleSaveInvoice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleSaveInvoice.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.error = null;
                if (action.payload.data) {
                    state.invoices.push({
                        InvoiceNum: action.payload.data.invoiceNumber,
                        ClientName: action.payload.data.clientInfo?.name || 'Unknown',
                        DueDate: action.payload.data.dueDate,
                        balanceDue: action.payload.data.balanceDue || '*',
                        currency: action.payload.data.currency,
                        createdAt: new Date()
                    });
                }
            })
            .addCase(handleSaveInvoice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error?.message || 'Failed to save invoice';
            })
            // handleGetAllInvoices
            .addCase(handleGetAllInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleGetAllInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload?.data?.InvoiceList || [];
                state.error = null;
            })
            .addCase(handleGetAllInvoices.rejected, (state, action) => {
                state.loading = false;
                state.invoices = [];
                state.error = action.payload;
            })
            // handleGetInvoiceByNumber
            .addCase(handleGetInvoiceByNumber.pending, (state) => {
                state.viewLoading = true;
                state.viewError = null;
                state.currentInvoice = null;
            })
            .addCase(handleGetInvoiceByNumber.fulfilled, (state, action) => {
                state.viewLoading = false;
                state.currentInvoice = action.payload;
            })
            .addCase(handleGetInvoiceByNumber.rejected, (state, action) => {
                state.viewLoading = false;
                state.viewError = action.payload;
                state.currentInvoice = null;
            })
            // handleDeleteInvoiceByNumber
            .addCase(handleDeleteInvoiceByNumber.pending, (state) => {
                state.viewLoading = true;
                state.viewError = null;
            })
            .addCase(handleDeleteInvoiceByNumber.fulfilled, (state, action) => {
                state.viewLoading = false;
                state.viewError = null;
                state.invoices = state.invoices.filter(
                    (invoice) => invoice.InvoiceNum !== action.payload
                );
            })
            .addCase(handleDeleteInvoiceByNumber.rejected, (state, action) => {
                state.viewLoading = false;
                state.viewError = action.payload;
            });
    },
});

export const { clearViewError, clearCurrentInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;