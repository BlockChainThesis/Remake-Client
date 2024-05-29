import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSensorHistory } from '../../../redux/Station/Slice';
import { setSensorActiveID } from '../../../redux/Interface/Slice';

const sensorType = {
  air: {
    background: 'bg-neutral-400',
    icon: 'fa-wind',
    text: 'text-neutral-400',
  },
  water: {
    background: 'bg-blue-300',
    icon: 'fa-water',
    text: 'text-blue-300',
  },
  earth: {
    background: 'bg-yellow-700',
    icon: 'fa-seedling',
    text: 'text-yellow-700',
  },
};

const stationTypeSet = (id) => {
  if (!id) return;
  const type = id.substring(0, id.search('_'));
  return type;
};

const sensorStyleKit = (station, type, active = -1) => {
  const stationType = stationTypeSet(station);
  switch (type) {
    case 'icon':
      return stationType === 'air' ? 'fa-wind' : stationType === 'water' ? 'fa-water' : 'fa-seedling';
    case 'background':
      // return active ? "bg-neutral-400" : 'bg-white';
      return active ? (stationType === 'air' ? 'bg-neutral-400' : stationType === 'water' ? 'bg-blue-300' : 'bg-sensor-soil') : 'bg-main-400';
    case 'text':
      return active ? 'text-white' : 'text-main-100';
    case 'chart-background':
      return stationType === 'air' ? 'rgb(238, 238, 238, 0.5)' : stationType === 'water' ? 'rgb(147, 197, 253, 0.6)' : 'rgb(198, 169, 105, 0.6)';
    case 'chart-border':
      return stationType === 'air' ? '#EEEEEE' : stationType === 'water' ? 'rgb(147, 197, 253)' : 'rgb(198, 169, 105)';
    default:
  }
};

const Sensor = ({ station, id, unit, value }) => {
  const dispatch = useDispatch();
  const activeID = useSelector((state) => state.interface.sensorActiveID);
  const [sensorActive, setSensorActive] = useState(false);
  useEffect(() => {
    setSensorActive(activeID === id);
  }, [activeID, id]);
  const onClickHandler = () => {
    dispatch(setSensorActiveID(id));
    dispatch(getSensorHistory({ stationId: station, sensorId: id, length: '5' }));
  };
  return (
    <>
      <div
        onClick={onClickHandler}
        className={`bg-blue flex h-full w-full gap-4
            ${sensorStyleKit(station, 'background', sensorActive)}
            items-center rounded px-3 py-2`}
      >
        <FontAwesomeIcon icon={`fa-solid ${sensorStyleKit(station, 'icon')}`} className={`text-4xl laptop:text-9xl ${sensorStyleKit(station, 'text', sensorActive)}`} />
        <div className="flex h-full flex-col justify-center">
          <p className={`w-full text-lg font-bold uppercase laptop:text-5xl ${sensorStyleKit(station, 'text', sensorActive)}`}>{stationTypeSet(id)}</p>
          <p className={`text-lg font-bold laptop:text-5xl ${sensorStyleKit(station, 'text', sensorActive)}`}>
            {value}
            <span>{unit}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export { sensorType, sensorStyleKit, stationTypeSet };
export default Sensor;
