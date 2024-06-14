import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAccount } from '../../../../redux/Auth/Slice';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isMenu = location.pathname === '/menu';
  const isHome = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  const BackButton = () => (
    <div onClick={() => navigate(-1)} className="cursor-pointer">
      <FontAwesomeIcon icon="fa-solid fa-chevron-left" className="text-2xl text-primary-500" />
    </div>
  );

  return (
    <header
      className="
            tablet: mx-auto
            flex 
            w-screen items-center justify-between
            bg-transparent px-4 py-2.5
            text-3xl text-black desktop:max-w-4xl           
        "
    >
      {!isHome && !isMenu ? <BackButton className="bottom-6 flex-row-reverse" direction="left" name="Back" to={-1} /> : <div></div>}
      {!isHome && !isAuth && (
        <button
          className="flex hover:cursor-pointer"
          onClick={() => {
            dispatch(clearAccount());
            navigate('/');
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="text-2xl text-main-300" />
        </button>
      )}
    </header>
  );
};

export default Header;
