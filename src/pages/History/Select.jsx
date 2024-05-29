import Sensor from '../../assets/History/sensor.png';
import Controller from '../../assets/History/controller.png';
import { Link } from 'react-router-dom';

const Select = () => {
  return (
    <>
      <div
        className="
            absolute left-0 top-1/2 z-0
            flex h-full max-h-[60%] w-full -translate-y-1/2 flex-col gap-3 px-[inherit] py-12"
      >
        <Link
          to={'/menu/history/station'}
          className="
                    group flex h-full
                    w-full items-center justify-between rounded-xl bg-primary-400 p-5 shadow-select hover:bg-primary-300"
        >
          <p className="self-start text-xl font-bold text-main-100 group-hover:text-main-300">Station</p>
          <img src={Sensor} className=" max-w-[100px] group-hover:opacity-50" />
        </Link>
        <Link to={'/menu/history/controller'} className="group flex h-full w-full items-center justify-between rounded-xl bg-primary-400 p-5 shadow-select hover:bg-primary-300">
          <p className="group-hover:text-main-300text-xl self-start font-bold text-main-100">Controller</p>
          <img src={Controller} className=" max-w-[100px] group-hover:opacity-50" />
        </Link>
      </div>
    </>
  );
};

export default Select;
