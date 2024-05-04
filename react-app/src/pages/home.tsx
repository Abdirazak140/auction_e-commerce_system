import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className="home-section">
                <div className="home-content">
                    <h1 className="home-text">Create and Discover Exciting <span className='tag'>Auctions</span> Easily</h1>
                    <div className="mt-11">
                        <Link to="/signup" className='home-btn text-black font-bold text-xl mt-20 hover:bg-purple-700 transition ease-in-out duration-300'>Get started</Link>
                    </div>
                    <p>Find unique items in moments</p>
                </div>
            </div>
            <div className='features-section'>
                <strong className="text-orange-500">Features</strong>

            </div>
        </div>
    )
}