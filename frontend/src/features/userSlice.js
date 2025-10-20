import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api/axiosInstance.js';

export const handleSignup = createAsyncThunk(
    'user/auth/signup',
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.post('/user/signup', data);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || "Signup failed");
        }
    }
);

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/auth/me');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || "User Authentication failed");
        }
    }
);

export const handleLogin = createAsyncThunk(
    'user/auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const result = await api.post('/user/login', data);
            return result.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || "Login failed");
        }
    }
)

export const handleLogout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user/logout');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || "Logout failed");
        }
    }
);

export const handleDeleteUser = createAsyncThunk(
    'user/deleteUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete('/user/deleteUser');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error?.message || "User deletion failed");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        authenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.authenticated = false;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(handleSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(handleSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.authenticated = false;
            })
            // Login
            .addCase(handleLogin.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.authenticated = false;
            })
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.authenticated = false;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.authenticated = true;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
                state.authenticated = false;
            })
            // Logout
            .addCase(handleLogout.fulfilled, (state, action) => {
                state.user = null;
                state.authenticated = false;
                state.error = null;
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.user = null;
                state.authenticated = false;
                state.error = action.payload || 'Logout failed';
            })
            // DeleteUser 
            .addCase(handleDeleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(handleDeleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.authenticated = false;
                state.error = null;
            })
            .addCase(handleDeleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'User deletion failed';
            });

    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;