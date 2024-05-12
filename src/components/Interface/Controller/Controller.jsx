import Device from './Device'
import CustomSlider from '../../UI/Slider/CustomSlider'
const Controller = ( ) => {
    const renderDevice = (number) => {
        const devices = []

        for (let i = 1; i <= number; i++) devices.push(i)

        return devices.map((item, index) => {
            return (
                <Device
                    key={index}
                    device={{
                        name: `Device ${item}`,
                        index: item,
                    }}
                />
            )
        })
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        swipe: true,
        adaptiveHeight: true,
    }

    return (
        <>  
            <div className="w-full h-full absolute 
            
            ">
                <CustomSlider setting={settings}>
                    {renderDevice(8)}
                </CustomSlider>
            </div>
        </>
    )
}

export default Controller