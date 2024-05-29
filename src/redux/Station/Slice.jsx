import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { stationDataABI, stationDataAddress } from '../../constant';
import { setLoadingState } from '../Interface/Slice';

const { ethereum } = window;

const createContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(stationDataAddress, stationDataABI, signer); //change signer to wallet
  return contract;
};

export const fetchStationData = createAsyncThunk('station/fetchStationData', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const availableStationsData = await contract.getAllCurentStationData();
    const structuredStationsData = availableStationsData.map((station) => ({
      stationId: station.stationId,
      createAt: new Date(parseInt(station.createAt) * 1000).toISOString(),
      longitude: parseFloat(station.gps_latitude),
      latitude: parseFloat(station.gps_longitude),
      sensorData: station.sensorData.map((sensor) => ({
        sensorId: sensor.sensorId,
        sensorUnit: sensor.sensorUnit,
        sensorValue: sensor.sensorValue,
      })),
    }));
    dispatch(setLoadingState(false));
    return structuredStationsData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getStationData = createAsyncThunk('station/getStationData', async (stationId, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const rawData = await contract.getStationData(stationId);
    const structuredData = {
      stationId: rawData[0],
      createAt: new Date(parseInt(rawData[1]) * 1000).toISOString(),
      longitude: parseFloat(rawData[2]),
      latitude: parseFloat(rawData[3]),
      sensorData: rawData[4].map((sensor) => ({
        sensorId: sensor.sensorId,
        sensorUnit: sensor.sensorUnit,
        sensorValue: sensor.sensorValue,
      })),
    };
    dispatch(setLoadingState(false));
    return structuredData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getSensorHistory = createAsyncThunk('station/getSensorHistory', async ({ stationId, sensorId, length }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const sensorHistory = await contract.getHistorySensorValue(stationId, sensorId, length);
    const structuredTime = sensorHistory[0].map((time) => new Date(parseInt(time) * 1000).toISOString());
    const structuredHistory = sensorHistory[1].map((sensor, index) => ({
      value: sensor.sensorValue,
      timestamp: structuredTime[index],
    }));
    dispatch(setLoadingState(false));
    return structuredHistory;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getStationHistory = createAsyncThunk('station/getStationHistory', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const stationData = await contract.getAllStationData();
    const structuredData = stationData.map((station) => ({
      stationId: station.stationId,
      createAt: new Date(parseInt(station.createAt) * 1000).toLocaleString(),
      longitude: parseFloat(station.gps_latitude),
      latitude: parseFloat(station.gps_longitude),
      sensorData: station.sensorData.map((sensor) => ({
        sensorId: sensor.sensorId,
        sensorUnit: sensor.sensorUnit,
        sensorValue: sensor.sensorValue,
      })),
    }));
    dispatch(setLoadingState(false));
    return structuredData;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const getNumberofStations = createAsyncThunk('station/getNumberofStations', async (_, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const contract = createContract();
    const stationCount = await contract.getNumberOfStations();
    dispatch(setLoadingState(false));
    return parseInt(stationCount);
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Main Slice
export const Slice = createSlice({
  name: 'station',
  initialState: {
    stationData: [],
    stationCount: 0,
    currentStation: null,
    currentSensorHistory: [],
    stationHistory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStationData.fulfilled, (state, action) => {
        state.stationData = action.payload;
        console.log('Fetch Data Successfully');
      })
      .addCase(fetchStationData.rejected, (action) => {
        console.error('Connection failed:', action.payload);
      })
      .addCase(getStationData.fulfilled, (state, action) => {
        state.currentStation = action.payload;
        console.log('Fetched specific Station Successfully');
      })
      .addCase(getSensorHistory.fulfilled, (state, action) => {
        state.currentSensorHistory = action.payload;
        console.log('Fetched sensor history Successfully');
      })
      .addCase(getNumberofStations.fulfilled, (state, action) => {
        state.stationCount = action.payload;
      })
      .addCase(getStationHistory.fulfilled, (state, action) => {
        state.stationHistory = action.payload;
      });
  },
});

export default Slice.reducer;
