import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getStationData } from "../../../redux/Station/Slice"
import ChartPortal from "../ChartProtal/ChartProtal"
import SensorList from "../Sensors/SensorList"
import { setSensorActiveID } from "../../../redux/Dashboard/Dashboard"
import Controller from "../Controller/Controller"
const Station = () => {
    const params = useParams()
    const stationId = params.stationId
    const dispatch = useDispatch()

    const currentStation = useSelector(state => state.station.currentStation)
    const activeSensor = useSelector(state => state.dashboard.sensorActiveID)
    const currentSensorHistory = useSelector(state => state.station.currentSensorHistory) 

    useEffect( () => {
        dispatch(getStationData(stationId))
        dispatch(setSensorActiveID(-1))
    }, [dispatch,stationId])

    if (!currentStation || !stationId) return
    return (
        <div className="w-full">
            <div className="laptop:max-w-4xl desktop:mx-auto
                grid grid-rows-5 relative h-full
                gap-y-3
            ">
            <div className="row-span-3 relative mx-1">  
                <div className="
                rounded-lg 
                p-4 flex flex-col justify-center
                bg-white relative w-full h-full">
                {activeSensor !== -1 ? <ChartPortal stationType={stationId} data={currentSensorHistory}/>
                    : 
                    <div className="font-mono text-2xl font-bold text-main-300">
                        No sensor detected, please select one 
                    </div>
                }
            </div>
            </div>
            <div className="row-span-1 relative w-full">
                <SensorList
                    sensorData={currentStation.sensorData}
                    stationId={stationId}
                />
            </div>
            <div className="row-span-1 relative w-full">
                <Controller/>
            </div>
            </div>
        </div>
    )

}


export default Station 