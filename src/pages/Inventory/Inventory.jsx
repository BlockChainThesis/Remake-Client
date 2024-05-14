import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {getMyListedNFTInfo, getMyUnlistedNFTInfo } from "../../redux/cropNFT/Slice"
import { fetchCropData, } from '../../redux/Crop/Slice'

import { urlDN } from "../../constant"

import InventoryModal from "./InventoryModal"

const Inventory = () => {

    const dispatch = useDispatch()
    const {listedNFT, unListedNFT} = useSelector(state => state.cropNFT)
    const {cropInfo} = useSelector(state => state.crop)

    const [modalState, setModalState] = useState({
        isOpen: false,
        data: {},
        type: null,
    })

    useEffect(() => {
        dispatch(getMyListedNFTInfo())
        dispatch(getMyUnlistedNFTInfo())
        dispatch(fetchCropData())
    },[dispatch])

    const handleItemClick = (type, item) => {
        setModalState(prev => ({
            ...prev,
            isOpen: true,
            data: item,
            type: type,
        }))
    }

    if (!listedNFT || !unListedNFT) {
        return <div>No NFT data found</div>;
    }

    if (!cropInfo) {
        return <div>No crop data found</div>;
    }

    return (
        <>  

        {modalState.isOpen && <InventoryModal data={modalState.data} type={modalState.type} setModalState={setModalState}/>}
            <div className="gap-4 w-full flex flex-col">
                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll no-scrollbar'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your Crop
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
                        {cropInfo.length === 0 ? 
                        <p className="text-main-100 font-semibold">You do not have any crop</p> 
                        : cropInfo.slice().reverse().map((item, index) => (
                            <div key={index} className="group cursor-pointer" onClick={() => handleItemClick("crop", item)}>
                                <div className="flex rounded bg-main-100 group-hover:bg-main-400 font-mono
                                p-2 gap-1.5 items-center text-main-300 group-hover:text-main-100">
                                    <p className="font-bold">{item.cropId}.</p>
                                    <FontAwesomeIcon icon="fa-solid fa-seedling"  className="text-xl"/>
                                    <h1 className=" font-bold tracking-wide">
                                        {item.cropType}
                                    </h1>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll no-scrollbar'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your Inventory
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
                        {unListedNFT.length === 0 ? 
                        <p className="text-main-100 font-semibold">Your inventory is empty</p> 
                        : unListedNFT.map((item, index) => (
                            <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('inventory',item)}>
                                <div className="flex rounded bg-main-100 group-hover:bg-main-400
                                p-2 gap-1 items-center group-hover:text-main-100 font-mono text-main-300">
                                    <p className="font-bold">{item.tokenId}.</p>
                                    <img className="w-[40px] h-[40px] object-cover rounded border border-main-300" 
                                    src={urlDN + item.uri} />
                                    <div className="group-hover:text-main-100">
                                        <h1 className="font-bold tracking-wide">
                                            {item.crop.cropType}
                                        </h1>
                                    </div>
                                </div>
                            </div>  
                        ))}
                    </div>
                </div>

                <div className='border-2 border-main-300 rounded bg-main-300 h-full max-h-[450px] overflow-y-scroll no-scrollbar'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500 '>
                        On Market
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-3 p-4">
                        {listedNFT.map((item, index) => (
                            <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('sale',item)}>
                                <div className="
                                flex rounded bg-main-100 group-hover:bg-main-400
                                p-2 gap-1 items-center group-hover:text-main-100 font-mono text-main-300">
                                    <p className="font-bold">{item.tokenId}.</p>
                                    <img className="w-[40px] h-[40px] object-cover rounded border border-main-300" 
                                    src={urlDN + item.uri} />
                                    <div className="group-hover:text-main-100">
                                        <h1 className="tablet:text-lg text-sm font-bold tracking-wide">
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