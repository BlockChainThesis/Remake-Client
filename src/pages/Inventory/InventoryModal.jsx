import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkNFT } from "../../redux/cropNFT/Slice";
import { urlDN } from "../../constant";

const InventoryModal = ({type, data, setModalState}) => {
    let modalContent; 
    const modalContainer = document.getElementById('modalContainer')
    const {isNFT} = useSelector(state => state.cropNFT)
    const dispatch = useDispatch()

    useEffect(() => {
        if(type ==='crop'){
            dispatch(checkNFT(data.cropId))
        }
    },[])

    
    switch(type) {
        case 'inventory' : 
        modalContent = (
                <>
                    <div className='flex  items-center justify-between rounded-t px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        YOUR NFT 
                        <FontAwesomeIcon icon="fa-solid fa-xmark" 
                        className="text-red-600 text-xl"
                            onClick={() => setModalState(prev => ({
                                ...prev, 
                                isOpen: false,
                            }))}
                        />
                    </div>
                    <div className="w-full h-full rounded p-4">
                        <div className="flex flex-col h-full gap-2 justify-between">
                            <div className="flex text-2xl font-bold text-main-100 w-full justify-between">
                                NFT no.
                                <h1>
                                    {data.tokenId}
                                </h1>
                            </div>
  
                            <img className="p-1 self-center rounded border border-main-100 w-[150px] h-[150px] object-cover" src={urlDN + data.uri}/>
                            <ul className='font-mono flex flex-col gap-1 p-3 bg-main-400 rounded'>
                                {
                                    Object.entries(data.crop).map(([key, value], index) => (    
                                        <li key={index} className='flex gap-2 text-sm'>
                                            <p className='uppercase font-semibold text-main-100 '>
                                                {key}: 
                                            </p>

                                            <p className='text-primary-200'>
                                                {value === "" ? "None" : value}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                            <Link to={`/market/add/${data.tokenId}`} className="text-center
                            hover:bg-main-100 hover:text-main-400 text-lg
                            font-mono w-full bg-main-400 p-2 rounded text-main-100 font-semibold tracking-wide">
                                Sell it on your marketplace
                            </Link>
                        </div>  
                    </div>
                </>
            )
        break;
        case 'crop' : 
            modalContent = (    
                <>
                    <div className='flex  items-center justify-between rounded-t px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        YOUR CROP
                        <FontAwesomeIcon icon="fa-solid fa-xmark" 
                        className="text-red-600 text-xl"
                            onClick={() => setModalState(prev => ({
                                ...prev, 
                                isOpen: false,
                            }))}
                        />
                    </div>
                    <div className="w-full h-full rounded p-4">
                        <div className="flex flex-col h-full gap-2 justify-between">
                            {/* <div className="flex w-full items-center gap-5 justify-center">
                                <img className="p-1 rounded border border-main-100 w-[200px] h-[200px] object-cover" src={urlDN + data.uri}/>
                            </div> */}
                            <div className="flex text-xl font-bold text-main-100 w-full justify-between">
                                Crop no.
                                <h1>
                                    {data.cropId}
                                </h1>
                            </div>
                            <FontAwesomeIcon icon="fa-solid fa-seedling"  className="text-[80px] bg-main-400 text-main-100 p-6 rounded"/>
                            <ul className='font-mono flex flex-col gap-1 p-3 bg-main-400 rounded'>
                                {
                                    Object.entries(data).map(([key, value], index) => (    
                                        <li key={index} className='flex gap-2 text-sm'>
                                            <p className='uppercase font-semibold text-main-100 '>
                                                {key}: 
                                            </p>

                                            <p className='text-primary-200'>
                                                {value === "" ? "None" : value}
                                            </p>
                                        </li>
                                    ))
                                }
                            </ul>
                            {
                                !isNFT ? (
                                <Link to={`/NFT/${data.cropId}`} className="text-center
                                hover:bg-main-100 hover:text-main-400 text-lg
                                font-mono w-full bg-main-400 p-3 rounded text-main-100 font-semibold tracking-wide">
                                    Create an NFT for this Crop
                                </Link>
                            ) : <p className="font-mono text-lg text-main-100 text-center">This crop is an NFT</p>
                            }
   
                        </div>  
                    </div>
                </>
            )
        break;
        case 'sale' : 
        modalContent = (
            <>
                <div className='flex  items-center justify-between rounded-t px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                    YOUR MARKET ITEM 
                    <FontAwesomeIcon icon="fa-solid fa-xmark" 
                    className="text-red-600 text-xl"
                        onClick={() => setModalState(prev => ({
                            ...prev, 
                            isOpen: false,
                        }))}
                    />
                </div>
                <div className="w-full h-full rounded p-4">
                    <div className="flex flex-col h-full gap-2 justify-between">
                        <div className="flex text-2xl font-bold text-main-100 w-full justify-between">
                            Product no.
                            <h1>
                                {data.tokenId}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <img className="p-1 self-center rounded border border-main-100 w-[150px] h-[150px] object-cover" src={urlDN + data.uri}/>
                            <h1 className="text-5xl font-bold text-main-100">{data.price} FLP
                                <p className="text-xs text-primary-50 pl-2 font-normal">Current price</p>
                            </h1>
                            
                        </div>
                        <ul className='font-mono flex flex-col gap-1 p-3 bg-main-400 rounded'>
                            {
                                Object.entries(data.crop).map(([key, value], index) => (    
                                    <li key={index} className='flex gap-2 text-sm'>
                                        <p className='uppercase font-semibold text-main-100 '>
                                            {key}: 
                                        </p>

                                        <p className='text-primary-200'>
                                            {value === "" ? "None" : value}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                        <Link to={`/market/add/${data.tokenId}`} className="text-center
                        hover:bg-main-100 hover:text-main-400 text-lg
                        font-mono w-full bg-main-400 p-2 rounded text-main-100 font-semibold tracking-wide">
                            Withdraw to your pocket
                        </Link>
                    </div>  
                </div>
            </>
        )
    break;
    }

    return createPortal(
        <div className="z-40 flex justify-center items-center fixed top-0 left-0 w-full h-full bg-primary-50/50">
            <div className="fixed z-50 rounded
            -translate-x-1/2 -translate-y-1/2
            w-full h-full max-w-sm max-h-[550px]
             bg-main-300 left-1/2 top-1/2 flex flex-col">
                {modalContent}
            </div>
        </div>
        ,modalContainer
    )
}


export default InventoryModal