import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(true);

    return (
        <nav className="flex justify-between items-center p-6 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <RiAuctionFill size={30} />
                    <span className="select-none text-black font-bold text-xl">Auction</span>
                </div>
            </div>

            <div className="flex items-center">
                {!isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">About</Link>
                        <Link to="/login" className="btn-login">Login</Link>
                        <Link to="/signup" className="btn-signup hover:bg-purple-700 transition ease-in-out duration-300">Create your account</Link>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link to="/dashboard" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">dashboard</Link>
                        <Link to="/item-search" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">catalogue</Link>
                        <button className="btn-signup hover:bg-purple-700 transition ease-in-out duration-300">Sign Out</button>
                    </div>
                )}
            </div>
        </nav>
    )
}