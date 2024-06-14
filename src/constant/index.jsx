// **************USING FOR HOSTING**************
// import cropInfo from './json/CropInfo.json';
// import controllerContract from './json/ControllerContract.json';
// import stationDataContract from './json/StationDataContract.json';
// import marketPlaceContract from './json/Crop_MarketPlace.json';
// import authenticationContract from './json/Authentication.json';
// import tokenContract from './json/Floppy.json';
// import cropNFTContract from './json/CropNFT.json';
// import transactionContract from './json/Transactions.json';

// export const cropInfoAddress = '0x8fed88D7b12672BB1bb2bB8DD89fC46125a37E2E';
// export const cropInfoABI = cropInfo.abi;

// export const controllerAddress = '0xe4156ca2f2D226Db8b9676e8B4a51110D1D68284';
// export const controllerABI = controllerContract.abi;

// export const stationDataAddress = '0xFdB7b936e51EC559A56A14773d25322CCA5202C4';
// export const stationDataABI = stationDataContract.abi;

// export const marketPlaceAddress = '0xaF4BA77D99cb738D46B676a0b085732265AA5587';
// export const marketPlaceABI = marketPlaceContract.abi;

// export const authenticationAddress = '0xaed13DFf4f62b26f214192D1C119fFD15A98F09E';
// export const authenticationABI = authenticationContract.abi;

// export const tokenAddress = '0x8C44bD007D7Abb7a078a4929A259B977723Dfe61';
// export const tokenABI = tokenContract.abi;

// export const cropNFTAddress = '0xdf90cC2b39894F9dC994CCeB0dAeE20ed76E8c66';
// export const cropNFTABI = cropNFTContract.abi;

// export const transactionAddress = '0x392c3575aD9Df38C6ca30fbC7772851F6d9524bf';
// export const transactionABI = transactionContract.abi;

// **************USING FOR LOCAL**************
import address from '../../../SmartContracts/config.json';
import cropInfo from '../../../SmartContracts/artifacts/contracts/CropInfo.sol/CropInfo.json';
import tokenContract from '../../../SmartContracts/artifacts/contracts/Token.sol/Floppy.json';
import cropNFTContract from '../../../SmartContracts/artifacts/contracts/CropNFT.sol/CropNFT.json';
import transactionContract from '../../../SmartContracts/artifacts/contracts/Transaction.sol/Transactions.json';
import controllerContract from '../../../SmartContracts/artifacts/contracts/ControlData.sol/ControllerContract.json';
import stationDataContract from '../../../SmartContracts/artifacts/contracts/StationData.sol/StationDataContract.json';
import marketPlaceContract from '../../../SmartContracts/artifacts/contracts/CropMarketPlace.sol/Crop_MarketPlace.json';
import authenticationContract from '../../../SmartContracts/artifacts/contracts/Authentication.sol/Authentication.json';

export const cropInfoAddress = address['bnb_testnet'].CropInfo;
export const cropInfoABI = cropInfo.abi;

export const controllerAddress = address['bnb_testnet'].Controller;
export const controllerABI = controllerContract.abi;

export const stationDataAddress = address['bnb_testnet'].Station;
export const stationDataABI = stationDataContract.abi;

export const marketPlaceAddress = address['bnb_testnet'].CropMarket;
export const marketPlaceABI = marketPlaceContract.abi;

export const authenticationAddress = address['bnb_testnet'].Auth;
export const authenticationABI = authenticationContract.abi;

export const tokenAddress = address['bnb_testnet'].FLP;
export const tokenABI = tokenContract.abi;

export const cropNFTAddress = address['bnb_testnet'].CropNFT;
export const cropNFTABI = cropNFTContract.abi;

export const transactionAddress = address['bnb_testnet'].Transaction;
export const transactionABI = transactionContract.abi;

export const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/';
