import axios from "axios";
import Navbar from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchAuthState = async () => {
            const sessionId = window.localStorage.getItem('sessionId');
            if (sessionId) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);
                    console.log(sessionId)
                    console.log(response.data);

                    if (response.data === true) {
                        navigate(`/dashboard/`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchAuthState();
    }, [])


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
                <span className="text-orange-500 font-bold">Features</span>
                <main className="features-container">
                    <section className="card">
                        <h3>Auction System</h3>
                        <p><strong>Dutch Auction:</strong> Utilize the Dutch auction format to efficiently sell items starting at a higher price that gradually decreases until a buyer accepts the bid.</p>
                        <p><strong>Forward Auction:</strong> Implement the forward auction format where sellers offer items and buyers bid competitively, with the item going to the highest bidder.</p>
                    </section>

                    <section className="card">
                        <h3>User Authentication</h3>
                        <p><strong>Login Protection:</strong> Secure your platform by implementing user authentication to control access to auction features.</p>
                        <p><strong>Authentication Process:</strong> Users can securely log in with their credentials to access personalized features and manage their auction activities.</p>
                    </section>

                    <section className="card">
                        <h3>User Experience</h3>
                        <p><strong>User-Friendly Interface:</strong> Offer an intuitive and user-friendly interface for creating auctions, bidding, and searching for items of interest.</p>
                    </section>
                </main>

            </div>
        </div>
    )
}