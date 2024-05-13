import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useNavigate, useLocation} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'


    const BackButton = () => (
        <div onClick={() => navigate(-1)} className='cursor-pointer'>
            <FontAwesomeIcon icon='fa-solid fa-chevron-left' className='text-2xl text-primary-500'/>
        </div>
    )

    return (
        <header 
        className='
            tablet: mx-auto
            desktop:max-w-4xl 
            w-screen px-4 py-2.5
            flex justify-between items-center
            bg-transparent text-black text-3xl           
        '>  
            {!isHome ? <BackButton className='bottom-6 flex-row-reverse' direction="left" name="Back" to={-1}/> : <div></div>}

            <button className='flex hover:cursor-pointer'>
                <FontAwesomeIcon icon="fa-solid fa-bars" className='text-primary-500'/>
            </button>
        </header>
    )
}


export default Header;