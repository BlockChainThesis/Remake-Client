import Sensor from '../../assets/History/sensor.png'
import Controller from '../../assets/History/controller.png'
import { Link } from 'react-router-dom'

const Select = () => {
    return (
        <>
            <div className='
            absolute top-1/2 -translate-y-1/2 z-0
            w-full h-full max-h-[60%] left-0 flex flex-col gap-3 py-12 px-[inherit]'>
                    <Link to={'/menu/history/station'}
                    className="
                    group hover:bg-primary-300 shadow-select
                    p-5 h-full w-full bg-primary-400 flex items-center justify-between rounded-xl">
                         <p className='
                        group-hover:text-main-300 
                        text-xl self-start font-bold text-main-100'>
                            Station
                        </p>
                        <img src={Sensor} className=' group-hover:opacity-50 max-w-[100px]'/>
                    </Link>
                    <Link to={'/menu/history/controller'}
                    className="
                    group hover:bg-primary-300 shadow-select pot
                    p-5 h-full w-full bg-primary-400 flex items-center justify-between rounded-xl">
                        <p className='
                        group-hover:text-main-300 
                        text-xl self-start font-bold text-main-100'>
                            Controller
                        </p>
                        <img src={Controller} className=' group-hover:opacity-50 max-w-[100px]'/>
                    </Link>
            </div>
        </>
    )
}

export default Select