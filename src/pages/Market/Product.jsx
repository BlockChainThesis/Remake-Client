import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyNFT, checkOwner, getListedNFT, resetBuyStatus, unlistNFT } from '../../redux/Market/Slice';
import Window from '../../components/Interface/Layout/Window/Window';

const Product = () => {
  const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/';
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { isOwner } = useSelector((state) => state.market);
  const { data } = useSelector((state) => state.market.product);
  const { status } = useSelector((state) => state.market.buy);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListedNFT(productId));
    dispatch(checkOwner(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (status === 'completed') navigate('/menu');
    dispatch(resetBuyStatus());
  }, [status, navigate]);

  const handleWithDraw = () => {
    dispatch(unlistNFT(productId));
  };

  const handleBuyNFT = () => {
    if (window.confirm('Are you sure to buy this NFT !')) {
      dispatch(buyNFT(productId));
    }
  };
  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 ">
        <Window label="Author">
          <div className="no-scrollbar flex w-full flex-col overflow-x-scroll p-4 font-mono">
            <div className="">
              <p className=" p-0 font-semibold text-main-100">Owner</p>
              <p className="text-primary-100">{data.owner}</p>
            </div>
            <div className="">
              <p className=" font-semibold text-main-100">Seller</p>
              <p className="text-primary-100">{data.owner}</p>
            </div>
          </div>
        </Window>

        <Window
          label={
            <div className="flex items-center justify-between">
              CROP
              <div className="text-sm">{data.cropInfo.plantingDate}</div>
            </div>
          }
        >
          <div className="flex w-full flex-col justify-center p-4">
            <img src={urlDN + data.uri} className="m-2 h-[250px] w-[250px] self-center rounded-lg border-2 border-main-100 object-scale-down p-0.5" />
          </div>
        </Window>

        <Window label="Price">
          <div className="p-4">
            <div className="flex gap-2 font-mono text-5xl font-bold text-main-100">
              {data.price}
              <div className="">FLP</div>
            </div>

            {isOwner ? (
              <div className="flex w-full flex-col gap-2 font-semibold text-main-100">
                This is your product
                <button
                  onClick={handleWithDraw}
                  className="group flex items-center justify-between rounded-lg
                                bg-main-100 px-4 py-3 text-left font-bold
                                uppercase text-primary-500 hover:bg-main-200 hover:text-main-100"
                >
                  Withdraw
                  <FontAwesomeIcon icon="fa-solid fa-cart-arrow-down" bounce className="text-2xl" />
                </button>
              </div>
            ) : (
              <div className="flex w-full flex-col gap-2 ">
                <button
                  onClick={handleBuyNFT}
                  className="group flex items-center justify-between rounded-lg
                                bg-main-100 px-4 py-3 font-bold uppercase
                                text-primary-500 hover:bg-main-200 hover:text-main-100"
                >
                  Buy now
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" shake className="text-2xl" />
                </button>

                <button
                  className="group flex items-center justify-between rounded-lg
                                bg-main-100 px-4 py-3 font-bold uppercase
                                text-primary-500 hover:bg-main-200 hover:text-main-100"
                >
                  Make Offer
                  <FontAwesomeIcon icon="fa-solid fa-tag" spin className="text-2xl" />
                </button>
              </div>
            )}
          </div>
        </Window>

        <Window label="Detailed Information">
          <div className="p-4">
            <ul className="flex flex-col gap-1 font-mono">
              {Object.entries(data.cropInfo).map(
                ([key, value], index) =>
                  key !== 'additionalInfo' && (
                    <li key={index} className="flex gap-3 text-sm">
                      <p className="font-semibold uppercase text-main-100 ">{key}:</p>

                      <p className="text-primary-100">{value === '' ? 'None' : value}</p>
                    </li>
                  )
              )}
            </ul>
          </div>
        </Window>

        <Window label="Description">
          <div className="px-4 py-2 font-mono font-semibold text-main-100">{data.cropInfo.additionalInfo === '' ? 'Nothing' : data.cropInfo.additionalInfo}</div>
        </Window>
      </div>
    </>
  );
};

export default Product;
