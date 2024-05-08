import { useEffect, useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const sessionId = window.localStorage.getItem('sessionId');

    const handleLogout = async (event: any) => {
        event.preventDefault();
        
        try {
            const response = await axios.delete(`http://localhost:8080/api/users/logout?sessionId=${sessionId}`);
            console.log(response.data)
            navigate(`/`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchAuthState = async () => {
            if (sessionId) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);

                    if (response.data === true) {
                        setLoggedIn(true)
                    }
                    else{
                        setLoggedIn(false)
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchAuthState();
    }, [])

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
                        <Link to="/manage-auctions" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">my_auctions</Link>

                        <Link to="/dashboard" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">dashboard</Link>
                        <Link to="/item-search" className="text-lg text-gray-500 hover:text-gray-800 transition ease-in-out duration-300">catalogue</Link>
                        <button onClick={handleLogout} className="btn-signup hover:bg-purple-700 transition ease-in-out duration-300">Sign Out</button>
                    </div>
                )}
            </div>
        </nav>
    )
}