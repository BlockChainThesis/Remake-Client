import { Link, useParams } from "react-router-dom"
import { getCropInfo } from "../../redux/Crop/Slice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { checkNFT } from "../../redux/cropNFT/Slice"

const CropDetails = () => {
    const params = useParams()
    const cropID = params.cropID
    const dispatch = useDispatch()
    const {loading, error, singleCropInfo} = useSelector(state => state.crop)    
    const {isNFT} = useSelector(state => state.cropNFT)    

    useEffect(()=> {
        dispatch(getCropInfo(cropID))
        dispatch(checkNFT(cropID))
    },[dispatch, cropID])

    if(loading || error) return

    return (
    
        <div className="p-4 rounded-2xl gap-3.5 w-full
        bg-transparent border-4 border-main-200 flex flex-col">
           <div className="text-main-100 flex gap-1 items-center text-3xl bg-primary-400  w-fit rounded-md px-4 py-2">
                <FontAwesomeIcon icon="fa-solid fa-seedling" 
                className=""/>
                <p className="text-base tracking-wide font-semibold">
                    DETAIL
                </p>
            </div>
            <div className='border-2 border-main-300 rounded bg-primary-400'>
                <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                    DETAIL
                </div>
    
                <div className="flex flex-col w-full p-3" >
                    <div className='flex items-center justify-between '> 
                        <div className='font-bold items-baseline text-xl text-main-100 gap-2'>
                            {singleCropInfo.cropType}
                        </div>
                        <span className='justify-self-end font-light text-sm font-mono text-primary-100'>
                            {singleCropInfo.plantingDate.split(',')[0]}   
                        </span>
                    </div>
                    <div className='text-xs font-mono pl-2 text-yellow-400'>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>No.months to harvest: </p>
                            <span className="text-main-100">{parseInt(singleCropInfo.harvestDate)}</span>
                        </div>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Fertilizers: </p>
                            <span className="text-main-100">{singleCropInfo.fertilizers || 'None'}</span>
                        </div>
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Pesticides: </p>
                            <span className="text-main-100">{singleCropInfo.pesticides || 'None'}</span>
                        </div>
        
                        <div className='flex jutify-center items-center font-semibold'>
                            <p>Diseases: </p>
                            <span className="text-main-100">{singleCropInfo.diseases || 'None'}</span>
                        </div>
        
                        <div className='flex jutify-center items-center font-semibold '>
                            <p>Additional information:</p>
                            <span className="text-main-100">{singleCropInfo.additionalInfo || 'None'}</span>
                        </div>
                    </div>
                </div>
            </div>  

            <div className='border-2 border-main-300 rounded bg-primary-400'>
                <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                    NFT
                </div>
                <div className="p-2">
                    {
                        isNFT === false ? <Link to={`/NFT/${cropID}`} className='flex items-center justify-between uppercase bg-main-100
                            text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                            px-3 py-2 rounded-lg'>
                            Create an NFT for this product
                            <FontAwesomeIcon icon="fa-brands fa-bitcoin" className="text-4xl" spin/>
                        </Link> 
                        : (
                            <div className="font-mono text-main-100 font-semibold flex flex-col items-center">
                                <p className="">This product was already an NFT </p>
                                <Link to={`/market/add/${cropID}`} className="flex gap-0.5 items-center group p-1">
                                    <p className="group-hover:text-main-100 text-sm underline">Publish it on your market here</p>
                                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" className="group-hover:text-main-100 text-xl"/>
                                </Link>
                            </div>
                        )
                    }
 
                </div>
            </div>
        </div>  
    )
}

export default CropDetails