import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { controllerAdafruit, sensorAdafruit, sensorAdafruit2} from "../../constant/adafruit/adafruit";
import axios from 'axios'
import { updateSignal } from "../Controller/Slice";

//Fetch controller Info
export const fetchControllerInfo = createAsyncThunk(
    'adafruit/fetchControllerInfo', 
    async ({device, feedName},{dispatch}) => {
        const url = `https://io.adafruit.com/api/v2/${controllerAdafruit.username}/feeds/${feedName}`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': controllerAdafruit.apiKey,
                },
            })
            const data = response.data;
            dispatch(updateSignal([device.index, parseInt(data.last_value)]))
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
)
//Publish Controller Info
export const publishControllerInfo = createAsyncThunk(
    'adafruit/publishControllerInfo',
    async({feedName, value}) => {
        const url = `https://io.adafruit.com/api/v2/${controllerAdafruit.username}/feeds/${feedName}/data`
        try {
            await axios.post(
                url,{
                    value: value,
                },{
                    headers: {
                        'X-AIO-Key': controllerAdafruit.apiKey,
                    },
                }
                
            )
        } catch (error) {
            console.error('Error writing data to Adafruit IO:', error)
        }
    }
)
//Fetch sensor data
export const fetchSensorData = createAsyncThunk(
    'adafruit/fetchSensorData', 
    async ({feedName}) => {
        const url = `https://io.adafruit.com/api/v2/${sensorAdafruit.username}/feeds/${feedName}`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': sensorAdafruit.apiKey,
                },
            })
            return response.data.last_value
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
)

//Fetch sensor data 2
export const fetchSensorData2 = createAsyncThunk(
    'adafruit/fetchSensorData2', 
    async ({feedName}) => {
        const url = `https://io.adafruit.com/api/v2/${sensorAdafruit2.username}/feeds/${feedName}`
        try {
            const response = await axios.get(url, {
                headers: {
                    'X-AIO-Key': sensorAdafruit2.apiKey,
                },
            })
            // console.log(response.data.last_value)
            return response.data.last_value
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
)


export const Slice = createSlice({
    name: 'adafruit',
    initialState: {
        sensorCount:0,
    },
    reducers:{
        setSensorCount : (state, action) => {
            state.sensorCount = action.payload
        }
    },
    extraReducers: (builder) => {
            builder
            // .addCase(fetchControllerInfo.fulfilled,() => {
            //     console.log('fetch data successfully')
            // })
            .addCase(publishControllerInfo.fulfilled,() => {
                console.log('publish data successfully')
            })
            // .addCase(fetchSensorData.fulfilled, (state, action) => {
            //     state.sensorData = action.payload
            // })
            // .addCase(fetchSensorData2.fulfilled, (state, action) => {
            //     state.sensorData2 = action.payload
            // })
    }
})
export const {setSensorCount} = Slice.actions

export default Slice.reducer
