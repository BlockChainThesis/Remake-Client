import { createSlice } from '@reduxjs/toolkit';

const name = 'interface';
const initialState = {
  isLoading: null, // App is loading state
  sensorActiveID: -1, // Sensor active in Sensor List
};
export const Slice = createSlice({
  name: name,
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    setSensorActiveID: (state, action) => {
      state.sensorActiveID = action.payload;
    },
  },
});

export const { setLoadingState, setSensorActiveID } = Slice.actions;

export default Slice.reducer;
