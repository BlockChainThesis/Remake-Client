import {
  getControllerState_pump,
  getControllerState_valve,
  turnOffController_pump,
  turnOffController_valve,
  turnOnController_pump,
  turnOnController_valve,
} from '../../../redux/Controller/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Switch from '../../UI/Switch/Switch';
import MainPump from '../../../assets/Dashboard/Device/MainPump.png';

const Device = ({ data }) => {
  const dispatch = useDispatch();
  const isValve = () => data.controllerId.startsWith('valve');
  const { pumpState, valveState } = useSelector((state) => state.controller);
  const handleChange = ({ stationId, controllerId }) => {
    if (isValve()) {
      if (controllerStatus(valveState)) {
        dispatch(
          turnOffController_valve({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      } else {
        dispatch(
          turnOnController_valve({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      }
    } else {
      if (controllerStatus(pumpState)) {
        dispatch(
          turnOffController_pump({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      } else {
        dispatch(
          turnOnController_pump({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (isValve())
      dispatch(
        getControllerState_valve({
          stationId: data.stationId,
          controllerId: data.controllerId,
        })
      );
    else
      dispatch(
        getControllerState_pump({
          stationId: data.stationId,
          controllerId: data.controllerId,
        })
      );
  }, []);

  const controllerStatus = (state) => {
    if (state.find((obj) => obj.id === data.controllerId))
      return state.find((obj) => obj.id === data.controllerId).value;
  };

  return (
    <>
      <div>
        <div className="flex gap-2 items-center bg-main-100 rounded p-2">
          <img className="max-w-[55px] desktop:max-w-[150px]" src={MainPump} />
          <div className="flex flex-col gap-1">
            <p className="text-main-300 font-bold text-sm uppercase">{data.controllerId}</p>

            <Switch
              onChange={() =>
                handleChange({
                  stationId: data.stationId,
                  controllerId: data.controllerId,
                })
              }
              isEnabled={true}
              checked={isValve() ? controllerStatus(valveState) : controllerStatus(pumpState)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Device;
