import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { marketPlaceAddress, marketPlaceABI, tokenABI, tokenAddress } from '../../constant';
import { ethers } from 'ethers';
import { setLoadingState } from '../Interface/Slice';

const name = 'wallet';
const initialState = {
  loading: 'false',
  error: null,
  balance: null,
  transaction: null,
};

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(tokenAddress, tokenABI, signer);
  return contract;
};

const createMarketContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer);
  return contract;
};

export const getMyBalance = createAsyncThunk('wallet/getBalance', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getBalance();
    dispatch(setLoadingState(false));
    return rawData.toString();
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getMyTransaction = createAsyncThunk('wallet/getMyTransactions', async (_, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const contract = createMarketContract();
      const response = await contract.getMyTransactions();
      const data = response.map((item) => ({
        fromAddress: item.fromAddress.toString(),
        toAddress: item.toAddress.toString(),
        date: new Date(item.date.toNumber() * 1000).toLocaleString(),
        token: item.token,
        productId: item.productId,
      }));
      dispatch(setLoadingState(false));
      return data;
    }
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const approveAllMyBalance = createAsyncThunk('wallet/approveAllMyBalance', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const response = await contract.approveAllMyBalance(marketPlaceAddress);
    await response.wait();
    dispatch(setLoadingState(false));
    console.log('Approve successfully');
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const Slice = createSlice({
  name: name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(getMyTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload;
      });
  },
});

export default Slice.reducer;
