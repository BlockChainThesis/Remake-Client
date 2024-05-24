import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {getMyListedNFTInfo, getMyUnlistedNFTInfo } from "../../redux/cropNFT/Slice"
import { fetchCropData, } from '../../redux/Crop/Slice'

import { urlDN } from "../../constant"

import InventoryModal from "./InventoryModal"
import Window from "../../components/Interface/Window/Window"

const Inventory = () => {
    const dispatch = useDispatch()
    const {listedNFT, unListedNFT} = useSelector(state => state.cropNFT)
    const {cropInfo} = useSelector(state => state.crop)
    
    useEffect(() => {
        dispatch(getMyListedNFTInfo())
        dispatch(getMyUnlistedNFTInfo())
        dispatch(fetchCropData())
    },[dispatch])

    const [filters, setFilters] = useState({
        crop: [],
        nft: [],
        listed: [],
    });
    const [filteredResult, setFilteredResult] = useState({
        crop: [],
        nft: [],
        listed: [],
    })
    useEffect(() => {
        setFilteredResult(() => ({
            crop: cropInfo, 
            nft: unListedNFT, 
            listed: listedNFT
        }))
    },[cropInfo, listedNFT, unListedNFT])

    const [modalState, setModalState] = useState({
        isOpen: false,
        data: {},
        type: null,
    })


    const handleItemClick = (type, item) => {
        setModalState(prev => ({
            ...prev,
            isOpen: true,
            data: item,
            type: type,
        }))
    }


    const handleSearchChange = (event) => {
        const query = event.target.value
        if (filters.crop || filters.nft || filters.onSale) {
            if (filters.crop) {
              setFilteredResult(prev => ({
                  ...prev,
                  crop: cropInfo.slice().reverse().filter(item => item.cropType.toLowerCase().includes(query))
              }))
            }
            if (filters.nft) {
                setFilteredResult(prev => ({
                    ...prev,
                    nft: unListedNFT.slice().reverse().filter(item => item.crop.cropType.toLowerCase().includes(query))
                }))
            }
            if (filters.listed) {
                setFilteredResult(prev => ({
                    ...prev,
                    listed: listedNFT.slice().reverse().filter(item => item.crop.cropType.toLowerCase().includes(query))
                }))
            }
        }
    }

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target
        setFilters(prev => ({
            ...prev,
            [name] :checked,
        }))
    }




    return (
        <>  

        {modalState.isOpen && <InventoryModal data={modalState.data} type={modalState.type} setModalState={setModalState}/>}
            <div className="gap-4 w-full flex flex-col">
                <div className="w-full flex items-center gap-3">
                    <div className="flex items-center gap-2 relative">
                            <input type="text"
                            onChange={handleSearchChange}
                            className="focus:outline-none bg-main-300 pl-2 pr-6 py-1.5 rounded text-main-100" />
                            <FontAwesomeIcon
                            icon="fa-solid fa-magnifying-glass" 
                            className="cursor-pointer absolute z-10 right-0 p-1.5 text-main-100 text-xl rounded"/>
                    </div>
                    <div className="flex gap-2 bg-main-300 p-1.5 rounded font-mono text-main-100 w-fit overflow-auto no-scrollbar">
                        <div className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                name="crop"
                                checked={filters.crop}
                                onChange={handleCheckboxChange}
                                className="accent-main-100 w-5 h-5"
                                />
                            <label>Crop</label>
                        </div>
                        <div className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                name="nft"
                                checked={filters.nft}
                                onChange={handleCheckboxChange}
                                className="accent-main-100 w-5 h-5"
                                />
                            <label>NFT</label>
                        </div>

                        <div className="flex gap-1 items-center">
                            <input
                                type="checkbox"
                                name="listed"
                                checked={filters.listed}
                                onChange={handleCheckboxChange}
                                className="accent-main-100 w-5 h-5"
                                />
                            <label>Listed</label>
                        </div>
                    </div>
                </div>

                {
                    filters.crop && (
                        <Window label='Your Crop'>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4">
                                {cropInfo.length === 0 ? 
                                <p className="text-main-100 font-semibold">You do not have any crop</p> 
                                : filteredResult.crop.map((item, index) => (
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
                        </Window>


                    )
                }

                {
                    filters.nft && (
                        <Window label='Your NFT'>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-3">
                                {unListedNFT.length === 0 ? 
                                <p className="text-main-100 font-semibold col-span-2">Your NFTs inventory is empty</p> 
                                : filteredResult.nft.map((item, index) => (
                                    <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('inventory',item)}>
                                        <div className="flex rounded bg-main-100 group-hover:bg-main-400
                                        p-2 gap-1 items-center group-hover:text-main-100 font-mono text-main-300">
                                            <p className="font-bold">{item.tokenId}.</p>
                                            <div className="group-hover:text-main-100">
                                                <h1 className="font-bold tracking-wide">
                                                    {item.crop.cropType}
                                                </h1>
                                            </div>
                                            <img className="w-[40px] h-[35px] object-cover rounded border border-main-300" 
                                            src={urlDN + item.uri} />
                                        </div>
                                    </div>  
                                ))}
                            </div>
                        </Window>
                    )
                }

                {
                    filters.listed && (
                        <Window label='On Market'>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-3 p-4">
                                {listedNFT.length === 0 ? <p className="text-main-100 font-semibold col-span-2">No item on sale :(</p> 
                                : filteredResult.listed.map((item, index) => (
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
                        </Window>
                    )
                }

            </div>
        </>
    )
}

export default Inventory