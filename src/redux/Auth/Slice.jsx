import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { authenticationABI, authenticationAddress } from '../../constant';
import { setLoadingState } from '../Interface/Slice';

const initialState = {
  user: null,
  isAdmin: null,
  isLoggedIn: null,
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

export const authorization = createAsyncThunk('auth/authorization', async (address, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const authenContract = createContract();
    const response = await authenContract.isAdmin(address);
    dispatch(setLoadingState(false));
    return response;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
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
    //Authorization
    dispatch(authorization(address));
    //Save Account Information
    dispatch(setAccount(address));

    dispatch(setLoadingState(false));
    return address;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
    return rejectWithValue(error.message);
  }
});

export const Slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearAccount: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.isAdmin = action.payload;
      });
  },
});

export const { setAccount, clearAccount, roleCheck, checkLoginState } = Slice.actions;

export default Slice.reducer;
