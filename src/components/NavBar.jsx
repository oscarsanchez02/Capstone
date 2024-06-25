import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cartLogo from '../assets/cart.svg';

export default function NavBar({user, setUser}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
      }, [user]);
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
      };

    return (
        <div className="flex flex-col justify-center bg-gray-900">
            <div className="flex justify-between items-center px-20 py-5">
                <Link to='/' className="text-2xl uppercase font-bold mt-10 text-center mb-10 text-white">
                    E Store
                </Link>
                <div className="flex gap-1">
                    <Link to='/' className="px-4 py-2 dark:bg-blue-600 text-white text-xs font-bold uppercase rounded dark:hover:bg-blue-700 focus:bg-gray-700">
                        Home
                    </Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to='/register' className="px-4 py-2 dark:bg-blue-600 text-white text-xs font-bold uppercase rounded dark:hover:bg-blue-700 focus:bg-gray-700">
                                Sign Up
                            </Link>
                            <Link to='/login' className="px-4 py-2 dark:bg-blue-600 text-white text-xs font-bold uppercase rounded dark:hover:bg-blue-700 focus:bg-gray-700">
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/user' className="px-4 py-2 dark:bg-blue-600 text-white text-xs font-bold uppercase rounded dark:hover:bg-blue-700 focus:bg-gray-700">
                                {user?.name?.firstname || 'Profile'}
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="px-4 py-2 dark:bg-blue-600 text-white text-xs font-bold uppercase rounded dark:hover:bg-blue-700 focus:bg-gray-700"
                            >
                                Logout
                            </button>
                            <Link to='/cart' className="px-4 py-2 dark:bg-yellow-300 text-xs font-bold uppercase rounded dark:hover:bg-yellow-700 focus:bg-gray-700">
                                <img src={cartLogo} className="w-10 h-6" alt="Cart" />
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// m38rmF$