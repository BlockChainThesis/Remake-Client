import { createSlice } from "@reduxjs/toolkit";

const name = 'loading'
const initialState = {
    isLoading: null,
}
export const Slice = createSlice({
    name: name,
    initialState,
    reducers:{
        setLoadingState : (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const {setLoadingState} = Slice.actions;

export default Slice.reducer;
