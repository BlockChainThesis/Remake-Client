import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { marketPlaceABI, marketPlaceAddress } from '../../constant';
import { ethers } from 'ethers';
import { setLoadingState } from '../Loading/Slice';
import { approveNFT, getMyListedNFTInfo, getMyUnlistedNFTInfo } from '../NFT/Slice';
import { approveAllMyBalance } from '../Wallet/Slice';

const name = 'market';
const initialState = {
  totalNFTs: 0,
  highestPrice: -1,
  lowestPrice: -1,
  isOwner: null,
  product: {
    data: {
      owner: '',
      seller: '',
      price: '',
      tokenId: '',
      cropInfo: {
        cropType: '',
        plantingDate: '',
        harvestDate: '',
        fertilizers: '',
        pesticides: '',
        diseases: '',
        additionalInfo: '',
        actualHarvestDate: '',
      },
    },
    status: 'idle',
    error: null,
  },
  market: {
    data: [],
    status: 'idle',
    error: null,
  },
  buyNFT: {
    status: 'idle',
    error: null,
  },
  loading: 'false',
  error: null,
  marketData: [],
  singleMarketData: {
    owner: '',
    seller: '',
    price: '',
    tokenId: '',
    cropInfo: {
      cropType: '',
      plantingDate: '',
      harvestDate: '',
      fertilizers: '',
      pesticides: '',
      diseases: '',
      additionalInfo: '',
      actualHarvestDate: '',
    },
  },
};

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cropInfoContract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer);
  return cropInfoContract;
};

export const buyNFT = createAsyncThunk('market/buyNFT', async (tokenId, { dispatch, rejectWithValue }) => {
  try {
    if (ethereum) {
      await dispatch(approveAllMyBalance());
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.buyNft(tokenId);
      await response.wait();
      dispatch(setLoadingState(false));
      return response;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const checkOwner = createAsyncThunk('market/checkOwner', async (tokenId, { dispatch, rejectWithValue }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.isOwnerOfListedNFT(tokenId);
      dispatch(setLoadingState(false));
      return response;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const listNFT = createAsyncThunk('market/listNFT', async ({ cropID, price }, { dispatch, rejectWithValue }) => {
  try {
    if (ethereum) {
      await dispatch(approveNFT(cropID));
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.listNFT(cropID, price);
      await response.wait();
      dispatch(getMyListedNFTInfo());
      dispatch(getMyUnlistedNFTInfo());
      dispatch(setLoadingState(false));
      return;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const unlistNFT = createAsyncThunk('market/unlistNFT', async (tokenId, { dispatch, rejectWithValue }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.unlistNFT(tokenId);
      await response.wait();
      dispatch(getMyListedNFTInfo());
      dispatch(getMyUnlistedNFTInfo());
      dispatch(setLoadingState(false));
      return;
    }
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getAllListedNFTs = createAsyncThunk(
  'market/getAllListedNFTs',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      if (ethereum) {
        dispatch(setLoadingState(true));

        const marketPlaceContact = createContract();
        const rawData = await marketPlaceContact.getAllListedNFTInfo();
        const structuredData = rawData.map((data) => ({
          owner: data.owner,
          seller: data.seller,
          price: data.price,
          tokenId: data.tokenId,
          uri: data.uri,
          cropInfo: {
            cropType: data.crop.cropType,
            plantingDate: new Date(parseInt(data.crop.plantingDate) * 1000).toLocaleString(),
            harvestDate: parseInt(data.crop.monthsToHavest),
            fertilizers: data.crop.fertilizers.join(', ') || '',
            pesticides: data.crop.pesticides.join(', ') || '',
            diseases: data.crop.diseases.join(', ') || '',
            additionalInfo: data.crop.additionalInfo,
            actualHarvestDate: data.crop.harvestDate,
          },
        }));
        dispatch(setLoadingState(false));
        return structuredData;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getListedNFT = createAsyncThunk('market/getListedNFT', async (tokenId, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getListedNFTForId(tokenId);
    const structuredData = {
      owner: rawData.owner,
      seller: rawData.seller,
      price: rawData.price,
      tokenId: rawData.tokenId,
      uri: rawData.uri,
      cropInfo: {
        cropType: rawData.crop.cropType,
        plantingDate: new Date(parseInt(rawData.crop.plantingDate) * 1000).toLocaleString(),
        harvestDate: parseInt(rawData.crop.monthsToHavest),
        fertilizers: rawData.crop.fertilizers.join(', ') || '',
        pesticides: rawData.crop.pesticides.join(', ') || '',
        diseases: rawData.crop.diseases.join(', ') || '',
        additionalInfo: rawData.crop.additionalInfo,
        actualHarvestDate: rawData.crop.harvestDate,
      },
    };
    dispatch(setLoadingState(false));

    return structuredData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getTotalNFTs = createAsyncThunk('market/getTotalNFTs', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));

    const contract = createContract();
    const rawData = await contract.getNFTsCount();
    dispatch(setLoadingState(false));

    return rawData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getHighestPrice = createAsyncThunk('market/getHighestPrice', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));

    const contract = createContract();
    const rawData = await contract.getHighestPrice();

    dispatch(setLoadingState(false));
    return rawData;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getLowestPrice = createAsyncThunk('market/getLowestPrice', async (_, { rejectWithValue, dispatch }) => {
  try {
    dispatch(setLoadingState(true));

    const contract = createContract();
    const rawData = await contract.getLowestPrice();

    dispatch(setLoadingState(false));
    return rawData;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const Slice = createSlice({
  name: name,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllListedNFTs.fulfilled, (state, action) => {
        state.loading = false;
        state.marketData = action.payload;
      })
      .addCase(getAllListedNFTs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllListedNFTs.rejected, (state, action) => {
        state.error = action.error.message;
        state.marketData = null;
      })
      .addCase(getListedNFT.fulfilled, (state, action) => {
        state.product.status = 'completed';
        state.product.data = action.payload;
      })
      .addCase(getListedNFT.pending, (state) => {
        state.product.status = 'loading';
      })
      .addCase(getListedNFT.rejected, (state, action) => {
        state.product.status = 'rejected';
        state.product.error = action.error.message;
        state.product.data = {};
      })
      .addCase(getTotalNFTs.fulfilled, (state, action) => {
        state.loading = false;
        state.totalNFTs = action.payload;
      })
      .addCase(getTotalNFTs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalNFTs.rejected, (state, action) => {
        state.error = action.error.message;
        state.totalNFTs = {};
      })
      .addCase(getHighestPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.highestPrice = action.payload;
      })
      .addCase(getHighestPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHighestPrice.rejected, (state, action) => {
        state.error = action.error.message;
        state.highestPrice = -1;
      })
      .addCase(getLowestPrice.fulfilled, (state, action) => {
        state.loading = false;
        state.lowestPrice = action.payload;
      })
      .addCase(getLowestPrice.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLowestPrice.rejected, (state, action) => {
        state.error = action.error.message;
        state.lowestPrice = -1;
      })
      .addCase(checkOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.isOwner = action.payload;
      })
      .addCase(checkOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOwner.rejected, (state, action) => {
        state.error = action.error.message;
        state.isOwner = null;
      })
      .addCase(buyNFT.fulfilled, (state) => {
        state.buyNFT.status = 'completed';
        alert('Buy NFT successfully');
      })
      .addCase(buyNFT.pending, (state) => {
        state.buyNFT.status = 'loading';
      })
      .addCase(buyNFT.rejected, (state, action) => {
        state.buyNFT.error = action.error.message;
      });
  },
});

export default Slice.reducer;
