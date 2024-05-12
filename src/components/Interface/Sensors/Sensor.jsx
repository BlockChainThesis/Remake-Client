import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setSensorActiveID } from '../../../redux/Dashboard/Dashboard'
import {getSensorHistory } from '../../../redux/Station/Slice'

const sensorType = {
    air: {
        background : "bg-neutral-400",
        icon  :"fa-wind",
        text: "text-neutral-400"
    },
    water: {
        background : "bg-blue-300",
        icon  :"fa-water",
        text: "text-blue-300"
    },
    earth: {
        background : "bg-yellow-700",
        icon : "fa-seedling",
        text: "text-yellow-700"
    }
}

const stationTypeSet= (id) => {
    if(!id) return; 
    const type = id.substring(0, id.search('_'))
    return type
}

const sensorStyleKit = (station, type, active = -1) => {
    const stationType = stationTypeSet(station)
    switch(type){
        case 'icon':
            return stationType === 'air' ? "fa-wind" :
            stationType === 'water' ? "fa-water" : "fa-seedling";
        case 'background':
            // return active ? "bg-neutral-400" : 'bg-white';
            return active ? stationType === 'air' ? "bg-neutral-400" :
            stationType === 'water' ? "bg-blue-300" : "bg-yellow-700" : 'bg-white';
        case 'text': 
            // return active ?  'text-white': "text-neutral-400";
            return !active ? stationType === 'air' ? "text-neutral-400" :
            stationType === 'water' ? "text-blue-300" : "text-yellow-700" : 'text-white';
        case 'chart-background':
            return stationType === 'air' ? "rgb(163, 163, 163, 0.5)" :
            stationType === 'water' ? "rgb(147 197 253)" : 'rgb(202, 138, 4, 0.5)';
        case 'chart-border':
                return stationType === 'air' ? "rgb(163, 163, 163)" :
                stationType === 'water' ? "rgb(14, 165, 233)" : 'rgb(202, 138, 4)';
        default:
    }
}

const Sensor = ({station, id, unit ,value }) => {
    const dispatch = useDispatch()
    //UI element active or not
    const activeID = useSelector(state => state.dashboard.sensorActiveID)
    const [sensorActive, setSensorActive] = useState(false)
    useEffect(()=> {
        setSensorActive(activeID === id)
    },[activeID, id])
    const onClickHandler = () => {
        dispatch(setSensorActiveID(id))
        dispatch(getSensorHistory({stationId: station, sensorId: id, length: '5'}))
    }
    return( 
        <>
            <div 
            onClick={onClickHandler}
            className={`flex gap-8 w-full h-full absolute
            ${sensorStyleKit(station, 'background',sensorActive)}
            items-center justify-evenly rounded-lg px-6 py-1`}>
                <FontAwesomeIcon
                    icon={`fa-solid ${sensorStyleKit(station,'icon')}`}
                    className={`desktop:text-9xl
                    text-8xl ${sensorStyleKit(station,'text', sensorActive)}`}
                />
                <div className="h-full flex flex-col justify-center">
                        <p className={`desktop:text-5xl
                        font-bold w-full text-2xl uppercase
                            ${sensorStyleKit(station,'text', sensorActive)}
                        `}>
                            {stationTypeSet(id)}
                        </p>
                        <p className={`desktop:text-5xl font-bold text-2xl 
                            ${sensorStyleKit(station, 'text', sensorActive)}`}>
                            {value}
                            <span>{unit}</span>
                        </p>
                    </div>
            </div>
        </>

    )
}

export {sensorType , sensorStyleKit, stationTypeSet}
export default Sensor