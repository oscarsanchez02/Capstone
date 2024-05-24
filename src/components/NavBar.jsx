import { Link } from "react-router-dom";

export default function NavBar(){


    return(
        <div className="flex flex-col justify-center bg-gray-900">
            <div className="flex justify-between item-center px-20 py-5">
                <h1 className="text-2xl uppercase font-bold mt-10 text-center mb-10 text-white">
                Store
                </h1>
                <div className="flex justify-between gap-1">
                    </div>
                    <Link to='/' className="px-4 py-12 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:bg-gray-700">
                    Home
                    </Link>
                    <Link to='/register' className="px-4 py-12 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:bg-gray-700">
                    Sign UP
                    </Link>
                    <Link to='/login' className="px-4 py-12 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:bg-gray-700">
                    Login
                    </Link>
                    <button className="px-4 py-12 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:bg-gray-700">
                    Logout
                    </button>
                    <button  className="px-4 py-12 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:bg-gray-700">
                    Cart
                </button>
            </div>
        </div>
    );
}