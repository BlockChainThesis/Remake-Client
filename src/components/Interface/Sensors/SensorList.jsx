import Sensor from "./Sensor"

const SensorList = ({stationId, sensorData}) => {
    return(
        <div className="flex flex-col gap-2 overflow-y-scroll m-3">
            {
                sensorData.map((sensor,index) => 
                    <Sensor
                        station={stationId}
                        key={index}
                        id={sensor.sensorId}
                        unit={sensor.sensorUnit}
                        value={sensor.sensorValue}
                    />
                )
            }
        </div>

    )
}

export default SensorList