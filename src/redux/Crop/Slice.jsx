import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { cropInfoABI, cropInfoAddress } from '../../constant';
import { setLoadingState } from '../Interface/Slice';

const { ethereum } = window;
const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const cropInfoContract = new ethers.Contract(cropInfoAddress, cropInfoABI, signer);
  return cropInfoContract;
};
//Get all Crops Info
export const getAllCropsInfo = createAsyncThunk('crop/getAllCropsInfo', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const cropInfoContract = createContract();
    const rawData = await cropInfoContract.getAllCropsInfo();
    const structuredData = rawData.map((crop) => ({
      cropId: crop.cropId.toString(),
      cropType: crop.cropType,
      plantingDate: new Date(parseInt(crop.plantingDate) * 1000).toLocaleString(),
      harvestDate: crop.monthsToHavest.toString(),
      fertilizers: crop.fertilizers.join(', ') || '',
      pesticides: crop.pesticides.join(', ') || '',
      diseases: crop.diseases.join(', ') || '',
      additionalInfo: crop.additionalInfo,
      actualHarvestDate: crop.harvestDate,
    }));
    dispatch(setLoadingState(false));
    return structuredData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Get single crop info
export const getCropInfo = createAsyncThunk('crop/getCropInfo', async (cropID, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const cropInfoContract = createContract();
    const rawData = await cropInfoContract.getCropInfo(cropID);
    const structuredData = {
      cropType: rawData.cropType,
      plantingDate: new Date(parseInt(rawData.plantingDate) * 1000).toLocaleString(),
      harvestDate: parseInt(rawData.monthsToHavest),
      fertilizers: rawData.fertilizers.join(', ') || '',
      pesticides: rawData.pesticides.join(', ') || '',
      diseases: rawData.diseases.join(', ') || '',
      additionalInfo: rawData.additionalInfo,
      actualHarvestDate: rawData.harvestDate,
    };
    dispatch(setLoadingState(false));
    return structuredData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Initialize a crop
export const initCrop = createAsyncThunk('crop/initCrop', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const plantingDate = new Date();
    const year = String(plantingDate.getFullYear());
    const month = String(plantingDate.getMonth() + 1).padStart(2, '0');
    const day = String(plantingDate.getDate()).padStart(2, '0');
    const unixPlantingDate = Date.parse(`${year}-${month}-${day}T00:00:00Z`) / 1000;

    const cropHash = await contract.addCropInfo('Tomato', unixPlantingDate, 1, ['Nitrogen', 'Potassium'], ['Fungicide A', 'Insecticide B'], ['Blight', 'Wilt'], '', 1);
    await cropHash.wait();

    dispatch(setLoadingState(false));
    window.alert('Init Crop information successfully');

    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const updateCropInfo = createAsyncThunk('crop/updateCropInfo', async ({ cropId, updateData }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const cropInfoContract = createContract();
    const { cropType, plantingDate, harvestDate, fertilizers, pesticides, diseases, additionalInfo } = updateData;

    //convert date to Unix timestamp
    const [yearPlantingDate, monthPlantingDate, dayPlantingDate] = plantingDate.split('-');

    const unixPlantingDate = Date.parse(`${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`) / 1000;

    const arrayFertilizers = fertilizers !== '' ? fertilizers.split(', ') : [];
    const arrayPesticides = pesticides !== '' ? pesticides.split(', ') : [];
    const arrayDiseases = diseases !== '' ? diseases.split(', ') : [];

    console.log('Start Updating...');
    const response = await cropInfoContract.updateCropInfo(cropId, cropType, unixPlantingDate, harvestDate, arrayFertilizers, arrayPesticides, arrayDiseases, additionalInfo);
    await response.wait();
    dispatch(setLoadingState(false));

    window.alert('Update crop information successfully :)');
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Add crop to Block Chain
export const addCropToBlockChain = createAsyncThunk('crop/addCropToBlockChain', async (_, { getState, dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const state = getState();
    const cropInfoContract = createContract();

    const { cropType, plantingDate, harvestDate, fertilizers, pesticides, diseases, additionalInfo, noOfCrops } = state.crop.formData;

    //convert date to Unix timestamp
    const [yearPlantingDate, monthPlantingDate, dayPlantingDate] = plantingDate.split('-');

    const unixPlantingDate = Date.parse(`${yearPlantingDate}-${monthPlantingDate}-${dayPlantingDate}T00:00:00Z`) / 1000;

    const arrayFertilizers = fertilizers !== '' ? fertilizers.split(', ') : [];
    const arrayPesticides = pesticides !== '' ? pesticides.split(', ') : [];
    const arrayDiseases = diseases !== '' ? diseases.split(', ') : [];

    console.log('Start Adding...');
    const cropHash = await cropInfoContract.addCropInfo(cropType, unixPlantingDate, harvestDate, arrayFertilizers, arrayPesticides, arrayDiseases, additionalInfo, noOfCrops);
    await cropHash.wait();
    dispatch(setLoadingState(false));

    window.alert('Add the crop information successfully :)');
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Main Slice
export const Slice = createSlice({
  name: 'crop',
  initialState: {
    singleCrop: {
      data: {
        cropType: '',
        plantingDate: '',
        harvestDate: 0,
        noOfCrops: 0,
        fertilizers: '',
        pesticides: '',
        diseases: '',
        additionalInfo: '',
      },
      error: null,
      status: '',
    },
    cropInfo: [],
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
      .addCase(getCropInfo.rejected, (state, action) => {
        state.singleCrop.status = 'rejected';
        state.singleCrop.error = action.error.message;
        state.singleCrop.data = null;
      })
      .addCase(getAllCropsInfo.fulfilled, (state, action) => {
        state.cropInfo = action.payload;
        console.log('Fetching crop data successfully ');
      })
      .addCase(getAllCropsInfo.rejected, (state, action) => {
        console.error('Fetching crop failed:', action.payload);
      })
      .addCase(initCrop.fulfilled, () => {
        console.log('Init Crop successfully !');
      })
      .addCase(addCropToBlockChain.fulfilled, () => {
        console.log('Added Crop successfully !');
      });
  },
});

export const { setFormData, setUpdateFormData } = Slice.actions;
export default Slice.reducer;
