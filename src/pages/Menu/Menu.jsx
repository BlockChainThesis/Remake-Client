import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Menu = () => {
    const menuItems = [
        {
            path: '/menu/station',
            name: 'Station',
            icon: 'fa-tower-cell',
            className: 'col-span-2'
        },
        {
            path: '/menu/form',
            name: 'Form',
            icon: 'fa-file-lines',
            className: 'col-span-2'
        },
        {
            path: '/menu/inventory',
            name: 'Inventory',
            icon: 'fa-boxes-stacked',
            className: 'col-span-2'
        },
        {
            path: '/menu/history/select',
            name: 'History',
            icon: 'fa-solid fa-clock',
            className: 'col-span-2'
        },
        {
            path: '/market',
            name: 'Market',
            icon: 'fa-solid fa-shop',
            className: 'col-span-2'
        },
        {
            path: '/wallet',
            name: 'Wallet',
            icon: 'fa-solid fa-wallet',
            className: 'col-span-2'
        },
    ]

    return (
        <>
            <nav className="
            bg-transparent
            p-4 rounded-3xl
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            grid grid-cols-4 gap-2
            w-full h-full ">
                {
                    menuItems.map((item, index) => {
                        return (
                            <Link className={`
                            desktop:text-3xl
                            bg-primary-400 p-2 rounded-[8px]
                            flex flex-col gap-2 justify-center items-center 
                            text-white
                            hover:-translate-y-2  hover:shadow-2
                            active:shadow-clicked-menu active:translate-y-0
                            ${item.className}`}

                            to={item.path} key={index} >
                                <FontAwesomeIcon className="text-6xl" icon={item.icon}/>
                                <p className="font-mono font-bold text-md">
                                    {item.name}
                                </p>
                            </Link>
                        )
                    })
                }
            </nav>
        </>
    )
}


export default Menu