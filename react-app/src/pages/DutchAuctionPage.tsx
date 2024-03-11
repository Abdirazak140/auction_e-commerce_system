import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AuctionPage.css"; 



export default function DutchAuctionBidPage() {
    const [currentPrice, setCurrentPrice] = useState("");
    const { auctionId } = useParams();

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
        <div className="auction-page">
            <h2>Dutch Auction: {auctionId}</h2>
            <h3>Current Price: ${currentPrice}</h3>
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
    );
}
