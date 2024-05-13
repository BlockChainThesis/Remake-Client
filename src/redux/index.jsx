import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './Loading/Slice'
import authReducer from './Auth/Slice'
import controlerReducer from './Controller/Slice'
import historyReducer from './History/History'
import cropReducer from './Crop/Slice'
import adafruitReducer from './Adafruit/Slice'
import sensorReducer from './Sensor/Slice'
import dashboardReducer from "./Dashboard/Dashboard";
import stationReducer from './Station/Slice'
import marketReducer from './Market/Slice'
import cropNFTReducer from './cropNFT/Slice'
import walletReducer from './Wallet/Slice'

const store = configureStore({
    reducer:{
        loading: loadingReducer,
        auth: authReducer,
        controller: controlerReducer,
        history: historyReducer,
        crop: cropReducer,
        adafruit: adafruitReducer,
        sensor: sensorReducer,
        dashboard: dashboardReducer,
        station: stationReducer,
        market: marketReducer,
        cropNFT: cropNFTReducer,
        wallet: walletReducer,
    }
})

export default store;