import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactPaginate from 'react-paginate'
// import XLSX from 'xlsx'
import { controllerAddress } from '../../constant'
import { sensorDataAddress } from '../../constant'
import { NameToUnitMapping } from '../../utils/Mapping'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import { getAllControllersInfo } from '../../redux/Controller/Slice'
import { getAllSensorsData } from '../../redux/Sensor/Slice'
import { useParams } from 'react-router-dom'
import { sensorType as sensorStyle } from '../../components/Interface/Sensors/Sensor'

const History = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const deviceType = params.deviceType

    useEffect(() => {
        deviceType === "controller" ? dispatch(getAllControllersInfo()) : dispatch(getAllSensorsData())
    },[deviceType, dispatch])

    const controllersInfo = useSelector(state => state.controller.controllersInfo)
    console.log(controllersInfo)
    // const controllersInfo = {

    // }
    const sensorsData = useSelector(state => state.sensor.sensorsData)
    const reversedControllerInfo = [...controllersInfo].reverse()


    const contractAddressUrl = `https://sepolia.etherscan.io/address/${controllerAddress}`
    const sensorAddressUrl = `https://sepolia.etherscan.io/address/${sensorDataAddress}`

    const RenderItem = ({currrentItems}) => {
        return(
            <ul className='flex flex-col gap-1'>
            {currrentItems && currrentItems.map((item, index) => 
                <li key={index}>
                {                
                    deviceType === "controller" ? <ControllerItem index={index} controller={item}/>
                    : <SensorItem index={index} sensor={item} />
                }
                </li>
            )}
        </ul>)
    }

    const PaginatedItems = ({ itemsPerPage, items }) =>  {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
          }
    
      
        return (
            <div className='flex flex-col h-full justify-between '>
                <RenderItem currrentItems={currentItems}/>
                <ReactPaginate
                    className='
                    flex self-center gap-2 px-2 py-1 rounded-sm text-main-300 font-mono font-semibold'
                    pageClassName='px-2 rounded-full'
                    activeClassName='bg-main-300 text-white'
                    breakLabel="..."

                    previousLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                    previousClassName="flex justify-center items-center px-0.5 rounded-full"
                    previousLinkClassName="text-main-400 h-fit"

                    nextLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-right "/>
                    nextClassName="flex justify-center items-center px-0.5 rounded-full"
                    nextLinkClassName="text-main-400 h-fit"

                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                />    
            </div>
        )
    }

    const ControllerItem = ({controller, index}) => {
        const signal = controller.value === 1 ? 'on' : 'off'
        // let historyLine = `${controller.deviceName} was turned ${signal}`
        let durationString = ' starting...'
        
        let duration = 0
        if (controller.value === 0) {
            for (
                let i = index + 1;
                i < reversedControllerInfo.length;
                i++
            ) {
                if (
                    reversedControllerInfo[i].deviceName ==
                        controller.deviceName &&
                    reversedControllerInfo[i].value === 1
                ) {
                    duration = Math.floor(
                        Math.abs(
                            new Date(controller.createAt) -
                                new Date(reversedControllerInfo[i].createAt)
                        )
                    )
                    const hour = Math.floor(duration / (1000 * 60 * 60))
                    const minute = Math.floor(duration / (1000 * 60))
                    const second = (duration / 1000) % 60
                    durationString = `:${hour}:${minute}:${second}`
                    break
                }
            }
        }
        return (
            <li className='w-full py-1 rounded border-b font-mono text-lg flex flex-col'>
                {/* <span className='font-semibold'>
                    {controller.createAt}:{' '}
                </span> */}
                <div className='flex justify-between'>
                    <p className='font-semibold text-base text-primary-400'>
                        {controller.deviceName}
                    </p>    
                    <FontAwesomeIcon icon="fa-solid fa-power-off" className={`text-base ${signal === 'on' ? 'text-green-400': 'text-red-500'}`}/>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2  text-xs'> 
                                <FontAwesomeIcon
                                    icon='fa-solid fa-clock'
                                    className='text-primary-400'
                                />
                                <p className='font-light leading-3 text-neutral-500'>
                                    {controller.createAt}   
                                </p>
                        </div>
                    <span className='text-sm leading-1 text-primary-200'>{durationString}</span>
                </div>

            </li>
        )
    }

    const SensorItem = ({sensor, index}) => {
        // const historyLine = `${sensor.sensorType} = ${sensor.value}${
        //     NameToUnitMapping[sensor.sensorType]
        // }`

        return (
            <li key={index} className='w-full py-1 rounded border-b font-mono text-base flex justify-between items-center'>
                <div className='flex flex-col'>
                    <span
                        className="text-xs text-neutral-400"
                    >
                        {sensor.createAt}:{' '}
                    </span>
                    <p className={`font-bold ${sensor.sensorType.startsWith('Water')
                                ? "text-blue-300"
                                : sensor.sensorType.startsWith('Soil')
                                ? "text-yellow-700"
                                : "text-neutral-500"}`}>

                        {`${sensor.sensorType} = ${sensor.value}${NameToUnitMapping[sensor.sensorType]}`}   
                    </p>
                </div>
                <FontAwesomeIcon 
                    icon={`fa-solid ${sensor.sensorType.startsWith('Soil')? 
                        sensorStyle.earth.icon    
                        : sensor.sensorType.startsWith('Water') ? sensorStyle.water.icon 
                        : sensorStyle.air.icon 
                    }`}
                    className={`text-2xl p-2 ${
                        sensor.sensorType.startsWith('Soil')? sensorStyle.earth.text
                        : sensor.sensorType.startsWith('Water') ? sensorStyle.water.text 
                        : sensorStyle.air.text 
                    }`}/>

            </li>
        )
    }

    return (
        <div className='flex-nowrap flex flex-col w-full gap-3 bg-white p-3 rounded-lg'>
            <p className='text-xl font-bold text-main-300 self-start'>{deviceType === "controller" ? `Controller History` : `Sensor History`}</p>
            <a 
                href={deviceType === "controller" ? contractAddressUrl : sensorAddressUrl}
                className='font-mono text-xs self-start underline text-primary-400 -mt-2 ml-0.5'>
                    View more at EtherScan
            </a>
            {/* <ul className='flex flex-col gap-2 w-full h-auto bg-white rounded-lg py-4 px-5 justify-between items-center'> */}
            <PaginatedItems itemsPerPage={7} items={deviceType=== "controller" ? reversedControllerInfo : sensorsData}/>    
            {/* <div className='absolute bottom-1 right-0 p-[inherit]'>
                    <FontAwesomeIcon 
                    onClick={deviceType=== "controller" ? handleExportControllerInfoToExcel :handleExportSensorsDataToExcel}
                    icon="fa-solid fa-file-export"  className='text-lg text-main-300 hover:text-main-100'/>
            </div> */}
        </div>
    )
}


export default History