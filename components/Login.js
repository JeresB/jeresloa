'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Login() {

    const { currentUser, loginWithGithub, loginWithGoogle, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleAvatarClick = () => {
        setMenuOpen(!menuOpen)
    }

    const handleClickOutside = (event) => {
        if (menuOpen && !event.target.closest('#user-dropdown') && !event.target.closest('img')) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div>
            {currentUser ? (
                <div className="min-w-[200px] flex flex-col items-end">
                    <img
                        src={currentUser.photoURL}
                        alt="avatar"
                        onClick={handleAvatarClick}
                        style={{ cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px' }}
                    />
                    {menuOpen && (
                        <div className="absolute z-50 m-6 top-[50px] right-0 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 box-shadow-loa" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{currentUser.displayName}</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{currentUser.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link href={'/roster'}>
                                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><button>Roster</button></div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/tasksconfig'}>
                                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><button>Tasks Config</button></div>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/raidstracker'}>
                                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><button>Raids Tracker</button></div>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"><button onClick={logout}>Logout</button></a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex flex-row flex-nowrap gap-2'>
                    <button onClick={loginWithGoogle} className='text-gray-500 hover:text-gray-200'><i className="fa-brands fa-2xl fa-google"></i></button>
                    <button onClick={loginWithGithub} className='text-gray-500 hover:text-gray-200'><i className="fa-brands fa-2xl fa-github"></i></button>
                </div>
            )}
        </div>
    )
}
