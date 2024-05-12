import { createSlice } from "@reduxjs/toolkit";



const Slice = createSlice({
    name: 'dashboard',
    initialState: {
        sensorActiveID: -1,
    },
    reducers:{
        setSensorActiveID:  (state, action) => {
            state.sensorActiveID = action.payload
        }
    }

})
export const {setSensorActiveID} = Slice.actions
export default Slice.reducer
