import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import {motion } from "framer-motion"

import Loader from "../Loader/Loader"

const Layout = ({children}) => {
    return (
        <motion.div
            id="mainLayout"
            className="flex flex-col min-h-dvh overflow-hidden"
            transition={{
                duration: 1,
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
            <div className="
            laptop:max-w-4xl laptop:mx-auto relative
            px-4 flex-1 flex items-stretch w-full h-full pb-10">
                    {children}
            </div>

            <Footer/>
        </motion.div>
    )
    

}


export default Layout
