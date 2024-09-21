// src/features/auth/authSlice.ts
import { authUrl } from '@/apis/auth';
import { makeApiRequest } from '@/apis/functions';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState,  Credentials, UserInfo, ApiResponse } from '../../../interfaces/userReducer';
import { toast } from 'sonner';

// Initial state with typed values
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token : null,
  status: 'idle',
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk<ApiResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const data = await makeApiRequest<ApiResponse>({method:'POST', url:authUrl.USER_LOGIN, data:credentials});
      return data;
    } catch (error: any) {
      // Return the error message as reject value
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const register = createAsyncThunk<ApiResponse, UserInfo, { rejectValue: string }>(
  'auth/register',
  async (userInfo, thunkAPI) => {
    try {
      const data = await makeApiRequest<ApiResponse>({method:'POST', url:authUrl.USER_SIGNUP, data:userInfo});
      return data;
    } catch (error: any) {
      // Return the error message as reject value
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout reducer
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast('Logout Successful!');
    },
    // Check authentication status
    checkAuth: (state) => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        state.status = 'succeeded';
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login states
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.token
        localStorage.setItem('user', JSON.stringify(action.payload.data));
        localStorage.setItem('token', JSON.stringify(action.payload.token));
        toast('Login Successful!');
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
        toast(state.error);
      })

      // Handle register states
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(action.payload.data));
      })
      .addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});

// Exporting actions and reducer
export const { logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
