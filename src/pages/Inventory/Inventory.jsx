import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { checkNFT, getMyListedNFTInfo, getMyUnlistedNFTInfo } from "../../redux/cropNFT/Slice"
import { fetchCropData, } from '../../redux/Crop/Slice'

import { createPortal } from "react-dom"
import { Link } from "react-router-dom"

const Inventory = () => {
    const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/'

    const dispatch = useDispatch()
    const {loadingNFT, errorNFT, listedNFT, unListedNFT} = useSelector(state => state.cropNFT)
    const {loadingCrop, errorCrop, cropInfo} = useSelector(state => state.crop)

    const [modalState, setModalState] = useState({
        isOpen: false,
        data: {},
        type: null,
    })
    const modalContainer = document.getElementById('modalContainer')

    useEffect(() => {
        dispatch(getMyListedNFTInfo())
        dispatch(getMyUnlistedNFTInfo())
        dispatch(fetchCropData())
    },[dispatch])

    const Modal = ({type, data}) => {
        let modalContent; 
        

        // Check for NFT data loading and errors first
        if (loadingNFT) {
            return <div>Loading...</div>;
        }
        if (errorNFT) {
            return <div>Error: {errorNFT}</div>;
        }
        if (!listedNFT || !unListedNFT) {
            return <div>No NFT data found</div>;
        }

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
      
                                <img className="p-1 self-center rounded border border-main-100 w-[200px] h-[200px] object-cover" src={urlDN + data.uri}/>
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
                                <div className="flex text-2xl font-bold text-main-100 w-full justify-between">
                                    Crop no.
                                    <h1>
                                        {data.cropId}
                                    </h1>
                                </div>
                                <FontAwesomeIcon icon="fa-solid fa-seedling"  className="text-[100px] bg-main-400 text-main-100 p-6 rounded"/>
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
                                <Link className="text-center
                                hover:bg-main-100 hover:text-main-400 text-lg
                                font-mono w-full bg-main-400 p-3 rounded text-main-100 font-semibold tracking-wide">
                                    Create an NFT for this Crop
                                </Link>
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
                                <img className="p-1 self-center rounded border border-main-100 w-[200px] h-[200px] object-cover" src={urlDN + data.uri}/>
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
                w-full h-full max-w-md max-h-[600px]
                 bg-main-300 left-1/2 top-1/2 flex flex-col">
                    {modalContent}
                </div>
            </div>
            ,modalContainer
        )
    }

    const handleItemClick = (type, item) => {
        setModalState(prev => ({
            ...prev,
            isOpen: true,
            data: item,
            type: type,
        }))
    }

    // Check for NFT data loading and errors first
    if (loadingNFT) {
        return <div>Loading...</div>;
    }
    if (errorNFT) {
        return <div>Error: {errorNFT}</div>;
    }
    if (!listedNFT || !unListedNFT) {
        return <div>No NFT data found</div>;
    }

    // Then check for Crop data loading and errors
    if (loadingCrop) {
        return <div>Loading...</div>;
    }
    if (errorCrop) {
        return <div>Error: {errorCrop}</div>;
    }
    if (!cropInfo) {
        return <div>No crop data found</div>;
    }

    return (
        <>  

        {modalState.isOpen && <Modal data={modalState.data} type={modalState.type}/>}
            <div className="p-4 rounded-2xl gap-4 w-full
            bg-transparent border-4 border-main-200 flex flex-col">
                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your Crop
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
                        {cropInfo.length === 0 ? 
                        <p className="text-main-100 font-semibold">You do not have any crop</p> 
                        : cropInfo.slice().reverse().map((item, index) => (
                            <div key={index} className="group" onClick={() => handleItemClick("crop", item)}>
                                <div className="flex rounded-lg bg-main-100 group-hover:bg-main-400 font-mono
                                px-4 py-2 gap-2 items-center text-main-300 group-hover:text-main-100">
                                    <p className="font-bold">{item.cropId}.</p>
                                    <FontAwesomeIcon icon="fa-solid fa-seedling"  className="text-xl"/>
                                    <h1 className="text-lg font-bold tracking-wide">
                                        {item.cropType}
                                    </h1>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your Inventory
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
                        {unListedNFT.length === 0 ? 
                        <p className="text-main-100 font-semibold">Your inventory is empty</p> 
                        : unListedNFT.map((item, index) => (
                            <div key={index} className="group" onClick={() => handleItemClick('inventory',item)}>
                                <div className="flex rounded-lg bg-main-100 group-hover:bg-main-400
                                px-4 py-2 gap-2 items-center group-hover:text-main-100 font-mono text-main-300">
                                    <p className="font-bold">{item.tokenId}.</p>
                                    <img className="w-[50px] h-[50px] object-cover rounded border border-main-300" 
                                    src={urlDN + item.uri} />
                                    <div className="group-hover:text-main-100">
                                        <h1 className="text-lg font-bold tracking-wide">
                                            {item.crop.cropType}
                                        </h1>
                                        <p className="font-semibold text-xs">
                                            {item.price === 0 ? 'Not pricing' : item.price + 'FLP'}
                                        </p>
                                    </div>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        On Market
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3 p-4">
                        {listedNFT.map((item, index) => (
                            <div key={index} className="group" onClick={() => handleItemClick('sale',item)}>
                                <div className="flex rounded-lg bg-main-100 group-hover:bg-main-400
                                px-4 py-2 gap-2 items-center group-hover:text-main-100 font-mono text-main-300">
                                    <p className="font-bold">{item.tokenId}.</p>
                                    <img className="w-[50px] h-[50px] object-cover rounded border border-main-300" 
                                    src={urlDN + item.uri} />
                                    <div className="group-hover:text-main-100">
                                        <h1 className="text-lg font-bold tracking-wide">
                                            {item.crop.cropType}
                                        </h1>
                                        <p className="font-semibold text-xs">
                                            {item.price === 0 ? 'Not pricing' : item.price + 'FLP'}
                                        </p>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventory