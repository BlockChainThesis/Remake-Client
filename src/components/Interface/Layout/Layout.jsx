import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { AnimatePresence, motion } from "framer-motion"

import Loader from "../Loader/Loader"
import Sidebar from "../../UI/Mobile/Sidebar/Sidebar"
import { useSelector } from "react-redux"

const Layout = ({children}) => {
    const isOpen = useSelector((state) => state.sidebar.isOpen)
    return (
        <motion.div
            id="mainLayout"
            className="flex flex-col min-h-dvh overflow-hidden"
            transition={{
                duration: 0.6,
            }}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,

            }}
            exit={{
                opacity: 0,
                x: '-100%',
            }}
        >
            <Header/>
            <Loader/>

            <AnimatePresence mode="wait">
                {isOpen &&<Sidebar/>}
            </AnimatePresence>

            <div className="
            laptop:max-w-2xl laptop:mx-auto relative
            px-4 flex-1 flex items-stretch w-full h-full pb-10">
                    {children}
            </div>

            <Footer/>
        </motion.div>
    )
    

}


export default Layout
