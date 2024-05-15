import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { marketPlaceABI, marketPlaceAddress, tokenABI, tokenAddress } from "../../constant"
import { ethers } from "ethers"
import { setLoadingState } from "../Loading/Slice"
import { getUserAddress } from "../../utils/func"


const name = 'wallet'
const initialState = {
    loading: 'false',
    error: null, 
    balance: null,
    transaction: null,
}

const { ethereum } = window
const createContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(tokenAddress, tokenABI, signer)
    return contract
}

const createMarketPlaceContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer)
    return contract
}



export const getMyBalance = createAsyncThunk(
    'wallet/getBalance', 
    async (_, {rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const rawData = await contract.getBalance()
            dispatch(setLoadingState(false))
            return rawData.toString()
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const getMyTransaction = createAsyncThunk(
    'wallet/getMyTransaction', 
    async (_, {rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))
            const accountAddress = await getUserAddress()
            const contract = createMarketPlaceContract()
            const response = await contract.getTransactionsOfUser(accountAddress)
            const data = response.map(item => {
                return item.toString();
            })
            dispatch(setLoadingState(false))
            return data
        }catch(error){
            return rejectWithValue(error);
        }
    }
)


export const approveAllMyBalance = createAsyncThunk(
    'wallet/approveAllMyBalance', 
    async (_, {rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const response = await contract.approveAllMyBalance(marketPlaceAddress)
            await response.wait()
            console.log("Approve successfully")
            dispatch(setLoadingState(false))
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
        .addCase(getMyBalance.fulfilled, (state,action) => {
            state.loading = false
            state.balance = action.payload
        })
        .addCase(getMyBalance.pending, (state) => {
            state.loading = true
        })
        .addCase(getMyBalance.rejected, (state, action) => {
            state.error = action.error.message
            state.balance = null
        })
        .addCase(getMyTransaction.fulfilled, (state,action) => {
            state.loading = false
            state.transaction = action.payload
        })
        .addCase(getMyTransaction.pending, (state) => {
            state.loading = true
        })
        .addCase(getMyTransaction.rejected, (state, action) => {
            state.error = action.error.message
            state.transaction = null
        })

    }
})


export default Slice.reducer;
