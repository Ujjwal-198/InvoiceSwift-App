import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice.js';
import invoiceReducer from '../features/invoiceSlice.js'

const store = configureStore({
    reducer:{
        user: userReducer,
        invoice: invoiceReducer
    }
});

export default store;