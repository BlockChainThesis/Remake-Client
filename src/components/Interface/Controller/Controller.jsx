import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllController } from '../../../redux/Controller/Slice';
import { useSelector } from 'react-redux';
import Device from './Device';

const Controller = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.controller.controllers);

  useEffect(() => {
    dispatch(getAllController());
  }, [dispatch]);

  return (
    <>
      <div className="m-3 grid grid-cols-2 gap-x-2 gap-y-2">
        {data ? (
          data.map((item, index) => {
            return <Device key={index} data={item} />;
          })
        ) : (
          <p>No controller to render</p>
        )}
      </div>
    </>
  );
};

export default Controller;
