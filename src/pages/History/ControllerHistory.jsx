
import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStationHistory } from "../../redux/Station/Slice"
import ReactPaginate from "react-paginate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Window from "../../components/Interface/Window/Window"
const ControllerHistory = () => {

    const DummyControllerData = [
        {
            controllerId: "Nutritious Liquid 1",
            createAt: "2024-04-12T04:10:03.000Z",
            status: true,
        },
        {
            controllerId: "Region Irrigation 1",
            createAt: "2024-04-11T04:12:03.000Z",
            status: true,
        },
        {
            controllerId: "Region Irrigation 3",
            createAt: "2024-04-13T04:11:03.000Z",
            status: false,
        }
    ]

    const RenderItem = ({currrentItems}) => {
        return(
            <div className='flex flex-col gap-1.5'>
            {currrentItems && currrentItems.map((item, index) => 
                <ControllerItem key={index} controller={item} />
            )}
        </div>)
    }

    const PaginatedItems = ({ itemsPerPage, items }) =>  {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
          }
    
      
        return (
            <div className='flex flex-col h-full justify-between'>
                <RenderItem currrentItems={currentItems}/>
                <ReactPaginate
                    className='mt-6
                    flex self-center gap-2 px-2 py-1 rounded-sm text-main-100 font-mono font-semibold'
                    pageClassName='px-2 rounded-full'
                    activeClassName='bg-main-100 text-main-300'
                    breakLabel="..."

                    previousLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                    previousClassName="flex  cursor-pointer justify-center items-center w-6 h-6 rounded-full bg-main-100"
                    previousLinkClassName="text-main-400 h-fit"

                    nextLabel=<FontAwesomeIcon icon="fa-solid fa-chevron-right "/>
                    nextClassName="flex cursor-pointer justify-center items-center w-6 h-6 rounded-full bg-main-100"
                    nextLinkClassName="text-main-400 h-fit"

                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                />    
            </div>
        )
    }

    const formattedDate = (date) => {
        
        return  date.toLocaleString('en-US', {
            year: 'numeric', // 4-digit year
            month: '2-digit', // 2-digit month
            day: '2-digit', // 2-digit day
            hour: '2-digit', // 2-digit hour
            minute: '2-digit', // 2-digit minutes
            second: '2-digit', // 2-digit seconds
            hour12: false // 24-hour time without AM/PM
          });
    
    }
    

    const ControllerItem = ({controller}) => {
        return (
            <li  className='bg-main-100 p-2 cursor-pointer
            w-full py-1 rounded border-b font-mono text-base flex justify-between items-center'>
                <div className='flex items-center w-full '>
                    <div className="flex flex-col w-full  font-bold text-main-400">
                        <p>
                            {controller.controllerId}
                        </p>
                        <p className="text-xs italic text-main-200 font-light">
                            {formattedDate(new Date (controller.createAt))}
                        </p>
                    </div>
                    <div className="text-2xl">
                        {controller.status ? <FontAwesomeIcon icon="fa-solid fa-toggle-on" className="text-green-400"/> : <FontAwesomeIcon icon="fa-solid fa-toggle-off" className="text-red-400"/>} 
                    </div>
                </div>
            </li>
        )
    }



    return ( 
        <div className="flex flex-col h-fit w-full">
            <Window label="Controller history">
                <div className='flex-nowrap flex flex-col gap-3 m-3 h-auto '>
                <PaginatedItems itemsPerPage={8} items={DummyControllerData}/>
                </div>
            </Window>
        </div>
    )
}


export default ControllerHistory