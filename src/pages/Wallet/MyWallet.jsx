import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import WalletMain from '../../assets/Wallet/Wallet.png'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getBalance } from "../../redux/Wallet/Slice"

const MyWallet = () => {
    const dispatch = useDispatch()
    const {loading, error, balance} = useSelector(state => state.wallet)


    useEffect(() => {
        dispatch(getBalance())
    },[dispatch])


    if (loading || error ) return
    return (
        <>
            <div className="w-full h-full flex flex-col gap-4">
                <div className="flex gap-2 items-center text-3xl">
                    <FontAwesomeIcon icon="fa-solid fa-user" 
                    className=" p-2.5 rounded-full bg-main-100 text-primary-500"/>
                    <p className="text-primary-500  tracking-wide font-semibold">
                        Admin
                    </p>
                </div>
                <div className='border-2 border-main-300 rounded bg-primary-200'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your WALLET
                    </div>
                    <div className="p-4">
                        {/* YOUR WALLET  */}
                        <div className="p-2 rounded-lg  flex items-center justify-evenly">
                            <FontAwesomeIcon icon="fa-solid fa-wallet" bounce 
                            className="text-[80px] text-primary-500 "
                            />
                            <div className="p-2 font-mono">       
                                <p className="text-primary-800 font-semibold text-3xl tracking-wide">
                                    100 FLP
                                </p>
                                <p className="text-primary-500 font-semibold px-1">Total Balance</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWallet