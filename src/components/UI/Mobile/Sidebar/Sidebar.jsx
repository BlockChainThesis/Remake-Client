import {motion} from 'framer-motion'
import { useDispatch, useSelector} from "react-redux";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { letSideBarClosed} from '../../../../redux/Sidebar/Slice';
import {NavLink, useNavigate} from 'react-router-dom'
import { logout } from '../../../../redux/Auth/Slice';
const Item = ({item}) => {
    // const protectedState = (isLogged && item.protected) || (!isLogged && !item.protected)
    return (
        <motion.div 
        className='
        transform
        duration-75
        cursor-pointer
        hover:scale-125
        group
        '
        >
            <NavLink 
            to={item.path}
            className={({isActive}) => 
            isActive ? "text-primary-800 font-bold text-2xl" 
            : `group-hover:text-primary-700 font-semibold text-2xl text-primary-100` }>
                {item.name}
                {item.icon}
            </NavLink>
        </motion.div>
        )
}

const homeItem = [
    {
        name: 'Home', 
        path: '/',
    },
    {
        name: 'Creator', 
        path: '/creator',
    },
] 

const connectedItem = [
    {
        name: 'Menu', 
        path: '/menu',
    },
    {
        name: 'Inventory', 
        path: '/inventory',
    },
    // {
    //     name: 'Dashboard', 
    //     path: '/menu/dashboard',
    // },
    // {
    //     name: 'Form', 
    //     path: '/menu/form',
    // },
    // {
    //     name: 'History', 
    //     path: '/menu/history',
    // },
    // {
    //     name: 'Display', 
    //     path: '/menu/crops-display',
    // },
]


const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const textVariant ={
        default: {
            visibility: 'hidden',
            opacity:0,
        },
        hover:{
            visibility: 'visible',
            opacity:100,
        }
    }
    
    const mainVariant = {
        default: {
            background: 'transparent'
        },
        hover:{
            background: 'white',
            width: 80,
        }
    }

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/')
    }
    return createPortal(
        <motion.div
            className='absolute right-0 top-0 z-50 w-full h-full bg-primary-400 p-16 pt-40' 
            initial={{
                x:'100%',
            }}
            animate={{
                x:50,
            }}
            exit={{
                opacity: 0,
                x:'100%',
            }}
        >   
            <FontAwesomeIcon onClick={() => dispatch(letSideBarClosed())}
            icon="fa-solid fa-xmark" className='hover:cursor-pointer hover:opacity-35 text-4xl text-red-400 absolute top-2.5 right-0 pr-[inherit]'/>
            { //LOG OUT BUTTON  
                user ?
                <motion.div 
                    onClick={handleLogOut}
                    initial="default"
                    whileHover="hover"
                    animate="default"
                    variants={mainVariant}
                    className=' absolute top-4 left-5
                    group w-6 h-6 rounded-full
                    flex justify-center items-center
                    bg-white '>

                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" 
                        className='
                        group-hover:text-primary-700
                        group-hover:hidden
                        text-2xl text-main-100'/> 
                    <motion.p
                    className='cursor-pointer absolute text-sm font-semibold text-main-400'
                    variants={textVariant}
                    >Log out</motion.p>
                </motion.div>
                :
                <div></div>
            }
            <nav className='flex flex-col gap-6 w-fit'>
                {homeItem.map((item, index) => {
                    return (
                        <Item key={index} item={item}/>
                    )
                })}
                {user && connectedItem.map((item, index) => {
                    return (
                        <Item key={index} item={item}/>
                    )
                })}
            </nav>
        </motion.div>, document.getElementById('mainLayout')
    )
}

export default NavBar;