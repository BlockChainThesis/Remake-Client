import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { listNFT } from "../../redux/Market/Slice"
import { useState } from "react"


const AddProduct = () => {
    const {cropID} = useParams()
    const [price, setPrice] = useState(null)
    const dispatch = useDispatch()

    const handlePublish = () => {
        dispatch(listNFT({cropID, price}))
    }

    const handlePriceChange = (event) => {
        const value = event.target.value
        if(value < 0 || value > 1000) {
            alert("Please enter price from 1 to 1000")
            return setPrice(0)
        }
        setPrice(value)
    }

    return (
        <div className="p-4 rounded-2xl gap-4 w-full
        bg-transparent border-4 border-main-200 flex flex-col">
            <div className="text-main-100 flex gap-2 items-center text-3xl bg-primary-400  w-fit rounded-md px-4 py-2">
            <FontAwesomeIcon icon="fa-solid fa-box-archive" />
                <p className="text-base font-bold tracking-wider">
                    Publish Your Product
                </p>
            </div>
            
            <div className='border-2 border-main-300 rounded bg-primary-400'>
                <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                    CREATE NFT
                </div>
                <div className="px-3 py-2 flex flex-col ">
                    <div className="flex-col flex ">
                        <label className="font-bold text-main-100 uppercase">Your Price</label>
                        <div className="w-full flex gap-2 items-center ">
                            <input required onChange={handlePriceChange} type="number" min={0} max={100} className="px-2 py-1 rounded bg-main-100 text-main-400 font-bold text-2xl  focus:outline-none w-3/4" /> 
                            <span className="text-3xl font-bold font-mono text-main-400">FLP</span>
                        </div>
                    </div>
                    <button disabled={!price} onClick={handlePublish} className="mt-6 self-end p-2 bg-main-100 rounded w-fit font-semibold text-main-300">
                        Publish into market
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct