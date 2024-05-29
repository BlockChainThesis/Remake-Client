import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListedNFTs, getHighestPrice, getLowestPrice, getTotalNFTs } from '../../redux/Market/Slice';
import { urlDN } from '../../constant';
const Martket = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Search state
  const [sortOrder, setSortOrder] = useState(''); // Sort state
  const { marketData, totalNFTs, highestPrice, lowestPrice } = useSelector((state) => state.market);
  const dispatch = useDispatch();

  // Load NFT, listedNFT, price (highest & lowest) on component load
  useEffect(() => {
    dispatch(getAllListedNFTs());
    dispatch(getTotalNFTs());
    dispatch(getHighestPrice());
    dispatch(getLowestPrice());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //Filtered Product with sort and search Term
  const filteredProducts = marketData
    .filter((product) => product.cropInfo.cropType.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : sortOrder === 'desc' ? b.price - a.price : 0));

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const MarketInfo = ({ title, value }) => (
    <div className="flex w-full flex-col items-center justify-center rounded bg-main-300 px-1 py-2 text-main-100">
      <p className="">{title}</p>
      <p className="text-2xl tracking-wider">{value}</p>
    </div>
  );
  return (
    <>
      <div className="flex h-full w-full flex-col gap-3">
        <div className="flex w-full items-center justify-center gap-3 rounded-lg bg-main-300 p-6 text-main-100">
          <FontAwesomeIcon className="text-[60px]" icon="fa-solid fa-shop" />
          <div className="flex flex-col">
            <p className="-mb-2">Your</p>
            <h1 className="text-3xl font-semibold tracking-wide ">MarketPlace</h1>
          </div>
        </div>

        <div className="h-1 w-full rounded bg-main-300"></div>

        <div className="flex justify-between gap-2 font-mono text-xs font-semibold ">
          <MarketInfo title={'Total'} value={totalNFTs} />
          <MarketInfo title={'Highest Price'} value={highestPrice} />
          <MarketInfo title={'Lowest Price'} value={lowestPrice} />
        </div>
        <div className="flex flex-col gap-4 rounded-lg bg-main-300 p-4">
          <div className="flex items-center gap-2.5 self-center">
            <div className="relative">
              <input type="search" onChange={handleSearchChange} className="rounded bg-main-100 py-1 pl-7 pr-1 font-semibold text-main-300 focus:outline-none" />
              <FontAwesomeIcon className="pointer-events-none absolute left-2 top-2 text-main-400" icon="fa-solid fa-magnifying-glass" />
            </div>
            <button className="flex" onClick={handleSortOrderChange}>
              <FontAwesomeIcon icon="fa-solid fa-sort" className="rounded bg-main-100 p-1.5 text-xl text-main-300 hover:bg-main-100  hover:text-main-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
            {filteredProducts.map((market, index) => (
              <Link to={`${market.tokenId}`} key={index} className=" group flex cursor-pointer flex-col gap-1 rounded-lg bg-main-100 p-3 hover:bg-main-400">
                <img className="h-[120px] w-full rounded-lg object-scale-down " src={urlDN + market.uri} />
                <div className="p-2 font-sans">
                  <h1 className="text-lg font-semibold uppercase tracking-wide text-main-300">{market.cropInfo.cropType}</h1>
                  <div className="flex gap-1.5 font-mono text-xl font-bold tracking-wide text-main-400 group-hover:text-main-200">
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
