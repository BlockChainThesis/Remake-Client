import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenticate } from "../Auth/Slice";

import { ethers } from 'ethers'
import { controllerABI, controllerAddress } from "../../constant";
import { setLoadingState } from "../Loading/Slice";
const { ethereum } = window
//Create Controller Contact 
const createControllerContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner() //comment this
    const controllerContract = new ethers.Contract(controllerAddress, controllerABI, signer) //change signer to wallet
    return controllerContract
}
//Fetch data 
export const fetchControllerData = createAsyncThunk(
    'controller/fetchControllerData',
    async (_,{dispatch, getState, rejectWithValue}) => {
        const globalState = getState()
        try {
            dispatch(authenticate())
            return globalState.auth.currentAccount
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.toString());

        }
    }   
)

//GEt all controllers Info 
export const getAllControllersInfo = createAsyncThunk(
    'controller/getAllControllersInfo',
    async (_,{dispatch}) => {
        try {
            if(ethereum) {
                dispatch(setLoadingState(true))
                const controllerContract = createControllerContract()
                const availableControllersInfo = await controllerContract.getAllControllersInfo()
                const structuredControllersInfo = availableControllersInfo.map((controller) => ({
                    deviceName: controller.deviceName,
                    createAt: controller.createAt,
                    value: parseInt(controller.value),
                }))
                dispatch(setLoadingState(false))
                return structuredControllersInfo
            }
        }catch (error) {
            console.log(error)
        }

    }   
)

//add Controller Info to BlockChain

export const addControllerInfoToBlockChain = createAsyncThunk(
    'controller/addControllerInfoToBlockChain', 
    async () => {
        try {
            if (ethereum) {
                const controllerContract = createControllerContract()

                //format before adding if needed ...
                const controllerHash = await controllerContract.addControllerInfo(controllers)
                await controllerHash.wait() //important

                const controllersCount = await controllerContract.getNumberOfControllersInfo()
                return parseInt(controllersCount)
            } else {
                //todo
            }
        } catch (error) {
            console.log(error)
        }
    }
)


export const Slice = createSlice({
    name:'controller',
    initialState: {
        controllersInfo: [],
        controllersCount: 0,
        controllerSignals: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    reducers: {
        updateSignal: (state, action) => {
            const index = action.payload[0] - 1
            const newSignal = action.payload[1]
            state.controllerSignals[index] = newSignal
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchControllerData.fulfilled, () => {
                getAllControllersInfo()
            })
            .addCase(fetchControllerData.rejected, (action) => {
                // Handle the rejected case
                console.error('Connection failed:', action.payload)
            })
            .addCase(getAllControllersInfo.fulfilled, (state, action) => {
                const sortedSensorsData = action.payload.sort(
                    (sensorData1, sensorData2) =>
                        new Date(sensorData2.createAt) - new Date(sensorData1.createAt)
                )
                state.controllersInfo = sortedSensorsData
            })
            .addCase(addControllerInfoToBlockChain.fulfilled, (state, action) => {
                state.controllersCount = action.payload
            })
    }
})

// Action creators are generated for each case reducer function
export const { updateSignal } = Slice.actions

export default Slice.reducer
