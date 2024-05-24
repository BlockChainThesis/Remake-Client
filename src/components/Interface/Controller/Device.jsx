import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {deviceIndexToNameMapping} from '../../../utils/Mapping'
import { fetchControllerInfo, publishControllerInfo } from '../../../redux/Adafruit/Slice'

import { addControllerInfoToBlockChain, updateSignal } from '../../../redux/Controller/Slice'
import { pushControllerInfo } from '../../../redux/History/History'
import {resetAll} from '../../../redux/History/History'

import RegionPump from '../../../assets/Dashboard/Device/Region.png'
import NutritionMixing from '../../../assets/Dashboard/Device/Nutritious.png'
import MainPump from '../../../assets/Dashboard/Device/MainPump.png'
import Switch from '../../UI/Switch/Switch'


const Device = ({device}) => {
    const nameOfDevice = deviceIndexToNameMapping[device.index]
    const deviceGroup1 = device.index == 1 || device.index == 2 || device.index == 3
    const deviceGroup2 = device.index == 4 || device.index == 5 || device.index == 6

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const controllerSignals = useSelector((state) => state.controller.controllerSignals)
    const controllers = useSelector((state) => state.history.controllersInfo)
    const controllersCount = useSelector((state) => state.history.controllersCount)


    const feedName = `relays.relay${device.index}`
    useEffect(() => {
        dispatch(fetchControllerInfo({device,feedName}))
    }, [])

    const handleChange = async (nextChecked) => {
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }
        const vietnamTime = new Date().toLocaleString('en-US', options)

        const controller = {
            deviceName: nameOfDevice,
            createAt: vietnamTime,
            value: nextChecked ? 1 : 0,
        }

        if (controllersCount === 10) {
            const arrayFertilizers = []
            for (let i = 0; i < controllers.length; i++) {
                if (
                    controllers[i].deviceName === 'Nutritious Liquid 1' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('N')) arrayFertilizers.push('N')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 2' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('P')) arrayFertilizers.push('P')
                } else if (
                    controllers[i].deviceName === 'Nutritious Liquid 3' &&
                    controllers[i].value === 1
                ) {
                    if (!arrayFertilizers.includes('K')) arrayFertilizers.push('K')
                }
            }
            dispatch(addControllerInfoToBlockChain())
            dispatch(resetAll())
        }
        //Publish NOW
        dispatch(pushControllerInfo(controller))
        dispatch(updateSignal([device.index, nextChecked]))
        console.log(controllerSignals)
        // publish to adafruit
        const feedName = `relays.relay${device.index}`
        const value = Number(nextChecked)
        dispatch(publishControllerInfo({feedName,value}))
    }

    const deviceStatus = controllerSignals[device.index - 1] == 1

    return (
        <>
            <div className='flex gap-2 items-center bg-main-100 rounded p-2'>
                {deviceGroup1 ? (
                        <img className='max-w-[55px] desktop:max-w-[150px]' src={NutritionMixing} />
                    ) : deviceGroup2 ? (
                        <img className='max-w-[55px] desktop:max-w-[150px]' src={RegionPump} />
                    ) : (
                        <img className='max-w-[55px] desktop:max-w-[150px]' src={MainPump} />
                    )}
                <div className='flex flex-col gap-1'>
                    <p className='text-main-300 font-semibold text-xs'>{nameOfDevice}</p>
                    <Switch
                        onChange={handleChange}
                        isEnabled={user}
                        checked={deviceStatus}
                    />
                </div>
            </div>
        </>
    )
}

export default Device
