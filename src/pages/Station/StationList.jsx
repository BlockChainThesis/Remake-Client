import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStationData, getNumberofStations } from '../../redux/Station/Slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import FarmerIcon from '../../assets/Station/farmerIcon.png';
import Window from '../../components/Interface/Layout/Window/Window';
const StationList = () => {
  const stationData = useSelector((state) => state.station.stationData);
  const stationCount = useSelector((state) => state.station.stationCount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStationData());
    dispatch(getNumberofStations());
  }, [dispatch]);
  return (
    <>
      <div className="flex h-fit w-full flex-col gap-4">
        <div className="flex w-fit">
          <img src={FarmerIcon} className="max-w-12 tablet:max-w-16" />
          <p
            className="top-0 h-fit w-fit rounded-t-lg rounded-br-lg bg-primary-400 p-2
                     text-sm text-main-100"
          >
            <span className="font-mono text-lg font-bold ">{stationCount}</span> stations are presently in operation.
          </p>
        </div>
        <Window label="Station List">
          <div className="flex h-full flex-col gap-3 px-3 py-4">
            {stationData ? (
              stationData.map((station, index) => (
                <Link to={`${station.stationId}`} className="group flex w-full items-center gap-2 rounded bg-main-100 p-2 font-mono shadow-lg hover:bg-main-400" key={index}>
                  <FontAwesomeIcon className="text-2xl text-main-300 group-hover:text-white" icon="fa-solid fa-tower-broadcast" />
                  <div className="flex-1 text-lg font-semibold tracking-wide text-main-300 group-hover:text-white">
                    {station.stationId}
                    <div className="flex gap-2 text-xs font-thin italic text-neutral-400 group-hover:text-primary-300">
                      <p>
                        Longitude:
                        {station.longitude}
                      </p>
                      <p>
                        Latitude:
                        {station.latitude}
                      </p>
                    </div>
                  </div>
                  <FontAwesomeIcon icon="fa-solid fa-chevron-right" className="text-2xl text-main-300 group-hover:text-white" />
                </Link>
              ))
            ) : (
              <p>There is no station to render :(</p>
            )}
          </div>
        </Window>
      </div>
    </>
  );
};

export default StationList;
