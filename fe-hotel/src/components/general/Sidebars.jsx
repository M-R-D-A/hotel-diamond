import React, { useEffect, useContext } from 'react'
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from '../../context/auth-context';
import { IconContext } from 'react-icons/lib';


import { FaPowerOff } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';
import { TiGroup } from 'react-icons/ti';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { IoDiamond } from 'react-icons/io5';
const navLinks = [
    {
        role: 'guest',
        links: [
            { to: '/', label: 'Home' },
            { to: '/daftar_kamar', label: 'Daftar Kamar' },
            { to: '/bukti', label: 'Bukti Pemesanan' },
            { to: '/about', label: 'About' }
        ]
    },
    {
        role: 'resepsionis',
        links: [
            { to: '/', label: 'Pemesanan' },
            { to: '/resp/detail', label: 'Detail' }
        ]
    },
    {
        role: 'admin',
        links: [
            { to: '/', label: 'Home', icon: <MdSpaceDashboard /> },
            { to: '/penjualan', label: 'Penjualan', icon: <BsFillBarChartFill /> },
            { to: '/manajer', label: 'Manajer', icon: <TiGroup /> },
            { to: '/resepsionis', label: 'Resepsionis', icon: <RiCustomerService2Fill /> }
        ]
    }
];


const Sidebars = () => {
    const ctx = useContext(AuthContext);
    const isLoggedIn = ctx.isLoggedIn;
    const role = ctx.role;
    const location = useLocation();
    const { pathname } = location;

    const logout = () => {
        ctx.onLogout();
    };
    return (
        <aside className="z-20 lg:relative transition-all font-lato">

            {/* wrapper */}
            <div className='w-30 md:w-60 py-3 px-5 h-screen relative overflow-y-auto shadow-md drop-shadow-md bg-main-dark-bg transition-all duration-300 scrollbar-hide'>

                {/* wrapper navigation button */}
                <div className="md:space-y-4 md:w-full">

                    {/* navigation button data */}
                    <div className='text-center'>

                        <div className='hidden md:block'>

                            <div className='flex justify-center bg-clip-text text-transparent text-6xl py-2 mt-3'>
                                <svg width="0" height="0">
                                    <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                        <stop stopColor="#7a6ded" offset="0%" />
                                        <stop stopColor="#591885" offset="100%" />
                                    </linearGradient>
                                </svg>
                                <IoDiamond style={{ fill: "url(#blue-gradient)" }} />
                            </div>
                            <h1 className='text-purple-500 italic mb-6'> Hotel Diamond</h1>
                            <h1 className="text-white font-semibold text-xl uppercase py-2">
                                {role}
                            </h1>
                        </div>


                        {navLinks.map((navItem) => {
                            if (isLoggedIn && role === navItem.role) {
                                return (
                                    <div key={navItem.role} className='py-3 text-white'>
                                        <ul className="flex flex-col gap-y-3 w-full">
                                            {navItem.links.map((link, index) => (
                                                <li key={link.to}>
                                                    <NavLink
                                                        to={link.to}
                                                        end={link.to === '/'}
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? 'hover:bg-gray-700 bg-secondary-dark-bg text-yellow-500 shadow-gray-600 shadow-md block font-semibold  p-1 py-2 rounded-md transition-all duration-150 ease-linear'
                                                                : 'hover:bg-gray-700  text-white block font-semibold  p-1 py-2 rounded-md transition-all duration-150 ease-linear '
                                                        }
                                                    >
                                                        <div className={`flex  gap-8 items-center mx-3 justify-start text-start`}>
                                                            <div
                                                                key={index}
                                                                className={pathname === link.to ? 'bg-yellow-500 text-black rounded-md p-2' : 'bg-secondary-dark-bg shadow-gray-600 shadow-md rounded-md p-2'}>
                                                                {link.icon}
                                                            </div>
                                                            <h1 className='text-l hidden md:block'>
                                                                {link.label}
                                                            </h1>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                );
                            }
                            return null;
                        })}

                    </div>
                </div>
                <div className='absolute bottom-0 left-0 right-0 mx-4 mb-8'>
                    <div className='space-y-4'>
                        <button
                            onClick={logout}
                            className='hover:bg-gray-700 bg-secondary-dark-bg border-red-500 hover:border-l-8 p-2 text-red-500 w-full block rounded-md transition-all duration-200 ease-linear'
                        >
                            <div className='flex  gap-8 items-center justify-start text-start'>
                                <div
                                    className='bg-main-dark-bg rounded-md p-2 ml-8'>
                                    <FaPowerOff />
                                </div>
                                <h1 className='text-l hidden md:block'>
                                    Logout
                                </h1>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebars