import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const menuItems = [
    {
      path: '/menu/inventory',
      name: 'Inventory',
      icon: 'fa-boxes-stacked',
      className: 'col-span-2',
    },
    {
      path: '/menu/market',
      name: 'Market',
      icon: 'fa-solid fa-shop',
      className: 'col-span-2',
    },
    {
      path: '/menu/wallet',
      name: 'Wallet',
      icon: 'fa-solid fa-wallet',
      className: 'col-span-2',
    },
  ];

  return (
    <>
      <nav className="absolute left-1/2 top-1/2 grid h-full w-full -translate-x-1/2 -translate-y-1/2 grid-cols-1 gap-2 rounded-3xl bg-transparent p-4 ">
        {menuItems.map((item, index) => {
          return (
            <Link
              className={`
                            flex
                            flex-col items-center justify-center
                            gap-2 rounded-[8px] bg-primary-400 p-2 text-white 
                            hover:-translate-y-2
                            hover:shadow-2  active:translate-y-0
                            active:shadow-clicked-menu desktop:text-3xl
                            ${item.className}`}
              to={item.path}
              key={index}
            >
              <FontAwesomeIcon className="text-6xl" icon={item.icon} />
              <p className="text-md font-mono font-bold">{item.name}</p>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default UserMenu;
