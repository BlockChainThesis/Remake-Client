import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { authenticationABI, authenticationAddress } from '../../constant';
import { setLoadingState } from '../Loading/Slice';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAdmin: null,
  adminAddress: null,
};
const { ethereum } = window;

const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cropInfoContract = new ethers.Contract(authenticationAddress, authenticationABI, signer);
  return cropInfoContract;
};

const getProvider = () => {
  if (typeof ethereum !== 'undefined') {
    return new ethers.providers.Web3Provider(ethereum);
  } else {
    throw new Error('MetaMask is not installed');
  }
};

export const authorization = createAsyncThunk('auth/authorization', async (address, { rejectWithValue }) => {
  try {
    const authenContract = createContract();
    const response = await authenContract.isAdmin(address);
    return response;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const authenticate = createAsyncThunk('auth/authenticate', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));

    const provider = getProvider();
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    dispatch(authorization(address));

    const message = `Sign in to the app at ${new Date().toISOString()}`;
    const signature = await signer.signMessage(message);

    dispatch(setAccount(address));

    dispatch(setLoadingState(false));

    return { address, signature }; // The payload now only simulates user authentication with MetaMask
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('metaMaskAccount', action.payload);
    },
    clearAccount: (state) => {
      state.user = null;
      localStorage.removeItem('metaMaskAccount');
    },
    roleCheck: () => {
      const address = localStorage.getItem('metaMaskAccount');
      authorization(address);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(authorization.pending, (state) => {
        state.loading = true;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = action.payload;
      })
      .addCase(authorization.rejected, (state, action) => {
        state.isAdmin = null;
        state.error = action.error.message;
      });
  },
});

export const { setAccount, clearAccount, roleCheck } = Slice.actions;

export default Slice.reducer;
