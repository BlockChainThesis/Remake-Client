import Sensor from './Sensor';

const SensorList = ({ stationId, sensorData }) => {
  return (
    <div className="no-scrollbar m-3 flex flex-col gap-2 overflow-y-scroll">
      {sensorData.map((sensor, index) => (
        <Sensor station={stationId} key={index} id={sensor.sensorId} unit={sensor.sensorUnit} value={sensor.sensorValue} />
      ))}
    </div>
  );
};

export default SensorList;
