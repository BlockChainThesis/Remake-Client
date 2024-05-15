import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ethers } from 'ethers'
import { cropNFTABI, cropNFTAddress } from "../../constant"
import { marketPlaceABI, marketPlaceAddress } from "../../constant"

import { setLoadingState } from "../Loading/Slice"
import axios from "axios"

const name = 'cropNFT'
const initialState = {
    error: null,
    loading: false, 
    NFTs: [],
    NFTurl: '',
    isNFT: null,
    listedNFT: [],
    unListedNFT : [],
}

const { ethereum } = window
const createContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(cropNFTAddress, cropNFTABI, signer)
    return contract
}

const createMarketContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketPlaceAddress, marketPlaceABI, signer)
    return contract
}


export const approveNFT = createAsyncThunk(
    'cropNFT/approveNFT', 
    async (tokenId, {dispatch, rejectWithValue}) => {
        try {
            if(ethereum){
                dispatch(setLoadingState(true))
                const cropNFTContract = createContract()
                const response = await cropNFTContract.approveNFT(marketPlaceAddress, tokenId)
                await response.wait()
                console.log("Approve successfully")
                dispatch(setLoadingState(false))
                return
            } 
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)


export const createNFT = createAsyncThunk(
    'cropNFT/createNFT', 
    async ({NFTurl, cropID}, {rejectWithValue, dispatch} ) => {
        try {
            dispatch(setLoadingState(true))

            const contract = createContract()
            const response = await contract.createCropNFT(NFTurl, cropID)
            await response.wait()
            dispatch(setLoadingState(false))
            return 
        }catch (error){
            return rejectWithValue(error)
        }
    }
)

export const createURL = createAsyncThunk(
    'cropNFT/createURL', 
    async ({cropID, image}, {rejectWithValue, dispatch} ) => {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        let data = new FormData();
        data.append('file', image)

        // Set the metadata if needed
        const metadata = JSON.stringify({
            name: cropID,
        })
        data.append('pinataMetadata', metadata)

        try {
            dispatch(setLoadingState(true))
            const response = await axios.post(url, data, {
                maxContentLength: "Infinity", // needed to prevent axios from erroring out with large files
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: import.meta.env.VITE_API,
                    pinata_secret_api_key: import.meta.env.VITE_SECRET
                }
            })
            dispatch(setLoadingState(false))
            return response.data.IpfsHash
        }catch (error){
            return rejectWithValue(error)
        }
    }
)

export const checkNFT = createAsyncThunk(
    'cropNFT/checkNFT', 
    async (cropID, {rejectWithValue, dispatch} ) => {
        try {
            dispatch(setLoadingState(true))
            const contract = createContract()
            const response = await contract.isNFT(cropID)
            dispatch(setLoadingState(false))
            return response
        }catch (error){
            return rejectWithValue(error)
        }
    }
)


export const getMyListedNFTInfo = createAsyncThunk(
    'cropNFT/getMyListedNFTInfo' , async (_,{rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoadingState(true))
            const contract = createMarketContract()
            const response = await contract.getMyListedNFTInfo()
            const listedNFT = response.map(curr => ({
                onMarket: curr.currentlyListed,
                crop: {
                    cropType: curr.crop.cropType,
                    plantingDate: new Date(curr.crop.plantingDate).toLocaleString(),
                    harvestDate: parseInt(curr.crop.monthsToHavest),
                    fertilizers: curr.crop.fertilizers.join(', ') || '',
                    pesticides: curr.crop.pesticides.join(', ') || '',
                    diseases: curr.crop.diseases.join(', ') || '',
                    additionalInfo: curr.crop.additionalInfo,
                    actualHarvestDate: curr.crop.harvestDate,
                },
                price: curr.price,
                owner: curr.owner,
                seller: curr.seller,
                tokenId: curr.tokenId,
                uri: curr.uri,

            }))
            dispatch(setLoadingState(false))
            console.log(listedNFT)

            return listedNFT
        }catch (error) {
            return rejectWithValue(error)
       }
    }
)

export const getMyUnlistedNFTInfo = createAsyncThunk(
    'cropNFT/getMyUnlistedNFTInfo' , async (_,{rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoadingState(true))
            const contract = createMarketContract()
            const response = await contract.getMyUnlistedNFTInfo()
            const unlistedNFT = response.map(curr => ({
                onMarket: curr.currentlyListed,
                crop: {
                    cropType: curr.crop.cropType,
                    plantingDate: new Date(curr.crop.plantingDate).toLocaleString(),
                    harvestDate: parseInt(curr.crop.monthsToHavest),
                    fertilizers: curr.crop.fertilizers.join(', ') || '',
                    pesticides: curr.crop.pesticides.join(', ') || '',
                    diseases: curr.crop.diseases.join(', ') || '',
                    additionalInfo: curr.crop.additionalInfo,
                    actualHarvestDate: curr.crop.harvestDate,
                },
                price: curr.price,
                owner: curr.owner,
                seller: curr.seller,
                tokenId: curr.tokenId,
                uri: curr.uri,
            }))
            dispatch(setLoadingState(false))
            return unlistedNFT
        }catch (error) {
            return rejectWithValue(error)
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
        .addCase(createURL.fulfilled, (state,action) => {
            state.loading = false
            state.NFTurl = action.payload
            alert('Create URL successfully!');
        })
        .addCase(createURL.pending, (state) => {
            state.loading = true
        })
        .addCase(createURL.rejected, (state, action) => {
            state.error = action.error.message
            state.NFTurl = null
        })
        .addCase(createNFT.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(createNFT.pending, (state) => {
            state.loading = true
        })
        .addCase(createNFT.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(checkNFT.fulfilled, (state,action) => {
            state.loading = false
            state.isNFT = action.payload
        })
        .addCase(checkNFT.pending, (state) => {
            state.loading = true
        })
        .addCase(checkNFT.rejected, (state, action) => {
            state.error = action.error.message
            state.isNFT = null
        })
        .addCase(getMyListedNFTInfo.fulfilled, (state,action) => {
            state.loading = false
            state.listedNFT = action.payload
        })
        .addCase(getMyListedNFTInfo.pending, (state) => {
            state.loading = true
        })
        .addCase(getMyListedNFTInfo.rejected, (state, action) => {
            state.error = action.error.message
            state.listedNFT = null
        })
        .addCase(getMyUnlistedNFTInfo.fulfilled, (state,action) => {
            state.loading = false
            state.unListedNFT = action.payload
        })
        .addCase(getMyUnlistedNFTInfo.pending, (state) => {
            state.loading = true
        })
        .addCase(getMyUnlistedNFTInfo.rejected, (state, action) => {
            state.error = action.error.message
            state.unListedNFT = null
        })
    }
})

export default Slice.reducer;
