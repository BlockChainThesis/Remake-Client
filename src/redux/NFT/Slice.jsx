import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { cropNFTABI, cropNFTAddress } from '../../constant';
import { marketPlaceABI, marketPlaceAddress } from '../../constant';
import { setLoadingState } from '../Interface/Slice';
import axios from 'axios';

const name = 'cropNFT';
const initialState = {
  NFTuri: '',
  isNFT: null,
  listedNFT: [],
  unListedNFT: [],
  crtNFT: {
    status: '',
  },
};

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(cropNFTAddress, cropNFTABI, signer);
  return contract;
};

const createMarketContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer);
  return contract;
};

// Aprove NFT
export const approveNFT = createAsyncThunk('cropNFT/approveNFT', async (tokenId, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const cropNFTContract = createContract();
    const response = await cropNFTContract.approveNFT(marketPlaceAddress, tokenId);
    await response.wait();
    console.log('Approve successfully');
    dispatch(setLoadingState(false));
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Create NFT with Id and URI
export const createNFT = createAsyncThunk('cropNFT/createNFT', async ({ NFTuri, cropID }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const response = await contract.createCropNFT(NFTuri, cropID);
    await response.wait();
    dispatch(setLoadingState(false));
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Create Pinata URI with image
export const createURI = createAsyncThunk('cropNFT/createURL', async ({ cropID, image }, { dispatch }) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  let data = new FormData();
  data.append('file', image);

  // Set the metadata if needed
  const metadata = JSON.stringify({
    name: cropID,
  });
  data.append('pinataMetadata', metadata);

  try {
    dispatch(setLoadingState(true));
    const response = await axios.post(url, data, {
      maxContentLength: 'Infinity', // needed to prevent axios from erroring out with large files
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: import.meta.env.VITE_API,
        pinata_secret_api_key: import.meta.env.VITE_SECRET,
      },
    });
    dispatch(setLoadingState(false));
    return response.data.IpfsHash;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Check if crop is NFT
export const checkNFT = createAsyncThunk('cropNFT/checkNFT', async (cropID, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const response = await contract.isNFT(cropID);
    dispatch(setLoadingState(false));
    return response;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getMyListedNFTInfo = createAsyncThunk('cropNFT/getMyListedNFTInfo', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createMarketContract();
    const response = await contract.getMyListedNFTInfo();
    const listedNFT = response.map((curr) => ({
      onMarket: curr.currentlyListed,
      crop: {
        cropType: curr.crop.cropType,
        plantingDate: new Date(parseInt(curr.crop.plantingDate) * 1000).toLocaleString(),
        harvestDate: parseInt(curr.crop.monthsToHavest),
        fertilizers: curr.crop.fertilizers.join(', ') || '',
        pesticides: curr.crop.pesticides.join(', ') || '',
        diseases: curr.crop.diseases.join(', ') || '',
        additionalInfo: curr.crop.additionalInfo,
        actualHarvestDate: curr.crop.harvestDate,
      },
      price: curr.price,
      owner: curr.owner,
      seller: curr.seller,
      tokenId: curr.tokenId,
      uri: curr.uri,
    }));
    dispatch(setLoadingState(false));
    return listedNFT;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getMyUnlistedNFTInfo = createAsyncThunk('cropNFT/getMyUnlistedNFTInfo', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createMarketContract();
    const response = await contract.getMyUnlistedNFTInfo();
    const unlistedNFT = response.map((curr) => ({
      onMarket: curr.currentlyListed,
      crop: {
        cropType: curr.crop.cropType,
        plantingDate: new Date(parseInt(curr.crop.plantingDate) * 1000).toLocaleString(),
        harvestDate: parseInt(curr.crop.monthsToHavest),
        fertilizers: curr.crop.fertilizers.join(', ') || '',
        pesticides: curr.crop.pesticides.join(', ') || '',
        diseases: curr.crop.diseases.join(', ') || '',
        additionalInfo: curr.crop.additionalInfo,
        actualHarvestDate: curr.crop.harvestDate,
      },
      price: curr.price,
      owner: curr.owner,
      seller: curr.seller,
      tokenId: curr.tokenId,
      uri: curr.uri,
    }));
    dispatch(setLoadingState(false));
    return unlistedNFT;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const Slice = createSlice({
  name: name,
  initialState,
  reducers: {
    resetURI: (state) => {
      state.NFTuri = '';
    },
    resetCrtStatus: (state) => {
      state.crtNFT.status = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createURI.fulfilled, (state, action) => {
        state.NFTuri = action.payload;
        alert('Create URI successfully!');
      })
      .addCase(createNFT.fulfilled, (state) => {
        state.crtNFT.status = 'completed';
        alert('Create NFT successfully !');
      })
      .addCase(checkNFT.fulfilled, (state, action) => {
        state.isNFT = action.payload;
      })
      .addCase(getMyListedNFTInfo.fulfilled, (state, action) => {
        state.listedNFT = action.payload;
      })
      .addCase(getMyUnlistedNFTInfo.fulfilled, (state, action) => {
        state.unListedNFT = action.payload;
      });
  },
});

export const { resetURI, resetCrtStatus } = Slice.actions;
export default Slice.reducer;
