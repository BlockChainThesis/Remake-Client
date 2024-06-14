import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyBalance, getMyTransaction } from '../../redux/Wallet/Slice';
import Window from '../../components/Interface/Layout/Window/Window';

const MyWallet = () => {
  const dispatch = useDispatch();
  const { balance, transaction } = useSelector((state) => state.wallet);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyBalance());
    dispatch(getMyTransaction());
  }, [dispatch]);

  console.log(user);

  if (!user) return;
  return (
    <>
      <div className="flex h-full w-full flex-col gap-4">
        <Window label="Your Wallet">
          <div className="p-4">
            <div className="flex items-center  justify-evenly rounded-lg p-2">
              <FontAwesomeIcon icon="fa-solid fa-wallet" bounce className="text-[80px] text-main-100 " />
              <div className="p-2 font-mono">
                <p className="text-3xl font-semibold tracking-wide text-main-100">{balance} FLP</p>
                <p className="font-semibold text-main-100/60 ">Total Balance</p>
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
                    <li className="flex max-h-[90px] w-full rounded bg-main-100 p-2 font-mono" key={index}>
                      {item.toAddress.toLowerCase() === user.toLowerCase() ? (
                        <div className="mx-4 flex items-center gap-3 py-4 text-4xl font-bold text-green-500">
                          <FontAwesomeIcon icon="fa-solid fa-up-long" />
                          <p> {item.token} </p>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-4 text-4xl font-bold text-red-500">
                          <FontAwesomeIcon icon="fa-solid fa-down-long" />
                          <p> {item.token} </p>
                        </div>
                      )}
                      <div className="no-scrollbar w-full overflow-scroll rounded px-4 text-main-300">
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
                <div className="font-mono text-xl font-semibold text-main-100"> Your Transaction is Empty :) </div>
              )}
            </ul>
          </div>
        </Window>
      </div>
    </>
  );
};

export default MyWallet;
