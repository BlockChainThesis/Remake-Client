import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from './Loading/Slice';
import authReducer from './Auth/Slice';
import controlerReducer from './Controller/Slice';
import cropReducer from './Crop/Slice';
import dashboardReducer from './Dashboard/Dashboard';
import stationReducer from './Station/Slice';
import marketReducer from './Market/Slice';
import NFTReducer from './NFT/Slice';
import walletReducer from './Wallet/Slice';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    controller: controlerReducer,
    crop: cropReducer,
    dashboard: dashboardReducer,
    station: stationReducer,
    market: marketReducer,
    cropNFT: NFTReducer,
    wallet: walletReducer,
  },
});

export default store;
