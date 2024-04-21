import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <nav className="flex justify-between items-center p-6 bg-white text-black">
            <div className="flex items-center">
                <div className="flex flex-row space-x-4 items-center">
                    <span className="select-none text-black font-bold text-xl">Auction</span>
                </div>
            </div>

            <div className="flex items-center">
            {!isLoggedIn ? (
                <div>
                    <Link to="/login" className="btn-login">Login</Link>
                    <Link to="/signup" className="btn-signup hover:bg-purple-700 transition ease-in-out duration-300">Create your account</Link>
                </div>
            ) : (
                <div>
                    <button className="btn-signup hover:bg-purple-700 transition ease-in-out duration-300">Sign Out</button>
                </div>
            )}
            </div>
        </nav>
    )
}