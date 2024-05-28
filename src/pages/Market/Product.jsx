import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyNFT, checkOwner, getListedNFT, unlistNFT } from '../../redux/Market/Slice';
import Window from '../../components/Interface/Window/Window';

const Product = () => {
  const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/';
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { isOwner } = useSelector((state) => state.market);
  const { data } = useSelector((state) => state.market.product);
  const { status } = useSelector((state) => state.market.buyNFT);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListedNFT(productId));
    dispatch(checkOwner(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (status === 'completed') navigate('/menu/');
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
      <div className="w-full h-full flex flex-col gap-4 ">
        <Window label="Author">
          <div className="flex flex-col p-4 font-mono w-full overflow-x-scroll no-scrollbar">
            <div className="">
              <p className=" text-main-100 font-semibold p-0">Owner</p>
              <p className="text-primary-100">{data.owner}</p>
            </div>
            <div className="">
              <p className=" text-main-100 font-semibold">Seller</p>
              <p className="text-primary-100">{data.owner}</p>
            </div>
          </div>
        </Window>

        <Window
          label={
            <div className="justify-between flex items-center">
              CROP
              <div className="text-sm">{data.cropInfo.plantingDate}</div>
            </div>
          }
        >
          <div className="flex flex-col w-full justify-center p-4">
            <img
              src={urlDN + data.uri}
              className="m-2 border-2 border-main-100 p-0.5 self-center rounded-lg w-[250px] h-[250px] object-cover"
            />
          </div>
        </Window>

        <Window label="Price">
          <div className="p-4">
            <div className="font-mono font-bold text-main-100 text-5xl flex gap-2">
              {data.price}
              <div className="">FLP</div>
            </div>

            {isOwner ? (
              <div className="flex flex-col gap-2 w-full font-semibold text-main-100">
                This is your product
                <button
                  onClick={handleWithDraw}
                  className="flex items-center justify-between uppercase bg-main-100
                                text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                                px-4 py-3 rounded-lg text-left"
                >
                  Withdraw
                  <FontAwesomeIcon icon="fa-solid fa-cart-arrow-down" bounce className="text-2xl" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full ">
                <button
                  onClick={handleBuyNFT}
                  className="flex items-center justify-between uppercase bg-main-100
                                text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                                px-4 py-3 rounded-lg"
                >
                  Buy now
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" shake className="text-2xl" />
                </button>

                <button
                  className="flex items-center justify-between uppercase bg-main-100
                                text-primary-500 font-bold group hover:bg-main-200 hover:text-main-100
                                px-4 py-3 rounded-lg"
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
            <ul className="font-mono flex flex-col gap-1">
              {Object.entries(data.cropInfo).map(
                ([key, value], index) =>
                  key !== 'additionalInfo' && (
                    <li key={index} className="flex gap-3 text-sm">
                      <p className="uppercase font-semibold text-main-100 ">{key}:</p>

                      <p className="text-primary-100">{value === '' ? 'None' : value}</p>
                    </li>
                  )
              )}
            </ul>
          </div>
        </Window>

        <Window label="Description">
          <div className="px-4 py-2 text-main-100 font-semibold font-mono">
            {data.cropInfo.additionalInfo === '' ? 'Nothing' : data.cropInfo.additionalInfo}
          </div>
        </Window>
      </div>
    </>
  );
};

export default Product;
