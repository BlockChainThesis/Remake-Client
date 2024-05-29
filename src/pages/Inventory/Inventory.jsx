import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyListedNFTInfo, getMyUnlistedNFTInfo } from '../../redux/NFT/Slice';
import { getAllCropsInfo } from '../../redux/Crop/Slice';
import { urlDN } from '../../constant';
import InventoryModal from './InventoryModal';
import Window from '../../components/Interface/Layout/Window/Window';

const Inventory = () => {
  const dispatch = useDispatch();
  const { listedNFT, unListedNFT } = useSelector((state) => state.cropNFT);
  const { cropInfo } = useSelector((state) => state.crop);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  useEffect(() => {
    dispatch(getMyListedNFTInfo()); // Get NFT on Market
    dispatch(getMyUnlistedNFTInfo()); // Get NFT not listed on market
    dispatch(getAllCropsInfo()); // Get list of crops (NFT and non-NFT)
  }, [dispatch]);

  //Select Filter
  const [filters, setFilters] = useState({
    crop: [],
    nft: [],
    listed: [],
  });

  //Filtered Data
  const [filteredResult, setFilteredResult] = useState({
    crop: [],
    nft: [],
    listed: [],
  });

  //Set Filter Data
  useEffect(() => {
    setFilteredResult(() => ({
      crop: cropInfo,
      nft: unListedNFT,
      listed: listedNFT,
    }));
  }, [cropInfo, listedNFT, unListedNFT]);

  //Inventory Modal
  const [modalState, setModalState] = useState({
    isOpen: false,
    data: {},
    type: null,
  });

  //Handle Click Item
  const handleItemClick = (type, item) => {
    setModalState((prev) => ({
      ...prev,
      isOpen: true,
      data: item,
      type: type,
    }));
  };

  //Handle Search Bar
  const handleSearchChange = (event) => {
    const query = event.target.value;
    if (filters.crop || filters.nft || filters.onSale) {
      if (filters.crop) {
        setFilteredResult((prev) => ({
          ...prev,
          crop: cropInfo
            .slice()
            .reverse()
            .filter((item) => item.cropType.toLowerCase().includes(query)),
        }));
      }
      if (filters.nft) {
        setFilteredResult((prev) => ({
          ...prev,
          nft: unListedNFT
            .slice()
            .reverse()
            .filter((item) => item.crop.cropType.toLowerCase().includes(query)),
        }));
      }
      if (filters.listed) {
        setFilteredResult((prev) => ({
          ...prev,
          listed: listedNFT
            .slice()
            .reverse()
            .filter((item) => item.crop.cropType.toLowerCase().includes(query)),
        }));
      }
    }
  };

  //Handle Checkbox Filter Event
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <>
      {modalState.isOpen && <InventoryModal data={modalState.data} type={modalState.type} setModalState={setModalState} />}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-3">
          <div className="relative flex items-center gap-2">
            <input type="text" onChange={handleSearchChange} className="rounded bg-main-300 py-1.5 pl-2 pr-6 text-main-100 focus:outline-none" />
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="absolute right-0 z-10 cursor-pointer rounded p-1.5 text-xl text-main-100" />
          </div>
          <div className="no-scrollbar flex w-fit gap-2 overflow-auto rounded bg-main-300 p-1.5 font-mono text-main-100">
            {isAdmin && (
              <div className="flex items-center gap-1">
                <input type="checkbox" name="crop" checked={filters.crop} onChange={handleCheckboxChange} className="h-5 w-5 accent-main-100" />
                <label>Crop</label>
              </div>
            )}

            <div className="flex items-center gap-1">
              <input type="checkbox" name="nft" checked={filters.nft} onChange={handleCheckboxChange} className="h-5 w-5 accent-main-100" />
              <label>NFT</label>
            </div>

            <div className="flex items-center gap-1">
              <input type="checkbox" name="listed" checked={filters.listed} onChange={handleCheckboxChange} className="h-5 w-5 accent-main-100" />
              <label>Listed</label>
            </div>
          </div>
        </div>

        {isAdmin && filters.crop && (
          <Window label="Your Crop">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-4 ">
              {cropInfo.length === 0 ? (
                <p className="font-semibold text-main-100">You do not have any crop</p>
              ) : (
                filteredResult.crop.map((item, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('crop', item)}>
                    <div
                      className="flex items-center gap-1.5 rounded bg-main-100
                                        p-2 font-mono text-main-300 group-hover:bg-main-400 group-hover:text-main-100"
                    >
                      <p className="font-bold">{item.cropId}.</p>
                      <FontAwesomeIcon icon="fa-solid fa-seedling" className="text-xl" />
                      <h1 className=" font-bold tracking-wide">{item.cropType}</h1>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Window>
        )}

        {filters.nft && (
          <Window label="Your NFT">
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 p-3">
              {unListedNFT.length === 0 ? (
                <p className="col-span-2 font-semibold text-main-100">Your NFTs inventory is empty</p>
              ) : (
                filteredResult.nft.map((item, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('inventory', item)}>
                    <div className="flex items-center gap-2 rounded bg-main-100 p-2 font-mono text-main-300 group-hover:bg-main-400 group-hover:text-main-100">
                      <p className="font-bold">{item.tokenId}.</p>
                      <div className="group-hover:text-main-100">
                        <h1 className="font-bold tracking-wide">{item.crop.cropType}</h1>
                      </div>
                      <img className="h-[35px] w-[40px] rounded border border-main-300 object-cover" src={urlDN + item.uri} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </Window>
        )}

        {filters.listed && (
          <Window label="On Market">
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 p-4">
              {listedNFT.length === 0 ? (
                <p className="col-span-2 font-semibold text-main-100">No item on sale :(</p>
              ) : (
                filteredResult.listed.map((item, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => handleItemClick('sale', item)}>
                    <div className="flex items-center gap-1 rounded bg-main-100 p-2 font-mono text-main-300 group-hover:bg-main-400 group-hover:text-main-100">
                      <p className="font-bold">{item.tokenId}.</p>
                      <img className="h-[40px] w-[40px] rounded border border-main-300 object-cover" src={urlDN + item.uri} />
                      <div className="group-hover:text-main-100">
                        <h1 className="text-sm font-bold tracking-wide tablet:text-lg">{item.crop.cropType}</h1>
                        <p className="text-xs font-semibold">{item.price === 0 ? 'Not pricing' : item.price + 'FLP'}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Window>
        )}
      </div>
    </>
  );
};

export default Inventory;
