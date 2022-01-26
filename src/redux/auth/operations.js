import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'services/kapusta-api';

const Error = {
  AUTH_FAILED: 'Invalid email or password.',
  UNKNOWN: 'Unknown backend error occurred.',
};

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      await api.register(credentials);
      const { data } = await api.login(credentials);
      api.setToken(data.accessToken);
      return data;
    } catch (error) {
      if (error.message === 'Request failed with status code 409') {
        return rejectWithValue('Provided email already exists');
      }
      return rejectWithValue(Error.UNKNOWN);
    }
  },
);

const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.login(credentials);
      api.setToken(data.accessToken);
      return data;
    } catch (error) {
      if (error.message === 'Request failed with status code 403') {
        return rejectWithValue("Email doesn't exist / Password is wrong");
      }
      return rejectWithValue(Error.UNKNOWN);
    }
  },
);

// const getUser = createAsyncThunk(
//   'auth/user',
//   async (googleToken, { getState, rejectWithValue }) => {
//     try {
//       const token = googleToken ?? getState().auth.accessToken;
//       api.setToken(token);
//       const { data } = await api.getUserInfo();
//       return data;
//     } catch (error) {
//       return rejectWithValue(Error.UNKNOWN);
//     }
//   },
// );

const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    try {
      api.setToken(getState().auth.refreshToken);
      const { data } = await api.refresh({ sid: getState().auth.sid });
      api.setToken(data.newAccessToken);
      return data;
    } catch (error) {
      return rejectWithValue(Error.UNKNOWN);
    }
  },
);

const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await api.logout();
      api.setToken('');
    } catch (error) {
      return rejectWithValue(Error.UNKNOWN);
    }
  },
);

export { register, login, refresh, logOut };
