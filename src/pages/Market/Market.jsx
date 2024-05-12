import Profile from '../../assets/Market/market.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllListedNFTs, getHighestPrice, getLowestPrice, getTotalNFTs } from '../../redux/Market/Slice'
const Martket = () => {
    const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/'

    const [searchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch()
    const {marketData, totalNFTs, highestPrice, lowestPrice, loading, error} = useSelector(state => state.market)

    useEffect(() => {
        dispatch(getAllListedNFTs())
        dispatch(getTotalNFTs())
        dispatch(getHighestPrice())
        dispatch(getLowestPrice())

    },[dispatch])


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const filteredProducts =  marketData.filter(product => product.cropInfo.cropType.toLowerCase().includes(searchTerm.toLowerCase()))

    if(loading || error) return;
    

    const MarketInfo = ({title, value}) => (
        <div className='border-r-2 border-main-300 pr-1 w-full'>
            <p className='text-primary-500'>
                {title}
            </p>
            <p className='text-main-400'>
                {value}
            </p>
        </div>
    )
    console.log(filteredProducts)

    return (
        <>
            <div className="w-full h-full flex flex-col p-4 rounded-2xl gap-4
            bg-transparent
            border-4 border-main-200">
                {/* Profile  */}
                {/* <div className={`${classes.profile} bg-white rounded-lg p-2`}>    */}
                <div className=' rounded-lg p-2'>   
                    <div className='flex justify-center w-full'>
                        <img src={Profile} className='max-w-[380px]'/>    
                    </div>
                    <div className='flex flex-col w-full'>
                        <div>
                            <h1 className='py-1.5 font-semibold text-3xl tracking-wide text-primary-700'>
                                Your MarketPlace
                            </h1>
                        </div>
                        <div className='flex gap-4 justify-between
                        font-mono text-sm font-semibold border-t-2 border-t-main-300 py-1.5'>
                            <MarketInfo title={'Total Products'} value={totalNFTs}/>
                            <MarketInfo title={'Highest Price'} value={highestPrice}/>
                            <MarketInfo title={'Lowest Price'} value={lowestPrice}/>
                        </div>
                    </div>
                </div>
                
                <div className='flex self-center gap-2.5 items-center'>
                    <button className='flex'>
                        <FontAwesomeIcon icon="fa-solid fa-filter" className='
                        hover:bg-main-300 hover:text-main-400
                        text-xl text-main-100 p-1.5 bg-primary-300 rounded'/>
                    </button>
                    <div className='relative'>
                        <input 
                        type='search'
                        onChange={handleSearchChange}
                        className='bg-primary-300 pl-7 pr-1 py-1 rounded text-main-100 focus:outline-none'/>
                        <FontAwesomeIcon className='text-primary-50 absolute left-2 top-2 pointer-events-none'
                        icon="fa-solid fa-magnifying-glass" />
                    </div>
                    <button className='flex'>
                        <FontAwesomeIcon icon="fa-solid fa-sort" className='
                        hover:bg-main-300 hover:text-main-400
                        text-xl text-main-100 p-1.5 bg-primary-300 rounded'/>
                    </button>

                </div>
                
                <div className='grid grid-cols-2 gap-y-2 gap-x-2'>
                    {
                        filteredProducts.map((market,index) => (
                        <Link to={`${market.tokenId}`} key={index} className='group hover:bg-main-400 cursor-pointer flex flex-col gap-1
                         bg-primary-300 rounded-lg p-3'>
                                <img className='w-full h-[150px] object-cover rounded-lg' src={urlDN + market.uri}/>
                                    <div className='font-sans p-2'>
                                        <h1 className='font-semibold tracking-wide text-lg text-main-100 uppercase'>
                                            {market.cropInfo.cropType}
                                        </h1>
                                        <div className='group-hover:text-main-100
                                        flex gap-1.5  font-bold 
                                        font-mono text-xl tracking-wide text-primary-700'>
                                            <p className=''>{market.price}</p> 
                                            <p>FLP</p>
                                        </div>
                                        <div className='font-mono text-xs text-primary-50 w-full overflow-scroll'>
                                            Planting Date: {market.cropInfo.plantingDate}
                                        </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}



export default Martket