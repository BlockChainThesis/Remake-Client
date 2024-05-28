import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyBalance, getMyTransaction } from '../../redux/Wallet/Slice';
import { getUserAddress, isMyAddress } from '../../utils/func';
import Window from '../../components/Interface/Window/Window';

const MyWallet = () => {
  const dispatch = useDispatch();
  const { balance, transaction } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getMyBalance());
    dispatch(getMyTransaction());
  }, [dispatch]);

  const currentAddress = getUserAddress();
  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <Window label="Your Wallet">
          <div className="p-4">
            {/* YOUR WALLET  */}
            <div className="p-2 rounded-lg  flex items-center justify-evenly">
              <FontAwesomeIcon icon="fa-solid fa-wallet" bounce className="text-[80px] text-main-100 " />
              <div className="p-2 font-mono">
                <p className="text-main-100 font-semibold text-3xl tracking-wide">{balance} FLP</p>
                <p className="text-main-100/60 font-semibold ">Total Balance</p>
              </div>
            </div>
          </div>
        </Window>
        <Window label="Your Transaction">
          <div className="p-4">
            <ul className="flex flex-col gap-3">
              {transaction ? (
                transaction
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <li className="bg-main-100 p-2 rounded font-mono w-full flex max-h-[90px]" key={index}>
                      {isMyAddress(item.toAddress) ? (
                        <div className="flex items-center gap-3 text-4xl py-4 mx-4 font-bold text-green-500">
                          <FontAwesomeIcon icon="fa-solid fa-up-long" />
                          <p> {item.token} </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-4xl p-4 font-bold text-red-500">
                          <FontAwesomeIcon icon="fa-solid fa-down-long" />
                          <p> {item.token} </p>
                        </div>
                      )}
                      <div className="px-4 rounded text-main-300 w-full overflow-y-scroll no-scrollbar">
                        <p>
                          <strong>From Address:</strong> {item.fromAddress}
                        </p>
                        <p>
                          <strong>To Address:</strong> {item.toAddress}
                        </p>
                        <p>
                          <strong>Product ID:</strong> {item.productId}
                        </p>
                        <p>
                          <strong>Date:</strong> {item.date}
                        </p>
                      </div>
                    </li>
                  ))
              ) : (
                <div className="text-xl text-main-100 font-semibold font-mono"> Your Transaction is Empty :) </div>
              )}
            </ul>
          </div>
        </Window>
      </div>
    </>
  );
};

export default MyWallet;
