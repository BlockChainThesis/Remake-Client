import Slider from 'react-slick'
import './CustomSlider.scss'

const CustomSlider = (props) => {
    return <Slider 
    {...props.setting}>{props.children}</Slider>

}
export default CustomSlider