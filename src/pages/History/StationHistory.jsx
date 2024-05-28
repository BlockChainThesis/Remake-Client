import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStationHistory } from '../../redux/Station/Slice';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Window from '../../components/Interface/Window/Window';
const StationHistory = () => {
  const dispatch = useDispatch();
  const stationData = useSelector((state) => state.station.stationHistory);

  useEffect(() => {
    dispatch(getStationHistory());
  }, [dispatch]);

  if (!stationData) return;

  const RenderItem = ({ currrentItems }) => {
    return (
      <div className="flex flex-col gap-1.5">
        {currrentItems && currrentItems.map((item, index) => <StationItem key={index} station={item} />)}
      </div>
    );
  };

  const PaginatedItems = ({ itemsPerPage, items }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <div className="flex flex-col justify-between">
        <RenderItem currrentItems={currentItems} />
        <ReactPaginate
          className="mt-6 flex self-center gap-2 px-2 py-1 rounded-sm text-main-100 font-mono font-semibold"
          pageClassName="px-2 rounded-full"
          activeClassName="bg-main-100 text-main-300"
          breakLabel="..."
          previousLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
          previousClassName="flex  cursor-pointer justify-center items-center w-6 h-6 rounded-full bg-main-100"
          previousLinkClassName="text-main-400 h-fit"
          nextLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-right " />
          nextClassName="flex cursor-pointer justify-center items-center w-6 h-6 rounded-full bg-main-100"
          nextLinkClassName="text-main-400 h-fit"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
        />
      </div>
    );
  };

  const StationItem = ({ station }) => {
    return (
      <li className="bg-main-100 p-2 cursor-pointer w-full py-1 rounded border-b font-mono text-base flex justify-between items-center">
        <div className="flex flex-col w-full ">
          <div className="flex w-full items-center justify-between font-bold text-main-400">
            <p>{station.stationId}</p>
            <p className="text-xs italic text-main-200 font-light">{station.createAt}</p>
          </div>
          <div className="flex w-full justify-between text-xs italic text-main-300">
            <p>
              {station.longitude}:{station.latitude}
            </p>
            <Link className="underline hover:text-main-200" to={`/menu/station/${station.stationId}`}>
              View more at Station
            </Link>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="flex flex-col h-fit w-full">
      <Window label="Station history">
        <div className="flex-nowrap flex flex-col gap-3 m-3 h-auto ">
          <PaginatedItems itemsPerPage={8} items={stationData} />
        </div>
      </Window>
    </div>
  );
};

export default StationHistory;
