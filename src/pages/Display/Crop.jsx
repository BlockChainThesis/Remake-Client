import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


const Crop = (props) => {

    const crop = props.crop
    return (
        <>
            <div className="p-2 rounded-lg w-full bg-primary-50 backdrop-blur-3 shadow-crop-display">
                <div className='font-bold text-xl flex  text-primary-700 items-center justify-between  '> 
                    <div className='flex items-baseline gap-1'>
                        {crop.cropType}
                        {/* <NavLink className='flex group' to={`detail/${parseInt(crop.cropId)}`}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" className='text-sm group-hover:text-main-200' />
                        </NavLink> */}
                        <Link className='flex group' to={`detail/${parseInt(crop.cropId)}`}>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" className='text-sm group-hover:text-main-200' />
                        </Link>
                    </div>
                    <span className='justify-self-end font-light text-xs font-mono text-primary-300'>{crop.plantingDate.split(',')[0]}</span>
                </div>
                <div className='font-mono pl-2 text-main-300 text-sm'>
                    <div className='flex jutify-center items-center font-semibold'>
                        <p>No.months to harvest: </p>
                        <span className='text-yellow-600'>{parseInt(crop.harvestDate)}</span>
                    </div>
                    <div className='flex jutify-center items-center font-semibold'>
                        <p>Fertilizers: </p>
                        <span className='text-yellow-600'>{crop.fertilizers.join(',') || 'None'}</span>
                    </div>
                    <div className='flex jutify-center items-center font-semibold'>
                        <p>Pesticides: </p>
                        <span className='text-yellow-600'>{crop.pesticides.join(', ') || 'None'}</span>
                    </div>
    
                    <div className='flex jutify-center items-center font-semibold'>
                        <p>Diseases: </p>
                        <span className='text-yellow-600'>{crop.diseases.join(', ') || 'None'}</span>
                    </div>
    
                    <div className='flex jutify-center items-center font-semibold '>
                        <p>Additional information:</p>
                        <span className='text-yellow-600'>{crop.additionalInfo || 'None'}</span>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Crop