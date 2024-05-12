import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { sensorDataABI, sensorDataAddress } from '../../constant'
import { authenticate } from '../Auth/Slice'
import { setLoadingState } from '../Loading/Slice'

const { ethereum } = window

const createSensorDataContract = () => {
    // const privateKey = import.meta.env.VITE_PRIVATE_KEY; //to use this, create .env at root and include your private key there
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    // const wallet = new ethers.Wallet(privateKey, provider); //uncomment this
    const sensorDataContract = new ethers.Contract(sensorDataAddress, sensorDataABI, signer) //change signer to wallet
    return sensorDataContract
}



//Fetch Sensor data
export const fetchSensorData = createAsyncThunk(
    'sensor/fetchSensorData', 
    async (_,{rejectWithValue, dispatch, getState}) => {
        const globalState = getState()
        try {
            dispatch(authenticate())
            return globalState.auth.currentAccount
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.toString());
        }
    }
)

//Get All Sensors Data
export const getAllSensorsData = createAsyncThunk(
    'sensor/getAllSensorsData',
    async (_,{dispatch}) => {
        try {
            if (ethereum) {
                dispatch(setLoadingState(true))
                const sensorDataContract = createSensorDataContract()

                const availableSensorsData = await sensorDataContract.getAllSensorsData()

                const structuredSensorsData = availableSensorsData.map((sensor) => ({
                    sensorType: sensor.sensorType,
                    createAt: sensor.createAt,
                    value: parseInt(sensor.value),
                }))
                dispatch(setLoadingState(false))

                return structuredSensorsData
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }
)


export const getNumOfSensorData = createAsyncThunk(
    'sensor.getNumOfSensorData', 
    async () => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()
                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                return parseInt(sensorsCount)
            }
        } catch (error) {
            console.log(error)
        }
    }
)

export const addSensorDataToBlockChain = createAsyncThunk(
    'sensor/addSensorDataToBlockChain', 
    async (sensors) => {
        try {
            if (ethereum) {
                const sensorDataContract = createSensorDataContract()

                //format before adding if needed ...
                const sensorHash = await sensorDataContract.addSensorsData(sensors)
                await sensorHash.wait() //important

                const sensorsCount = await sensorDataContract.getNumberOfSensorsData()
                return parseInt(sensorsCount)
            } else {
                //todo
            }
        } catch (error) {
            console.log(error)
        }
    }
)


//Main Slice
export const Slice = createSlice({
    name: 'sensor',
    initialState: {
        sensorsData: [],
        sensorsCount :0,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSensorData.fulfilled, () => {
                getAllSensorsData()
            })
            .addCase(fetchSensorData.rejected, (action) => {
                // Handle the rejected case
                console.error('Connection failed:', action.payload)
            })
            .addCase(getAllSensorsData.fulfilled, (state, action) => {
                state.sensorsData = action.payload
            })
            .addCase(getNumOfSensorData.fulfilled, (state,action) => {
                state.sensorsCount = action.payload
            })
            .addCase(addSensorDataToBlockChain.fulfilled, (state,action) => {
                state.sensorsCount = action.payload
            })

    },
})


export default Slice.reducer