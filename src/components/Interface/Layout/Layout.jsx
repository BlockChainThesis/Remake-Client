import Header from './Header/Header';
import { motion } from 'framer-motion';
import Loader from './Loader/Loader';

const Layout = ({ children }) => {
  return (
    <motion.div
      id="mainLayout"
      className="flex min-h-dvh flex-col overflow-hidden"
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
      <Header />
      <Loader />
      <div
        className="
            relative flex h-full
            w-full flex-1 items-stretch px-4 pb-10 laptop:mx-auto laptop:max-w-4xl"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Layout;
