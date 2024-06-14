import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { marketPlaceABI, marketPlaceAddress } from '../../constant';
import { ethers } from 'ethers';
import { setLoadingState } from '../Interface/Slice';
import { approveNFT, getMyListedNFTInfo, getMyUnlistedNFTInfo } from '../NFT/Slice';
import { approveAllMyBalance } from '../Wallet/Slice';

const name = 'market';
const initialState = {
  totalNFTs: -1,
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
  },
  buy: {
    status: 'idle',
    error: null,
  },
  marketData: [],
};

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cropInfoContract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer);
  return cropInfoContract;
};

//Buy NFT with NFT id (approve market first)
export const buyNFT = createAsyncThunk('market/buyNFT', async (tokenId, { dispatch }) => {
  try {
    if (ethereum) {
      await dispatch(approveAllMyBalance());
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.buyNft(tokenId);
      await response.wait();
      dispatch(setLoadingState(false));
      return;
    }
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Check that NFT is current address owner
export const checkOwner = createAsyncThunk('market/checkOwner', async (tokenId, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const marketPlaceContact = createContract();
      const response = await marketPlaceContact.isOwnerOfListedNFT(tokenId);
      dispatch(setLoadingState(false));
      return response;
    }
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//List NFT on marketplace with price and ID
export const listNFT = createAsyncThunk('market/listNFT', async ({ cropID, price }, { dispatch }) => {
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
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Unlist listedNFT with id
export const unlistNFT = createAsyncThunk('market/unlistNFT', async (tokenId, { dispatch }) => {
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
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Get all listed NFT on market
export const getAllListedNFTs = createAsyncThunk('market/getAllListedNFTs', async (_, { dispatch }) => {
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
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Get specific NFT with id
export const getListedNFT = createAsyncThunk('market/getListedNFT', async (tokenId, { dispatch }) => {
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
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Get count of all NFTs on market
export const getTotalNFTs = createAsyncThunk('market/getTotalNFTs', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getNFTsCount();
    dispatch(setLoadingState(false));
    return rawData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Get current highest price on market
export const getHighestPrice = createAsyncThunk('market/getHighestPrice', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getHighestPrice();
    dispatch(setLoadingState(false));
    return rawData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Get current lowest price on market
export const getLowestPrice = createAsyncThunk('market/getLowestPrice', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getLowestPrice();
    dispatch(setLoadingState(false));
    return rawData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const Slice = createSlice({
  name: name,
  initialState,
  reducers: {
    resetBuyStatus: (state) => {
      state.buy.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListedNFTs.fulfilled, (state, action) => {
        state.marketData = action.payload;
      })
      .addCase(getListedNFT.fulfilled, (state, action) => {
        state.product.data = action.payload;
      })
      .addCase(getTotalNFTs.fulfilled, (state, action) => {
        state.totalNFTs = action.payload;
      })
      .addCase(getHighestPrice.fulfilled, (state, action) => {
        state.highestPrice = action.payload;
      })
      .addCase(getLowestPrice.fulfilled, (state, action) => {
        state.lowestPrice = action.payload;
      })
      .addCase(checkOwner.fulfilled, (state, action) => {
        state.isOwner = action.payload;
      })
      .addCase(buyNFT.fulfilled, (state) => {
        state.buy.status = 'completed';
        alert('Buy NFT successfully');
      })
      .addCase(buyNFT.pending, (state) => {
        state.buy.status = 'loading';
      })
      .addCase(buyNFT.rejected, (state, action) => {
        state.buy.error = action.error.message;
      });
  },
});
export const { resetBuyStatus } = Slice.actions;
export default Slice.reducer;
