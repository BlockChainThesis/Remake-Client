import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { tokenABI, tokenAddress } from "../../constant"
import { ethers } from "ethers"
import { setLoadingState } from "../Loading/Slice"


const name = 'wallet'
const initialState = {
    loading: 'false',
    error: null, 
    balance: null,

}

const { ethereum } = window
const createContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const cropInfoContract = new ethers.Contract(tokenAddress, tokenABI, signer)
    return cropInfoContract
}

export const getBalance = createAsyncThunk(
    'wallet/getBalance', 
    async (_, {rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const rawData = await contract.getBalance()

            dispatch(setLoadingState(false))
            console.log(rawData.toString())
            // return rawData
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const Slice = createSlice({
    name: name,
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getBalance.fulfilled, (state,action) => {
            state.loading = false
            state.balance = action.payload
        })
        .addCase(getBalance.pending, (state) => {
            state.loading = true
        })
        .addCase(getBalance.rejected, (state, action) => {
            state.error = action.error.message
            state.balance = null
        })
    }
})


export default Slice.reducer;
