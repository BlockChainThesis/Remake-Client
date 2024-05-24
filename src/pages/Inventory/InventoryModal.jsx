import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkNFT } from "../../redux/cropNFT/Slice";
import { urlDN } from "../../constant";
import { listNFT, unlistNFT } from "../../redux/Market/Slice";


const InventoryModal = ({type, data, setModalState}) => {
    let modalContent; 
    const modalContainer = document.getElementById('modalContainer')
    const {isNFT} = useSelector(state => state.cropNFT)

    const [saleState, setSaleState] = useState(false);
    const [price, setPrice] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {
        if(type ==='crop'){
            dispatch(checkNFT(data.cropId))
        }
    },[])

    const InfoWindow = ({cropInfoObject}) => {

        return (
            <ul className='font-mono flex flex-col gap-1 p-3 bg-main-400 rounded-lg max-h-[230px] overflow-y-scroll'>
                {
                    Object.entries(cropInfoObject).map(([key, value], index) => (    
                        <li key={index} className='flex flex-col gap-1 text-sm '>
                            <p className='uppercase font-semibold text-main-100 '>
                                {key}
                            </p>

                            <p className='text-main-300 font-semibold bg-main-100 rounded p-1.5 w-full overflow-x-auto'>
                                {value === "" ? "None" : value}
                            </p>
                        </li>
                    ))
            }
            </ul>
        )
    }

    switch(type) {
        case 'inventory' :{
            const handlePriceChange = (event) => {
                const value = event.target.value
                if(value < 0 || value > 1000) {
                    alert("Please enter price from 1 to 1000")
                    return setPrice('')
                }
                setPrice(value)
            }
            const handlePublish = () => {
                dispatch(listNFT({cropID: data.tokenId, price}))
                setModalState(false)
            }
            modalContent = (
                    <>
                        <div className='flex items-center justify-between rounded-t px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
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
                                <InfoWindow cropInfoObject={data.crop}/>
                                {
                                    saleState ? (
                                        <div className="relative flex gap-1 items-center text-sm font-mono text-main-100 w-full">
                                            <input required onChange={handlePriceChange} type="number" value={price}
                                            className="bg-main-400 font-bold text-lg
                                            focus:outline-none
                                            p-1 rounded"/>
                                            <p className="absolute right-[74px] text-lg font-bold">FLP</p>
                                            <button disabled={!price || price === ''} onClick={handlePublish}
                                             className=" focus:outline-none w-full
                                            hover:bg-main-400 hover:text-main-100
                                            bg-main-100 p-2 text-main-400 rounded uppercase font-semibold">
                                                Sell
                                            </button>
                                        </div>
                                    ) : (
                                    <button onClick={() => setSaleState(true)} className="text-center
                                        hover:bg-main-100 hover:text-main-400 text-lg
                                        font-mono w-full bg-main-400 p-2 rounded text-main-100 font-semibold tracking-wide">
                                            Sell on market
                                    </button>
                                    )
                                }

                            </div>  
                        </div>
                    </>
            )
        }
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
                            <InfoWindow cropInfoObject={data}/>
                            {
                                !isNFT ? (
                                <Link to={`/NFT/${data.cropId}`} className="text-center
                                hover:bg-main-100 hover:text-main-400 text-lg
                                font-mono w-full bg-main-400 p-3 rounded text-main-100 font-semibold tracking-wide">
                                    Create Crop NFT
                                </Link>
                            ) : <p className="font-mono text-lg text-main-100 text-center">This crop is an NFT</p>
                            }
   
                        </div>  
                    </div>
                </>
            )
        break;
        case 'sale' : {
            const handleUnList = () =>{
                if(window.confirm('Are you sure ?')) {
                    setModalState(false)
                    return  dispatch(unlistNFT(data.tokenId))
                }
            }
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
                            <InfoWindow cropInfoObject={data.crop}/>
                            <button onClick={handleUnList}
                            className="text-center
                            hover:bg-main-100 hover:text-main-400 text-lg
                            font-mono w-full bg-main-400 p-2 rounded text-main-100 font-semibold tracking-wide">
                                Remove from market
                            </button>
                        </div>  
                    </div>
                </>
            )
        }
    break;
    }

    return createPortal(
        <div className="z-40 flex justify-center items-center fixed top-0 left-0 w-full h-full bg-primary-100/80">
            <div className="fixed z-50 rounded-xl shadow-md
            -translate-x-1/2 -translate-y-1/2
            w-full h-full max-w-xs max-h-[550px] 
             bg-main-300 left-1/2 top-1/2 flex flex-col overflow-scroll no-scrollbar">
                {modalContent}
            </div>
        </div>
        ,modalContainer
    )
}


export default InventoryModal