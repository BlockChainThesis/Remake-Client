//Component
import Login from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import Menu from '../pages/Menu/Menu';
import Form from '../pages/Form/Form';
import Select from '../pages/History/Select';
import Station from '../pages/Station/Station';
import StationList from '../pages/Station/StationList';
import Layout from '../components/Interface/Layout/Layout';
import StationHistory from '../pages/History/StationHistory';
import Martket from '../pages/Market/Market';
import Product from '../pages/Market/Product';
import MyWallet from '../pages/Wallet/MyWallet';
import AddNFT from '../pages/NFTs/AddNFT';
import Inventory from '../pages/Inventory/Inventory';
import UserMenu from '../pages/Menu/UserMenu';
import ControllerHistory from '../pages/History/ControllerHistory';

//Library
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { authorization, clearAccount, setAccount } from '../redux/Auth/Slice';
import Crop from '../components/Interface/Crop/Crop';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/auth', component: Login },
];

const privateRoutes = [
  { path: '/menu', component: Menu },
  { path: '/market', component: Martket },
  { path: '/market/:productId', component: Product },
  { path: '/menu/inventory', component: Inventory },
  { path: '/menu/inventory/:cropId', component: Crop },

  { path: '/NFT/:cropID', component: AddNFT },
  { path: '/menu/form', component: Form },
  { path: '/menu/history/select', component: Select },
  { path: '/menu/history/controller', component: ControllerHistory },
  { path: '/menu/history/station', component: StationHistory },
  { path: '/menu/station', component: StationList },
  { path: '/menu/station/:stationId', component: Station },
  { path: '/wallet', component: MyWallet },
];
const userRoutes = [
  { path: '/menu', component: UserMenu },
  { path: 'menu/market', component: Martket },
  { path: 'menu/market/:productId', component: Product },
  { path: 'menu/inventory', component: Inventory },
  { path: 'menu/wallet', component: MyWallet },
];
const AnimatedRoutes = ({ children }) => <AnimatePresence mode="wait">{children}</AnimatePresence>;

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  const [mainRoutes, setMainRoutes] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      if (isAdmin) {
        setMainRoutes(privateRoutes);
      } else {
        setMainRoutes(userRoutes);
      }
    }
  }, [isAdmin, isLoggedIn]);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        dispatch(setAccount(accounts[0]));
        dispatch(authorization(accounts[0]));
      } else {
        dispatch(clearAccount());
      }
      navigate('/');
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [dispatch, navigate]);

  return (
    <AnimatedRoutes>
      <Routes location={location} key={location.pathname}>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {mainRoutes.length > 0 &&
          mainRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatedRoutes>
  );
};

export default MainRoutes;
