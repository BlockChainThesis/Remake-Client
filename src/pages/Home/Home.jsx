import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLoadingState } from '../../redux/Interface/Slice';
import Spline from '@splinetool/react-spline';
import NavArrow from '../../components/UI/Navigate Arrow/NavArrow';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingState(true));
  }, [dispatch]);

  return (
    <div
      className="
        flex w-full flex-col overflow-visible bg-transparent"
    >
      <p
        className="
                    absolute z-30 w-full bg-gradient-to-r from-primary-300 to-primary-600
                    bg-clip-text py-2 text-left font-mono
                    text-2xl font-bold
                    leading-normal text-primary-400 text-transparent laptop:text-4xl 
                    "
      >
        Revolutionizing Agriculture with Blockchain Technology
      </p>

      <div className="flex h-full overflow-visible">
        <div className="flex  w-full grow flex-col items-center justify-center">
          <Spline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            onLoad={() => dispatch(setLoadingState(false))}
            scene="https://prod.spline.design/ubxCn3CyOYI4bmpo/scene.splinecode"
          />
          <NavArrow direction="right" name="connect" to="/auth" className="right-6 flex-row" />
        </div>
      </div>
    </div>
  );
};

export default Home;
