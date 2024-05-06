import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AuctionPage.css"; 
import Header from '../components/Header'; // Import the header component
import imageUrl from "../images/vintageCar.jpeg";



export default function DutchAuctionBidPage() {
    const [currentPrice, setCurrentPrice] = useState("");
    const { auctionId } = useParams();
    const [timeLeft, setTimeLeft] = useState(""); // Add state for time left


        useEffect(() => {
        const fetchCurrentPrice = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/forward-auction/${auctionId}/current-price`);
                setCurrentPrice(response.data.highestBid);
            } catch (error) {
                console.error("Error fetching current highest bid: ", error);
            }
        };

        fetchCurrentPrice();
    }, [auctionId]);

    const handleBuyNow = async () => {
        try {
            // Trigger the buy now action
            const response = await axios.post(`http://localhost:8080/api/dutch-auction/${auctionId}/bid`);
            console.log(response);
            alert("Purchase successful!");
        } catch (error) {
            console.error("Error buying now: ", error);
            alert("Failed to buy.");
        }
    };

    return (
        <>
            <Header />
            <div className="outer-container" style={{ marginTop: '5%' }}>
                <div className="auction-container">
                    <div className="auction-image">
                        <img src={imageUrl} alt="Auction Item" />
                    </div>
                    <div className="auction-details">
                        <h1 className="auction-header">Product Item: {auctionId}</h1>
                        <div className="time-limit-container">
                            <p>Time Left:</p>
                            <p>{timeLeft}</p>
                        </div>
                        <p className="current-price">Current Price: ${currentPrice}</p>
                        <div style={{bottom: '33.5%', position: 'absolute', left: '84%'}}>
                        <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
