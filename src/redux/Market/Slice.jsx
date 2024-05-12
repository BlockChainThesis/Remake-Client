import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { marketPlaceABI, marketPlaceAddress } from "../../constant"
import { ethers } from "ethers"
import { setLoadingState } from "../Loading/Slice"

const name = 'market'
const initialState = {
    loading: 'false',
    error: null, 
    marketData: [],
    singleMarketData: {
        owner: '',
        seller: '',
        price: '',
        tokenId: '',
        cropInfo: {
            cropType: '',
            plantingDate: '',
            harvestDate: '',
            fertilizers:'' ,
            pesticides:'' ,
            diseases: '',
            additionalInfo: '',
            actualHarvestDate:'',
        }
    },
    totalNFTs: 0, 
    highestPrice: -1,
    lowestPrice: -1,
}

const { ethereum } = window
const createContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const cropInfoContract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer)
    return cropInfoContract
}


export const listNFT = createAsyncThunk(
    'market/listNFT', 
    async ({cropID,price}, {dispatch, rejectWithValue}) => {
        try {
            if(ethereum){
                dispatch(setLoadingState(true))
                const marketPlaceContact = createContract()
                const response = await marketPlaceContact.listNFT(cropID, price)
                await response.wait()
                dispatch(setLoadingState(false))
                return
            } 
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getAllListedNFTs = createAsyncThunk(
    'market/getAllListedNFTs', 
    async (_, {dispatch, rejectWithValue}) => {
        try {
            if(ethereum){
                dispatch(setLoadingState(true))

                const marketPlaceContact = createContract()
                const rawData = await marketPlaceContact.getAllListedNFTInfo()
                const structuredData = rawData.map((data) => ({
                    owner: data.owner,
                    seller: data.seller,
                    price: data.price,
                    tokenId: data.tokenId,
                    uri: data.uri,
                    cropInfo: {
                        cropType: data.crop.cropType,
                        plantingDate: new Date(data.crop.plantingDate).toLocaleString(),
                        harvestDate: parseInt(data.crop.monthsToHavest),
                        fertilizers: data.crop.fertilizers.join(', ') || '',
                        pesticides: data.crop.pesticides.join(', ') || '',
                        diseases: data.crop.diseases.join(', ') || '',
                        additionalInfo: data.crop.additionalInfo,
                        actualHarvestDate: data.crop.harvestDate,
                    }
                }))
                dispatch(setLoadingState(false))
                return structuredData
            } 
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const getListedNFT = createAsyncThunk( 
    'market/getListedNFT', 
    async (tokenId, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoadingState(true))
            const contract = createContract()
            const rawData = await contract.getListedNFTForId(tokenId)
            const structuredData = {
                owner: rawData.owner,
                seller: rawData.seller,
                price: rawData.price,
                tokenId: rawData.tokenId,
                uri: rawData.uri,
                cropInfo: {
                    cropType: rawData.crop.cropType,
                    plantingDate: new Date(rawData.crop.plantingDate).toLocaleString(),
                    harvestDate: parseInt(rawData.crop.monthsToHavest),
                    fertilizers: rawData.crop.fertilizers.join(', ') || '',
                    pesticides: rawData.crop.pesticides.join(', ') || '',
                    diseases: rawData.crop.diseases.join(', ') || '',
                    additionalInfo: rawData.crop.additionalInfo,
                    actualHarvestDate: rawData.crop.harvestDate,
                }
            }
            dispatch(setLoadingState(false))

            return structuredData
        }catch(error) {
            return rejectWithValue(error)
        }
    }
)

export const getTotalNFTs = createAsyncThunk(
    'market/getTotalNFTs', 
    async(_,{rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const rawData = await contract.getNFTsCount()
            dispatch(setLoadingState(false))

            return rawData
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const getHighestPrice = createAsyncThunk(
    'market/getHighestPrice', 
    async(_,{rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const rawData = await contract.getHighestPrice()

            dispatch(setLoadingState(false))
            return rawData
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const getLowestPrice = createAsyncThunk(
    'market/getLowestPrice', 
    async(_,{rejectWithValue, dispatch}) => {
        try{
            dispatch(setLoadingState(true))

            const contract = createContract()
            const rawData = await contract.getLowestPrice()

            dispatch(setLoadingState(false))
            return rawData
        }catch(error){
            return rejectWithValue(error);
        }
    }
)
export const Slice = createSlice({
    name: name,
    initialState,
    reducers:{
        setLoadingState : (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllListedNFTs.fulfilled, (state,action) => {
                state.loading = false
                state.marketData = action.payload
            })
            .addCase(getAllListedNFTs.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllListedNFTs.rejected, (state, action) => {
                state.error = action.error.message
                state.marketData = null
            })
            .addCase(getListedNFT.fulfilled, (state,action) => {
                state.loading = false
                state.singleMarketData = action.payload
            })
            .addCase(getListedNFT.pending, (state) => {
                state.loading = true
            })
            .addCase(getListedNFT.rejected, (state, action) => {
                state.error = action.error.message
                state.singleMarketData = {}
            })
            .addCase(getTotalNFTs.fulfilled, (state,action) => {
                state.loading = false
                state.totalNFTs = action.payload
            })
            .addCase(getTotalNFTs.pending, (state) => {
                state.loading = true
            })
            .addCase(getTotalNFTs.rejected, (state, action) => {
                state.error = action.error.message
                state.totalNFTs = {}
            })
            .addCase(getHighestPrice.fulfilled, (state,action) => {
                state.loading = false
                state.highestPrice = action.payload
            })
            .addCase(getHighestPrice.pending, (state) => {
                state.loading = true
            })
            .addCase(getHighestPrice.rejected, (state, action) => {
                state.error = action.error.message
                state.highestPrice = -1
            })
            .addCase(getLowestPrice.fulfilled, (state,action) => {
                state.loading = false
                state.lowestPrice = action.payload
            })
            .addCase(getLowestPrice.pending, (state) => {
                state.loading = true
            })
            .addCase(getLowestPrice.rejected, (state, action) => {
                state.error = action.error.message
                state.lowestPrice = -1
            })
        }
})

export default Slice.reducer;
