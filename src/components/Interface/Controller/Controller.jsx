import { useDispatch } from 'react-redux';
// import Device from './Device'
import { useEffect } from 'react';
import { getAllController } from '../../../redux/Controller/Slice';
import { useSelector } from 'react-redux';

//IMG
import Device from './Device';

const Controller = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.controller.controllers);

  useEffect(() => {
    dispatch(getAllController());
  }, [dispatch]);

  // console.log(data)

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 m-3">
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
