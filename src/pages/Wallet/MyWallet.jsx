import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getMyBalance, getMyTransaction } from "../../redux/Wallet/Slice"

const MyWallet = () => {
    const dispatch = useDispatch()
    const {balance, transaction} = useSelector(state => state.wallet)


    useEffect(() => {
        dispatch(getMyBalance())
        dispatch(getMyTransaction())
    },[dispatch])


    const dummyData = [
        {
            fromAddress: '0x4e5c676c7b000000000000000000000000000000',
            toAddress: '0x5c674e67c6b000000000000000000000000000000',
            productId: '64857',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: '342',
            tokenSended: null
        },
        {
            fromAddress: '0x7b6c5e674e000000000000000000000000000000',
            toAddress: '0xc7b6e4c675000000000000000000000000000000',
            productId: '29384',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: null,
            tokenSended: '765'
        },
        {
            fromAddress: '0x4e5c676c7b000000000000000000000000000000',
            toAddress: '0x5c674e67c6b000000000000000000000000000000',
            productId: '64857',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: '342',
            tokenSended: null
        },
        {
            fromAddress: '0x7b6c5e674e000000000000000000000000000000',
            toAddress: '0xc7b6e4c675000000000000000000000000000000',
            productId: '29384',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: null,
            tokenSended: '765'
        },
        {
            fromAddress: '0x4e5c676c7b000000000000000000000000000000',
            toAddress: '0x5c674e67c6b000000000000000000000000000000',
            productId: '64857',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: '342',
            tokenSended: null
        },
        {
            fromAddress: '0x7b6c5e674e000000000000000000000000000000',
            toAddress: '0xc7b6e4c675000000000000000000000000000000',
            productId: '29384',
            date: '2024-05-15T12:34:56.789Z',
            tokenReceived: null,
            tokenSended: '765'
        }
    ]

    if(!balance) return;
    if(!transaction) return;

    console.log(transaction)
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
                <div className='border-2 border-main-300 rounded bg-main-300'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your WALLET
                    </div>
                    <div className="p-4">
                        {/* YOUR WALLET  */}
                        <div className="p-2 rounded-lg  flex items-center justify-evenly">
                            <FontAwesomeIcon icon="fa-solid fa-wallet" bounce 
                            className="text-[80px] text-main-100 "
                            />
                            <div className="p-2 font-mono">       
                                <p className="text-main-100 font-semibold text-3xl tracking-wide">
                                    {balance} FLP
                                </p>
                                <p className="text-primary-50 font-semibold px-1">Total Balance</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-2 border-main-300 rounded bg-main-300'>
                    <div className='px-2 py-1 uppercase bg-main-100 font-bold font-mono text-main-300 w-full border-b border-primary-500'>
                        Your Transaction
                    </div>
                    <div className="p-4">
                        <ul className="flex flex-col gap-3">
                            {
                                dummyData.map((transaction, index) => (
                                    <li className="bg-main-100 p-2 rounded font-mono w-full flex max-h-[90px]" key={index}>
                                        {transaction.tokenReceived ? 
                                        <div className="flex items-center gap-3 text-4xl py-4 mx-4 font-bold text-green-500">
                                            <FontAwesomeIcon icon="fa-solid fa-up-long" />
                                            <p> {transaction.tokenReceived} </p>
                                        </div> :
                                        <div className="flex items-center gap-3 text-4xl p-4 font-bold text-red-500">
                                            <FontAwesomeIcon icon="fa-solid fa-down-long" />
                                           <p> {transaction.tokenSended} </p>
                                        </div>
                                        }
                                        <div className="px-4 rounded text-main-300 w-full overflow-y-scroll no-scrollbar">

                                            <p><strong>From Address:</strong> {transaction.fromAddress}</p>
                                            <p><strong>To Address:</strong> {transaction.toAddress}</p>
                                            <p><strong>Product ID:</strong> {transaction.productId}</p>
                                            <p><strong>Date:</strong> {transaction.date}</p>
                                        </div>
                                    </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyWallet