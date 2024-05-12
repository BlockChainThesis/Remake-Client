import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchStationData, getNumberofStations} from '../../../redux/Station/Slice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import FarmerIcon from '../../../assets/Station/farmerIcon.png'

const StationList = () => {
    const stationData = useSelector(state => state.station.stationData)
    const stationCount = useSelector(state => state.station.stationCount)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStationData())
        dispatch(getNumberofStations())
    },[dispatch])

    return (
        <>
            <div className='
            flex flex-col gap-10 px-4 py-2
            bg-white backdrop-blur-lg rounded-lg w-full h-auto'>
                <div className=''>
                    <h1 className='font-bold text-2xl text-primary-500 uppercase mb-6'>Stations List</h1>
                    <div className='flex w-fit'>
                        <img src={FarmerIcon} className='max-w-12 tablet:max-w-16'/>
                        <p className='top-0 bg-primary-400 rounded-t-lg rounded-br-lg w-fit p-2 h-fit
                        italic text-sm text-main-100'
                        > <span className='text-lg font-bold font-mono '>{stationCount}</span> stations are presently in operation.</p>
                    </div>
                </div>
                <div className='h-full flex flex-col gap-3'>
                {                        
                    stationData.map((station,index) => (
                        <Link to={`${station.stationId}`} className='shadow-lg
                        group hover:bg-main-300
                        rounded-lg p-2 font-mono flex bg-white w-full items-center gap-4' key={index}>
                            <FontAwesomeIcon 
                            className='group-hover:text-white
                            text-2xl text-main-300'
                            icon="fa-solid fa-tower-broadcast" />
                            <div className='group-hover:text-white
                            font-semibold text-main-300 flex-1'>
                                Station Name: {station.stationId} 
                                <div className='
                                group-hover:text-primary-300
                                flex font-thin gap-2 text-neutral-400 text-xs italic'>
                                    <p>
                                        Longitude: 
                                        {station.longitude} 
                                    </p>
                                    <p>
                                        Latitude: 
                                        {station.latitude}
                                    </p>
                                </div>
                            </div>
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" className='group-hover:text-white
                            text-2xl text-main-300' />
                        </Link>
                    ))
                }
                </div>
            </div>
        </>
    )
}

export default StationList