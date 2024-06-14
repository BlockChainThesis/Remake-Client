import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStationData } from '../../redux/Station/Slice';
import { setSensorActiveID } from '../../redux/Interface/Slice';
import Chart from '../../components/UI/Chart/Chart';
import SensorList from '../../components/Interface/Sensors/SensorList';
import Controller from '../../components/Interface/Controller/Controller';
import Window from '../../components/Interface/Layout/Window/Window';
const Station = () => {
  const params = useParams();
  const stationId = params.stationId;
  const dispatch = useDispatch();

  const currentStation = useSelector((state) => state.station.currentStation);
  const activeSensor = useSelector((state) => state.interface.sensorActiveID);
  const currentSensorHistory = useSelector((state) => state.station.currentSensorHistory);

  useEffect(() => {
    dispatch(getStationData(stationId));
    dispatch(setSensorActiveID(-1));
  }, [dispatch, stationId]);

  if (!currentStation || !stationId) return;
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 laptop:max-w-4xl desktop:mx-auto">
        <Window label="Chart">
          <div className="relative flex h-full w-full flex-col justify-center rounded-lg p-4">
            {activeSensor !== -1 ? (
              <Chart stationType={stationId} data={currentSensorHistory} />
            ) : (
              <div className="font-mono text-2xl font-bold text-main-100">No sensor detected, please select one</div>
            )}
          </div>
        </Window>
        <Window label="Sensors">
          <SensorList sensorData={currentStation.sensorData} stationId={stationId} />
        </Window>
        <Window label="Controllers">
          <Controller />
        </Window>
      </div>
    </div>
  );
};

export default Station;
