import { useParams } from 'react-router-dom'
import CropIMG from '../../assets/Market/crop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListedNFT } from '../../redux/Market/Slice'



const Product = () => {
    const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/'


    const {productId} = useParams()
    
    const dispatch = useDispatch()
    const {singleMarketData, loading, error} = useSelector(state => state.market)

    useEffect(() => {
        dispatch(getListedNFT(productId))
    },[productId, dispatch])

    if(loading || error) return;

    return (
        <>
            <div className="w-full h-full flex flex-col p-4 rounded-2xl gap-4
            bg-transparent border-4 border-main-200">
                <div className='text-3xl font-semibold text-primary-500 uppercase'>
                    {singleMarketData.cropInfo.cropType}
                        <div className='font-mono text-base'>
                            Owned by <span className='text-primary-400'>{singleMarketData.owner}</span>
                        </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300
                flex flex-col gap-2 '>
                    <div className=' px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Owner
                    </div>
                    <div className='flex flex-col px-s4 mx-4 my-2 font-mono w-full overflow-x-scroll'>
                        <div className=''>
                            <p className=' text-main-100 font-semibold p-0'>
                            Owner 
                            </p>
                            <p className='text-primary-100'>
                                {singleMarketData.owner}
                            </p>
                        </div>
                        <div className=''>
                            <p className=' text-main-100 font-semibold'>
                            Seller 
                            </p>
                            <p className='text-primary-100'>
                                {singleMarketData.owner}
                            </p>
                    </div>
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300 flex flex-col'>
                    <div className='flex justify-between items-center px-2 py-1 border-b border-primary-500 bg-main-100 font-bold font-mono text-main-300'>
                        CROP
                        <div className='text-sm'>
                            {singleMarketData.cropInfo.plantingDate}
                        </div>
                    </div>
                    <img src={urlDN + singleMarketData.uri} className='m-2 border-2 border-main-100 p-0.5 self-center rounded-lg'/>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300
                flex flex-col gap-2'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Current Price
                    </div>
                    <div className='px-4 py-1 font-mono font-bold text-main-100 text-5xl flex gap-2'>
                        {singleMarketData.price}
                        <div className=''>
                            FLP
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 w-full p-4'>
                        <button className='flex items-center justify-between uppercase bg-main-100
                        text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                        px-4 py-3 rounded-lg'>
                            Buy now
                            <FontAwesomeIcon icon="fa-solid fa-cart-shopping" shake
                            className='text-2xl'/>
                        </button>

                        <button className='flex items-center justify-between uppercase bg-main-100
                        text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                        px-4 py-3 rounded-lg'>
                            Make Offer
                            <FontAwesomeIcon icon="fa-solid fa-tag" spin
                            className='text-2xl'/>
                        </button>
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300
                flex flex-col gap-2'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Detailed Information
                    </div>
                    <div className='px-4 py-2'>
                        <ul className='font-mono flex flex-col gap-1'>
                            {
                                Object.entries(singleMarketData.cropInfo).map(([key, value], index) => key !== "additionalInfo" && (    
                                    <li key={index} className='flex gap-3 text-sm'>
                                        <p className='uppercase font-semibold text-main-100 '>
                                            {key}: 
                                        </p>

                                        <p className='text-primary-100'>
                                            {value === "" ? "None" : value}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                
                <div className='border-2 border-main-300 rounded bg-main-300
                flex flex-col gap-2'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Description
                    </div>
                    <div className='px-4 py-2 text-main-100 font-semibold font-mono'>
                        {singleMarketData.cropInfo.additionalInfo === "" ? "Nothing" : singleMarketData.cropInfo.additionalInfo}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;