import { createSlice } from "@reduxjs/toolkit";
export const Slice = createSlice({
    name: 'sidebar',
    initialState:{
        isOpen: false,
    },
    reducers:{
        letSideBarOpen : (state) => {
            state.isOpen = !state.isOpen
        },
        letSideBarClosed : (state) => {
            state.isOpen = false
        }
    }
})


export const {letSideBarOpen, letSideBarClosed} = Slice.actions;

export default Slice.reducer