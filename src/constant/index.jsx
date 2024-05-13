import cropInfo from './json/CropInfo.json'
import controllerContract from './json/ControllerContract.json'
import sensorContract from './json/SensorDataContract.json'
import stationDataContract from './json/StationDataContract.json'
import marketPlaceContract from './json/Crop_MarketPlace.json'
import authenticationContract from './json/Authentication.json'
import tokenContract from './json/Floppy.json'
import cropNFTContract from './json/CropNFT.json'

export const cropInfoAddress = '0x8fed88D7b12672BB1bb2bB8DD89fC46125a37E2E'
export const cropInfoABI = cropInfo.abi

export const controllerAddress = '0x70b807f50814b46e722074fF49816DDd214a2632'
export const controllerABI = controllerContract.abi

export const sensorDataAddress = '0x30e04Bf0cfcC2c6E94FE385854656f5963460d32'
export const sensorDataABI = sensorContract.abi

export const stationDataAddress = '0xf65826aDf72Ad338428AD934b13c2b73e32268C8'
export const stationDataABI = stationDataContract.abi

export const marketPlaceAddress = '0x6805Bf08AEe86Fad0a0dbB19730683efDa6ae150'
export const marketPlaceABI = marketPlaceContract.abi

export const authenticationAddress = '0x3F4BeFeb8744527161b0A4804AE6E1d15A9114F7'
export const authenticationABI = authenticationContract.abi

export const tokenAddress = '0x8B6942ceDFcC1f76f82185871BAF92F1F0b16077'
export const tokenABI = tokenContract.abi

export const cropNFTAddress = '0x32fc294C2B99fB75782CbD42f5e9F5814Ea93541'
export const cropNFTABI = cropNFTContract.abi

     
export const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/'