import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MetaMaskIcon from '../../assets/metamask.png';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../redux/Auth/Slice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const loginMethod = [
    {
      icon: <FontAwesomeIcon icon="fa-brands fa-google" />,
      name: 'google',
      color: 'bg-white',
      text: 'text-black',
    },
    {
      icon: <FontAwesomeIcon icon="fa-brands fa-github" />,
      name: 'github',
      color: 'bg-black',
      text: 'text-white',
    },
    {
      icon: <img src={MetaMaskIcon} className="max-w-[17px]" />,
      name: 'metamask',
      color: 'bg-white',
      text: 'text-orange-500',
      login: () => dispatch(authenticate()),
    },
  ];

  useEffect(() => {
    if (user) navigate('/menu');
  }, [user, navigate]);

  return (
    <>
      <motion.div
        transition={{
          duration: 0.5,
        }}
        initial={{
          position: 'absolute',
          top: '50%',
          left: 0,
          y: '-50%',
          opacity: 0,
        }}
        animate={{
          left: '50%',
          x: '-50%',
          opacity: 1,
        }}
        className="w-full max-w-[66%] rounded-lg bg-transparent p-4 shadow-1 shadow-primary-400"
      >
        <p className="absolute -top-6 bg-main-100 font-sans text-3xl font-semibold text-primary-400">Connect</p>
        <ul className="m-2 flex flex-col gap-3.5">
          {loginMethod.map((method, index) => {
            return (
              <li key={index} className="flex w-full font-mono text-lg uppercase">
                <a
                  onClick={() => method.login()}
                  className={`flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg border border-main-400
                                        p-2 tracking-wider duration-100 hover:-translate-y-1 hover:shadow-2
                                        active:translate-y-0 active:shadow-clicked
                                        ${method.color} ${method.text}`}
                >
                  {method.icon}
                  {method.name}
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
};
export default Login;
