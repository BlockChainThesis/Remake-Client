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

export const marketPlaceAddress = '0x5ED71a00958e2F749bB5E7f3e57f4646DA486595'
export const marketPlaceABI = marketPlaceContract.abi

export const authenticationAddress = '0x3F4BeFeb8744527161b0A4804AE6E1d15A9114F7'
export const authenticationABI = authenticationContract.abi

export const tokenAddress = '0x7851d6FbeA3f3906452AC1400dF407c7A9391D52'
export const tokenABI = tokenContract.abi

export const cropNFTAddress = '0x1C6565d364eE6571E245665CA9E1afCcCA4Fff69'
export const cropNFTABI = cropNFTContract.abi

     
export const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/'