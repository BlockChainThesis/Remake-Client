import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/Slice';
import controlerReducer from './Controller/Slice';
import cropReducer from './Crop/Slice';
import stationReducer from './Station/Slice';
import marketReducer from './Market/Slice';
import NFTReducer from './NFT/Slice';
import walletReducer from './Wallet/Slice';
import interfaceReducer from './Interface/Slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    controller: controlerReducer,
    crop: cropReducer,
    station: stationReducer,
    market: marketReducer,
    cropNFT: NFTReducer,
    wallet: walletReducer,
    interface: interfaceReducer,
  },
});

export default store;
