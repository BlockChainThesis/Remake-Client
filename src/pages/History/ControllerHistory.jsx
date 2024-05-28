import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Window from '../../components/Interface/Window/Window';
import { useDispatch, useSelector } from 'react-redux';
import { getHistoryController } from '../../redux/Controller/Slice';
const ControllerHistory = () => {
  const dispatch = useDispatch();
  const { controllerHistory } = useSelector((state) => state.controller);

  useEffect(() => {
    dispatch(getHistoryController());
  }, [dispatch]);

  if (!controllerHistory) return <div>Loading...</div>;

  const RenderItem = ({ currrentItems }) => {
    return (
      <div className="flex flex-col gap-1.5">
        {currrentItems && currrentItems.map((item, index) => <ControllerItem key={index} controller={item} />)}
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
      <div className="flex flex-col h-full justify-between">
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

  const ControllerItem = ({ controller }) => {
    return (
      <li
        className="bg-main-100 p-2 cursor-pointer
            w-full py-1 rounded border-b font-mono text-base flex justify-between items-center"
      >
        <div className="flex items-center w-full ">
          <div className="flex flex-col w-full  font-bold text-main-400">
            <p>{controller.controllerId}</p>
            <p className="text-xs italic text-main-200 font-light">{controller.createAt}</p>
          </div>
          <div className="text-2xl">
            {controller.controllerValue === '1' ? (
              <FontAwesomeIcon icon="fa-solid fa-toggle-on" className="text-green-400" />
            ) : (
              <FontAwesomeIcon icon="fa-solid fa-toggle-off" className="text-red-400" />
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="flex flex-col h-fit w-full">
      <Window label="Controller history">
        <div className="flex-nowrap flex flex-col gap-3 m-3 h-auto ">
          <PaginatedItems itemsPerPage={8} items={controllerHistory} />
        </div>
      </Window>
    </div>
  );
};

export default ControllerHistory;
