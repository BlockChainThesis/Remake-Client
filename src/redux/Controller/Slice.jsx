import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { controllerABI, controllerAddress } from '../../constant';
import { setLoadingState } from '../Interface/Slice';
import axios from 'axios';
const { ethereum } = window;

// Function to create a contract instance
const createControllerContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const controllerContract = new ethers.Contract(controllerAddress, controllerABI, signer); //change signer to wallet
  return controllerContract;
};

// Get history of controllers
export const getHistoryController = createAsyncThunk('controller/getHistoryController', async (_, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const contract = createControllerContract();
      const rawData = await contract.getHistoryController(100);
      const structuredData = rawData.map((data) => ({
        controllerId: data.controllerId,
        controllerValue: data.controllerValue,
        createAt: new Date(data.createAt.toNumber() * 1000).toLocaleString(),
        stationId: data.stationId,
      }));
      dispatch(setLoadingState(false));
      return structuredData;
    }
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Get all controllers
export const getAllController = createAsyncThunk('controller/getAllController', async (_, { dispatch }) => {
  try {
    if (ethereum) {
      dispatch(setLoadingState(true));
      const contract = createControllerContract();
      const rawData = await contract.getAllController();
      const structuredData = rawData.map((controller) => ({
        controllerId: controller.controllerId,
        createAt: new Date(controller.createAt.toNumber() * 1000).toLocaleString(),
        stationId: controller.stationId,
        value: parseInt(controller.controllerValue),
      }));
      dispatch(setLoadingState(false));
      return structuredData;
    }
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Turn on valve controller
export const turnOnController_valve = createAsyncThunk('controller/turnOnController_valve', async ({ stationId, sensorId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    await axios.post('http://127.0.0.1:5005/turn_on', {
      station_id: stationId,
      sensor_id: sensorId,
    });
    dispatch(
      getControllerState_valve({
        stationId: stationId,
        controllerId: sensorId,
      })
    );
    dispatch(setLoadingState(false));
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Turn on pump controller
export const turnOnController_pump = createAsyncThunk('controller/turnOnController_pump', async ({ stationId, sensorId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    await axios.post('http://127.0.0.1:5006/turn_on', {
      station_id: stationId,
      sensor_id: sensorId,
    });
    dispatch(
      getControllerState_pump({
        stationId: stationId,
        controllerId: sensorId,
      })
    );
    dispatch(setLoadingState(false));
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

// Turn off valve controller
export const turnOffController_valve = createAsyncThunk('controller/turnOffController_valve', async ({ stationId, sensorId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    await axios.post('http://127.0.0.1:5005/turn_off', {
      station_id: stationId,
      sensor_id: sensorId,
    });
    dispatch(setLoadingState(false));
    dispatch(
      getControllerState_valve({
        stationId: stationId,
        controllerId: sensorId,
      })
    );
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Turn off pump controller
export const turnOffController_pump = createAsyncThunk('controller/turnOffController_valve', async ({ stationId, sensorId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    await axios.post('http://127.0.0.1:5006/turn_off', {
      station_id: stationId,
      sensor_id: sensorId,
    });
    dispatch(
      getControllerState_pump({
        stationId: stationId,
        controllerId: sensorId,
      })
    );
    dispatch(setLoadingState(false));
    return;
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Get all type PUMP Controller state
export const getControllerState_pump = createAsyncThunk('controller/getControllerState_pump', async ({ stationId, controllerId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const response = await axios.get(`http://127.0.0.1:5006/get_controller_value?station_id=${stationId}&controller_id=${controllerId}`);
    dispatch(setLoadingState(false));
    return {
      id: controllerId,
      value: response.data['controller_value'],
    };
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

//Get all type Valve Controller state
export const getControllerState_valve = createAsyncThunk('controller/getControllerState_valve', async ({ stationId, controllerId }, { dispatch }) => {
  try {
    dispatch(setLoadingState(true));
    const response = await axios.get(`http://127.0.0.1:5005/get_controller_value?station_id=${stationId}&controller_id=${controllerId}`);
    dispatch(setLoadingState(false));
    return {
      id: controllerId,
      value: response.data['controller_value'],
    };
  } catch (error) {
    dispatch(setLoadingState(false));
    window.alert('An error occurred: ' + error.code);
  }
});

export const Slice = createSlice({
  name: 'controller',
  initialState: {
    controllers: {
      data: [],
    },
    pumpState: [],
    valveState: [],
    controllerHistory: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllController.fulfilled, (state, action) => {
        state.controllers.data = action.payload;
      })
      // Add new state or replace an existing one
      .addCase(getControllerState_pump.fulfilled, (state, action) => {
        const index = state.pumpState.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.pumpState[index] = action.payload;
        } else {
          state.pumpState.push(action.payload);
        }
      })
      // Add new state or replace an existing one
      .addCase(getControllerState_valve.fulfilled, (state, action) => {
        const index = state.valveState.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.valveState[index] = action.payload;
        } else {
          state.valveState.push(action.payload);
        }
      })
      .addCase(getHistoryController.fulfilled, (state, action) => {
        state.controllerHistory = action.payload;
      });
  },
});

export default Slice.reducer;
