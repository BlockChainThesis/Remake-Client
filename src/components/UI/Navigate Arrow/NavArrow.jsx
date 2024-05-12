import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
const NavArrow = ({direction ="top", name ="underfined", to ="/", className=""}) => {
    let icon
    const navigate = useNavigate()

    switch(direction) {
        case 'top': 
            icon = 'fa-solid fa-chevron-up'
            break;
        case 'bottom': 
            icon = 'fa-solid fa-chevron-down'
            break;
        case 'left': 
            icon = 'fa-solid fa-chevron-left'
            break;
        case 'right': 
            icon = 'fa-solid fa-chevron-right'
            break;
        default: 
            break;
    }

    return (
            <motion.div 
                transition = {{
                    duration: 0.4,
                    bounce: 0.5,
                    repeatType: 'reverse',
                    repeat: Infinity,
                }}
                animate= {{
                    [direction]: 0,
                    padding : 'inherit',
                }}
                onClick={() => navigate(to)}
                className={`
                flex z-50
                absolute items-center
                justify-center
                bg-transparent 
                text-primary-400
                ${className}

                cursor-pointer  
                `}>
                    <p className='font-bold text-lg uppercase'>{name}</p>
                    <button>
                        <FontAwesomeIcon icon={icon} className='text-4xl'/>
                    </button>
            </motion.div>
    )

}

export default NavArrow