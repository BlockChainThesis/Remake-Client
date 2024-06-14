import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

const loaderContainer = document.getElementById('loaderContainer');

const Loader = () => {
  const isLoading = useSelector((state) => state.interface.isLoading);
  if (!isLoading) {
    return <></>;
  }
  return createPortal(
    <div id="loader">
      <div
        className="
            h-20 w-20 animate-spin 
            rounded-full border-8 border-primary-100 border-t-primary-400"
      />
    </div>,
    loaderContainer
  );
};

export default Loader;
