import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListedNFTs, getHighestPrice, getLowestPrice, getTotalNFTs } from '../../redux/Market/Slice';
const Martket = () => {
  const urlDN = 'https://black-flying-guanaco-398.mypinata.cloud/ipfs/';

  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const { marketData, totalNFTs, highestPrice, lowestPrice, loading, error } = useSelector((state) => state.market);

  useEffect(() => {
    dispatch(getAllListedNFTs());
    dispatch(getTotalNFTs());
    dispatch(getHighestPrice());
    dispatch(getLowestPrice());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = marketData.filter((product) =>
    product.cropInfo.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || error) return;

  const MarketInfo = ({ title, value }) => (
    <div className="text-main-100 w-full bg-main-300 rounded py-2 px-1 flex flex-col items-center justify-center">
      <p className="">{title}</p>
      <p className="text-2xl tracking-wider">{value}</p>
    </div>
  );
  return (
    <>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-center w-full bg-main-300 p-6 rounded-lg items-center gap-3 text-main-100">
          <FontAwesomeIcon className="text-[60px]" icon="fa-solid fa-shop" />
          <div className="flex flex-col">
            <p className="-mb-2">Your</p>
            <h1 className="font-semibold text-3xl tracking-wide ">MarketPlace</h1>
          </div>
        </div>

        <div className="h-1 w-full bg-main-300 rounded"></div>

        <div className="flex gap-2 justify-between font-mono text-xs font-semibold ">
          <MarketInfo title={'Total'} value={totalNFTs} />
          <MarketInfo title={'Highest Price'} value={highestPrice} />
          <MarketInfo title={'Lowest Price'} value={lowestPrice} />
        </div>
        <div className="flex flex-col gap-4 bg-main-300 p-4 rounded-lg">
          <div className="flex self-center gap-2.5 items-center">
            <button className="flex">
              <FontAwesomeIcon
                icon="fa-solid fa-filter"
                className="bg-main-100
                            hover:bg-main-100 hover:text-main-400
                            text-xl text-main-300 p-1.5 rounded"
              />
            </button>
            <div className="relative">
              <input
                type="search"
                onChange={handleSearchChange}
                className="bg-main-100 pl-7 pr-1 py-1 rounded text-main-300 font-semibold focus:outline-none"
              />
              <FontAwesomeIcon
                className="text-main-400 absolute left-2 top-2 pointer-events-none"
                icon="fa-solid fa-magnifying-glass"
              />
            </div>
            <button className="flex">
              <FontAwesomeIcon
                icon="fa-solid fa-sort"
                className="bg-main-100
                            hover:bg-main-100 hover:text-main-400
                            text-xl text-main-300 p-1.5  rounded"
              />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-2">
            {filteredProducts.map((market, index) => (
              <Link
                to={`${market.tokenId}`}
                key={index}
                className="group hover:bg-main-400 cursor-pointer flex flex-col gap-1
                            bg-main-100 rounded-lg p-3"
              >
                <img className="w-full h-[120px] object-cover rounded-lg" src={urlDN + market.uri} />
                <div className="font-sans p-2">
                  <h1 className="font-semibold tracking-wide text-lg text-main-300 uppercase">
                    {market.cropInfo.cropType}
                  </h1>
                  <div
                    className="group-hover:text-main-200
                                            flex gap-1.5 font-bold font-mono text-xl tracking-wide text-main-400"
                  >
                    <p className="">{market.price}</p>
                    <p>FLP</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Martket;
