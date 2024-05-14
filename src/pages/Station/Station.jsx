import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getStationData } from "../../redux/Station/Slice"
import ChartPortal from "../../components/Interface/ChartProtal/ChartProtal"
import SensorList from "../../components/Interface/Sensors/SensorList"
import { setSensorActiveID } from "../../redux/Dashboard/Dashboard"
import Controller from "../../components/Interface/Controller/Controller"
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
            <div className="laptop:max-w-4xl desktop:mx-auto flex flex-col gap-4">
                <div className='border-2 border-main-300 rounded bg-primary-50'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                            Chart
                    </div>
                    <div className="
                        rounded-lg 
                        p-4 flex flex-col justify-center relative w-full h-full">
                        {activeSensor !== -1 ? <ChartPortal stationType={stationId} data={currentSensorHistory}/>
                            : 
                            <div className="font-mono text-2xl font-bold text-main-300">
                                No sensor detected, please select one 
                            </div>
                        }
                    </div>
                </div>
                <div className='border-2 border-main-300 rounded bg-main-300 row-span-1 relative w-full'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Sensor List
                    </div>
                    <SensorList
                            sensorData={currentStation.sensorData}
                            stationId={stationId}
                    />
                </div>
                <div className='border-2 border-main-300 rounded bg-main-300'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Controller List 
                    </div>
                    <Controller/>
                </div>
            </div>
        </div>
    )

}


export default Station 