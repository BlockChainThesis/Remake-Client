import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MetaMaskIcon from '../../assets/metamask.png'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../redux/Auth/Slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const dispatch = useDispatch()
    // const isConnected = useSelector((state) => state.login.isConnected);
    const user = useSelector(state => state.auth.user)
    const isAdmin = useSelector(state => state.auth.isAdmin)

    const navigate = useNavigate()
    const loginMethod = [
        {
            icon: <FontAwesomeIcon icon="fa-brands fa-google" />,
            name: "google",
            color: "bg-white",
            text: "text-black"
        },
        {
            icon: <FontAwesomeIcon icon="fa-brands fa-github" />,
            name: "github",
            color:"bg-black",
            text: "text-white"
        },
        {
            icon: <img src={MetaMaskIcon} className='max-w-[17px]'/>,
            name: "metamask",
            color: "bg-white",
            text: "text-orange-500",
            login: () => dispatch(authenticate())
    
        }
    ]

    useEffect(() => {
        if(user) navigate('/menu')
    },[user, navigate, isAdmin])

    return (
        <>  
            <motion.div
                transition={{
                    duration: 0.5,
                }}
                initial={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    y:"-50%",
                    opacity:0,
                    
                }}
                animate={{
                    left:"50%",
                    x:"-50%",
                    opacity: 1,

                }}
                className=' 
                p-4 w-full max-w-[66%]
                shadow-1 shadow-primary-400
                rounded-lg
                bg-transparent'

            >
                    <p className='  
                        text-3xl font-sans font-semibold
                        text-primary-400 
                        absolute -top-6
                        bg-main-100
                    '>
                        Connect
                    </p>

                    <ul className='flex flex-col gap-3.5 m-2'>
                        {
                            loginMethod.map((method, index) => {
                                return (
                                    <li key={index} className='
                                    flex w-full
                                    font-mono uppercase text-lg
                                    '>
                                        <a 
                                        onClick={() => method.login()}
                                        className={`
                                        w-full flex gap-3 items-center justify-center
                                        p-2 tracking-wider
                                        cursor-pointer
                                        rounded-lg
                                        hover:-translate-y-1
                                        hover:shadow-2
                                        active:shadow-clicked
                                        active:translate-y-0
                                        transform duration-100
                                        border border-main-400
                                        ${method.color} ${method.text}`}>
                                            {method.icon}
                                            {method.name}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
            </motion.div>
        </>
    )


}
export default Login;