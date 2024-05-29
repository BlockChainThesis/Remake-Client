import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkNFT } from '../../redux/NFT/Slice';
import { urlDN } from '../../constant';
import { listNFT, unlistNFT } from '../../redux/Market/Slice';

const InventoryModal = ({ type, data, setModalState }) => {
  let modalContent; // Using for render types of Modal (NFT, ListedNFT and Crop)
  const modalContainer = document.getElementById('modalContainer'); // For using React Portals

  const { isNFT } = useSelector((state) => state.cropNFT);
  const [saleState, setSaleState] = useState(false);
  const [price, setPrice] = useState(''); // Set price for selling NFTs
  const dispatch = useDispatch();

  // Model type CROP (if it's NFT)
  useEffect(() => {
    if (type === 'crop') {
      dispatch(checkNFT(data.cropId));
    }
  }, []);

  const InfoWindow = ({ cropInfoObject }) => {
    return (
      <ul className="no-scrollbar flex max-h-[230px] flex-col gap-1 overflow-y-scroll rounded-lg bg-main-400 p-3 font-mono">
        {Object.entries(cropInfoObject).map(([key, value], index) => (
          <li key={index} className="flex flex-col gap-1 text-sm ">
            <p className="font-semibold uppercase text-main-100 ">{key}</p>
            <p className="w-full overflow-x-auto rounded bg-main-100 p-1.5 font-semibold text-main-300">{value === '' || value === undefined ? 'None' : value}</p>
          </li>
        ))}
      </ul>
    );
  };

  switch (type) {
    // NFT inventory
    case 'inventory':
      {
        const handlePriceChange = (event) => {
          const value = event.target.value;
          if (value < 0 || value > 1000) {
            alert('Please enter price from 1 to 1000');
            return setPrice('');
          }
          setPrice(value);
        };
        const handlePublish = () => {
          dispatch(listNFT({ cropID: data.tokenId, price }));
          setModalState(false);
        };
        modalContent = (
          <>
            <div className="flex w-full items-center justify-between rounded-t border-b border-primary-500 bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300">
              YOUR NFT
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                className="text-xl text-red-600"
                onClick={() =>
                  setModalState((prev) => ({
                    ...prev,
                    isOpen: false,
                  }))
                }
              />
            </div>
            <div className="h-full w-full rounded p-4">
              <div className="flex h-full flex-col justify-between gap-2">
                <div className="flex w-full justify-between text-2xl font-bold text-main-100">
                  NFT no.
                  <h1>{data.tokenId}</h1>
                </div>

                <img className="border-1 h-[150px] w-[200px] self-center rounded border-main-400 bg-main-100 object-cover p-1 shadow-window" src={urlDN + data.uri} />
                <InfoWindow cropInfoObject={data.crop} />
                {saleState ? (
                  <div className="relative flex w-full items-center gap-2 font-mono text-sm text-main-100">
                    <input required onChange={handlePriceChange} type="number" value={price} placeholder="FLP" className="no-scrollbar rounded bg-main-400 p-1 text-lg font-bold focus:outline-none" />
                    <button
                      disabled={!price || price === ''}
                      onClick={handlePublish}
                      className=" w-full rounded bg-main-100 p-1 text-lg font-bold uppercase text-main-300 hover:bg-main-400 hover:text-main-100 focus:outline-none"
                    >
                      Sell
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSaleState(true)}
                    className="w-full rounded bg-main-400 p-2 text-center font-mono text-lg font-semibold tracking-wide text-main-100 hover:bg-main-100 hover:text-main-400"
                  >
                    Sell on market
                  </button>
                )}
              </div>
            </div>
          </>
        );
      }
      break;
    //List of crops (NFT, nonNFT)
    case 'crop':
      modalContent = (
        <>
          <div className="flex  w-full items-center justify-between rounded-t border-b border-primary-500 bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300">
            YOUR CROP
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              className="text-xl text-red-600"
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  isOpen: false,
                }))
              }
            />
          </div>
          <div className="h-full w-full rounded p-4">
            <div className="flex h-full flex-col justify-between gap-2">
              <div className="flex w-full justify-between text-xl font-bold text-main-100">
                <Link to={`${data.cropId}`}>
                  <FontAwesomeIcon icon="fa-solid fa-circle-info" className="text-main-100" />
                </Link>
                Crop no.
                <h1>{data.cropId}</h1>
              </div>
              <FontAwesomeIcon icon="fa-solid fa-seedling" className="rounded bg-main-400 p-6 text-[80px] text-main-100" />
              <InfoWindow cropInfoObject={data} />
              {!isNFT ? (
                <Link
                  to={`/NFT/${data.cropId}`}
                  className="w-full rounded bg-main-400 p-3 text-center font-mono text-lg font-semibold tracking-wide text-main-100 hover:bg-main-100 hover:text-main-400"
                >
                  Create Crop NFT
                </Link>
              ) : (
                <p className="text-center font-mono text-lg text-main-100">This crop is an NFT</p>
              )}
            </div>
          </div>
        </>
      );
      break;
    //on Market
    case 'sale':
      {
        const handleUnList = () => {
          if (window.confirm('Are you sure ?')) {
            setModalState(false);
            return dispatch(unlistNFT(data.tokenId));
          }
        };
        modalContent = (
          <>
            <div className="flex  w-full items-center justify-between rounded-t border-b border-primary-500 bg-main-100 px-2 py-1 font-mono font-bold uppercase text-main-300">
              YOUR MARKET ITEM
              <FontAwesomeIcon
                icon="fa-solid fa-xmark"
                className="text-xl text-red-600"
                onClick={() =>
                  setModalState((prev) => ({
                    ...prev,
                    isOpen: false,
                  }))
                }
              />
            </div>
            <div className="h-full w-full rounded p-4">
              <div className="flex h-full flex-col justify-between gap-2">
                <div className="flex w-full justify-between text-2xl font-bold text-main-100">
                  Product no.
                  <h1>{data.tokenId}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <img className="h-[150px] w-[150px] self-center rounded border border-main-100 bg-main-100 object-cover p-1 shadow-window" src={urlDN + data.uri} />
                  <h1 className="text-5xl font-bold text-main-100">
                    {data.price} FLP
                    <p className="pl-2 text-xs font-normal text-primary-50">Current price</p>
                  </h1>
                </div>
                <InfoWindow cropInfoObject={data.crop} />
                <button onClick={handleUnList} className="w-full rounded bg-main-400 p-2 text-center font-mono text-lg font-semibold tracking-wide text-main-100 hover:bg-main-100 hover:text-main-400">
                  Remove from market
                </button>
              </div>
            </div>
          </>
        );
      }
      break;
  }

  return createPortal(
    <div className="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-primary-100/80">
      <div
        className="fixed left-1/2 top-1/2 z-50 flex h-full max-h-[550px] w-full max-w-xs -translate-x-1/2 
             -translate-y-1/2 flex-col rounded-xl bg-main-300 shadow-md"
      >
        {modalContent}
      </div>
    </div>,
    modalContainer
  );
};

export default InventoryModal;
