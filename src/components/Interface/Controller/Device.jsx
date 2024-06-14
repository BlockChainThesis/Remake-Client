import { getControllerState_pump, getControllerState_valve, turnOffController_pump, turnOffController_valve, turnOnController_pump, turnOnController_valve } from '../../../redux/Controller/Slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Switch from '../../UI/Switch/Switch';
import MainPump from '../../../assets/Dashboard/MainPump.png';
import Region from '../../../assets/Dashboard/Region.png';

const Device = ({ data }) => {
  const dispatch = useDispatch();
  const isValve = () => data.controllerId.startsWith('valve');
  const { pumpState, valveState } = useSelector((state) => state.controller);
  const handleChange = ({ stationId, controllerId }) => {
    if (isValve()) {
      // Is this controller is type Valve
      //If current state is on
      if (controllerStatus(valveState)) {
        //Turn off
        dispatch(
          turnOffController_valve({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
        //If current state is off
      } else {
        //Turn on
        dispatch(
          turnOnController_valve({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      }
      //Is this controller is type Pump
    } else {
      if (controllerStatus(pumpState)) {
        //If current state is on
        dispatch(
          //Turn off
          turnOffController_pump({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
        //If current state is off
      } else {
        //Turn on
        dispatch(
          turnOnController_pump({
            stationId: stationId,
            sensorId: controllerId,
          })
        );
      }
    }
  };

  //Check this controller is Valve or Pump and get that state
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
    if (state.find((obj) => obj.id === data.controllerId)) return Boolean(state.find((obj) => obj.id === data.controllerId).value);
  };

  return (
    <>
      <div className="flex items-center gap-2 rounded bg-main-100 p-2 ">
        <img className="max-w-[45px]" src={isValve() ? Region : MainPump} />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold uppercase text-main-300 ">{data.controllerId}</p>

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
    </>
  );
};

export default Device;
