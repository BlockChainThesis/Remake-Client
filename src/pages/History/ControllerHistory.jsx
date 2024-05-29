import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Window from '../../components/Interface/Layout/Window/Window';
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
    return <div className="flex flex-col gap-1.5">{currrentItems && currrentItems.map((item, index) => <ControllerItem key={index} controller={item} />)}</div>;
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
      <div className="flex h-full flex-col justify-between">
        <RenderItem currrentItems={currentItems} />
        <ReactPaginate
          className="mt-6 flex gap-2 self-center rounded-sm px-2 py-1 font-mono font-semibold text-main-100"
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
        className="flex w-full cursor-pointer
            items-center justify-between rounded border-b bg-main-100 p-2 py-1 font-mono text-base"
      >
        <div className="flex w-full items-center ">
          <div className="flex w-full flex-col  font-bold text-main-400">
            <p>{controller.controllerId}</p>
            <p className="text-xs font-light italic text-main-200">{controller.createAt}</p>
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
    <div className="flex h-fit w-full flex-col">
      <Window label="Controller history">
        <div className="m-3 flex h-auto flex-col flex-nowrap gap-3 ">
          <PaginatedItems itemsPerPage={8} items={controllerHistory} />
        </div>
      </Window>
    </div>
  );
};

export default ControllerHistory;
