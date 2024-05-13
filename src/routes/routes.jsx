//Component
import Login from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Form from "../pages/Form/Form";
import History from "../pages/History/History";
import Select from "../pages/History/Select";
import Station from "../components/Interface/Station/Station";
import StationList from "../components/Interface/Station/StationList";
import Layout from "../components/Interface/Layout/Layout";
import StationHistory from "../pages/History/StationHistory";
import Martket from "../pages/Market/Market";
import Product from "../pages/Market/Product";
import NFTs from "../pages/NFTs/NFTs";
import MyWallet from "../pages/Wallet/MyWallet";
import AddNFT from "../pages/NFTs/AddNFT";
import AddProduct from "../pages/Market/AddProduct";
import Inventory from "../pages/Inventory/Inventory";

//Library 
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/auth', component: Login},
]

const privateRoutes = [
    {path: '/market',component: Martket},
    {path: '/market/:productId',component: Product},
    {path: '/market/add/:cropID',component: AddProduct},

    {path: '/menu',component: Menu},
    {path: '/menu/inventory', component: Inventory},
    {path: '/NFT/:cropID', component: AddNFT},

    {path: '/menu/form', component: Form},
    {path: '/menu/history/select', component: Select},
    {path: '/menu/history/:deviceType', component: History},
    {path: '/menu/history/station', component: StationHistory},
    {path: '/menu/station', component: StationList},
    {path: '/menu/station/:stationId', component: Station},
    {path: '/NFTs', component: NFTs},
    {path: '/wallet', component: MyWallet},
]
const userRoutes = [
    {path: '/market',component: Martket},
    {path: '/market/:productId',component: Product},
    {path: '/inventory', component: Inventory},
    {path: '/NFTs', component: NFTs},
    {path: '/wallet', component: MyWallet},
]
const AnimatedRoutes = ({children}) => 
    <AnimatePresence mode="wait">
        {children}
    </AnimatePresence>
    

const MainRoutes = () => {
    const user = useSelector(state => state.auth.user)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const location = useLocation()

    return (
            <AnimatedRoutes>
                <Routes location={location} key={location.pathname}>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route key={index} path={route.path}
                            element={<Layout><Page/></Layout>}/>
                        )
                    })}
                    {isAdmin && privateRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route key={index} path={route.path}
                                element={
                                    <Layout>
                                        {user ? <Page/> : <Navigate to= '/' replace/>}
                                    </Layout>
                                }
                            />
                        )
                    })}
                    {!isAdmin && userRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route key={index} path={route.path}
                                element={
                                    <Layout>
                                        {user ? <Page/> : <Navigate to= '/' replace/>}
                                    </Layout>
                                }
                            />
                        )
                    })}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatedRoutes>
    )
}

export default MainRoutes