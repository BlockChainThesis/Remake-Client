import Spline from '@splinetool/react-spline';
import { useDispatch } from 'react-redux';
import { setLoadingState } from '../../redux/Loading/Slice';
import { useEffect } from 'react';
import NavArrow from '../../components/UI/Navigate Arrow/NavArrow';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoadingState(true))
    },[dispatch])
    
    return (
        <div className='
        bg-transparent w-full flex flex-col overflow-visible'>
                <p className='
                    laptop:text-4xl py-2 text-left w-full absolute z-30
                    bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text
                    font-bold font-mono
                    text-primary-400 text-2xl text-transparent leading-normal 
                    '>  
                            Revolutionizing 
                            Agriculture with Blockchain Technology
                </p>

                <div className='flex h-full overflow-visible'>
                    <div className='grow  flex flex-col justify-center items-center w-full'>
                        <Spline style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }} onLoad={() => dispatch(setLoadingState(false))} scene="https://prod.spline.design/ubxCn3CyOYI4bmpo/scene.splinecode" />
                        <NavArrow 
                            direction='right'
                            name='connect'
                            to='/auth'
                            className='right-6 flex-row'
                        />
                    </div>
                </div>
        </div>
    )
}


export default Home