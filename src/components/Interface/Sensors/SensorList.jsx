import CustomSlider from "../../UI/Slider/CustomSlider"
import Sensor from "./Sensor"

const SensorList = ({stationId, sensorData}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
        adaptiveHeight: true,
    }
    return(
        <div className="absolute w-full h-full">
            <CustomSlider setting={settings}>
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
            </CustomSlider>
        </div>

    )
}

export default SensorList