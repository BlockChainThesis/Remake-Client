import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { cropInfoABI, cropInfoAddress } from '../../constant';
import { setLoadingState } from '../Loading/Slice';

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer);
  return cropInfoContract;
};

export const getAllCropsInfo = createAsyncThunk('crop/getAllCropsInfo', async (_, { rejectWithValue, getState }) => {
  try {
    const { user } = getState().auth;
    if (!user) return rejectWithValue('User is not logged in.');
    if (ethereum) {
      const cropInfoContract = createContract();
      const rawData = await cropInfoContract.getAllCropsInfo();
      const structuredData = rawData.map((crop) => ({
        cropId: crop.cropId.toString(),
        cropType: crop.cropType,
        plantingDate: new Date(parseInt(crop.plantingDate) * 1000).toLocaleString(),
        harvestDate: crop.monthsToHavest.toString(),
        fertilizers: crop.fertilizers,
        pesticides: crop.pesticides,
        diseases: crop.diseases,
        additionalInfo: crop.additionalInfo,
        actualHarvestDate: crop.harvestDate,
      }));
      return structuredData;
    } else {
      console.log('Ethereum is not present');
    }
  } catch (error) {
    console.error(error);
  }
});

// Get crop info
export const getCropInfo = createAsyncThunk('crop/getCropInfo', async (cropID, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const cropInfoContract = createContract();
      const rawData = await cropInfoContract.getCropInfo(cropID);
      const structuredData = {
        cropType: rawData.cropType,
        plantingDate: new Date(rawData.plantingDate).toLocaleString(),
        harvestDate: parseInt(rawData.monthsToHavest),
        fertilizers: rawData.fertilizers.join(', ') || '',
        pesticides: rawData.pesticides.join(', ') || '',
        diseases: rawData.diseases.join(', ') || '',
        additionalInfo: rawData.additionalInfo,
        actualHarvestDate: rawData.harvestDate,
      };
      dispatch(setLoadingState(false));
      return structuredData;
    } else {
      console.log('Ethereum is not present');
    }
  } catch (error) {
    console.log(error);
  }
});

//Initialize a crop
export const initCrop = createAsyncThunk('crop/initCrop', async (_, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const contract = createContract();
      const plantingDate = new Date();
      const year = String(plantingDate.getFullYear());
      const month = String(plantingDate.getMonth() + 1).padStart(2, '0');
      const day = String(plantingDate.getDate()).padStart(2, '0');
      const unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000;

      const cropHash = await contract.addCropInfo('flower', unixPlantingDate, 1, [], [], [], '', 1);
      await cropHash.wait();

      dispatch(setLoadingState(false));
      window.alert('Add the crop information successfully');

      const cropsCount = await contract.getNumberOfCrop();
      return cropsCount;
    } else {
      console.log('No ethereum object');
    }
  } catch (error) {
    console.log(error);
  }
});

//Add crop to Block Chain
export const addCropToBlockChain = createAsyncThunk('crop/addCropToBlockChain', async (_, { getState, dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const state = getState();
      const cropInfoContract = createContract();

      const { cropType, plantingDate, harvestDate, fertilizers, pesticides, diseases, additionalInfo, noOfCrops } =
        state.crop.formData;

      //convert date to Unix timestamp
      const [yearPlantingDate, monthPlantingDate, dayPlantingDate] = plantingDate.split('-');

      const unixPlantingDate =
        Date.parse(`${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`) / 1000;

      const arrayFertilizers = fertilizers !== '' ? fertilizers.split(', ') : [];
      const arrayPesticides = pesticides !== '' ? pesticides.split(', ') : [];
      const arrayDiseases = diseases !== '' ? diseases.split(', ') : [];

      console.log('Start Adding...');
      const cropHash = await cropInfoContract.addCropInfo(
        cropType,
        unixPlantingDate,
        harvestDate,
        arrayFertilizers,
        arrayPesticides,
        arrayDiseases,
        additionalInfo,
        noOfCrops
      );
      await cropHash.wait();
      dispatch(setLoadingState(false));

      window.alert('Add the crop information successfully :)');
      return;
    } else {
      console.log('No ethereum object');
    }
  } catch (error) {
    console.log(error);
  }
});

//Main Slice
export const Slice = createSlice({
  name: 'crop',
  initialState: {
    singleCrop: {
      data: {},
      error: null,
      status: '',
    },
    loading: false,
    error: null,
    singleCropInfo: {},
    cropInfo: [],
    cropsCount: 0,
    formData: {
      cropType: '',
      plantingDate: '',
      harvestDate: 0,
      noOfCrops: 0,
      fertilizers: '',
      pesticides: '',
      diseases: '',
      additionalInfo: '',
    },
  },
  reducers: {
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.formData) {
        state.formData[name] = value;
      } else {
        console.warn(`Tried to set formData with unknown field: ${name}`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCropInfo.fulfilled, (state, action) => {
        state.singleCrop.status = 'completed';
        state.singleCrop.data = action.payload;
      })
      .addCase(getCropInfo.pending, (state) => {
        state.singleCrop.status = 'loading';
      })
      .addCase(getCropInfo.rejected, (state, action) => {
        state.singleCrop.status = 'rejected';
        state.singleCrop.error = action.error.message;
        state.singleCrop.data = null;
      })
      .addCase(getAllCropsInfo.fulfilled, (state, action) => {
        state.cropInfo = action.payload;
        state.loading = false;
        console.log('Fetching crop data successfully ');
      })
      .addCase(getAllCropsInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCropsInfo.rejected, (state, action) => {
        console.error('Fetching crop failed:', action.payload);
        state.error = action.error.message;
      })
      .addCase(initCrop.fulfilled, () => {
        console.log('Init Crop successfully !');
      })
      .addCase(addCropToBlockChain.fulfilled, () => {
        console.log('Added Crop successfully !');
      });
  },
});

// Action creators are generated for each case reducer function
export const { setFormData, setUpdateFormData } = Slice.actions;

export default Slice.reducer;
