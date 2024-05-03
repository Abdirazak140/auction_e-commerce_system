import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imageUrl from "../images/chevroletCorvette.jpeg"
import Header from './Header'; // Import the header component




export default function ForwardAuctionBidPage() {
    const { auctionId } = useParams();
    const [bidAmount, setBidAmount] = useState("");
    const [currentHighestBid, setCurrentHighestBid] = useState("");
    const [timeLeft, setTimeLeft] = useState(""); // Add state for time left

    useEffect(() => {
        const fetchCurrentBid = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/forward-auction/${auctionId}/current-highest-bid`);
                setCurrentHighestBid(response.data.highestBid);
            } catch (error) {
                console.error("Error fetching current highest bid: ", error);
            }
        };

        fetchCurrentBid();
    }, [auctionId]);



    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/forward-auction/${auctionId}/bid`, {
                bidAmount,
            });
            console.log(response);
            alert("Bid placed successfully!");
        } catch (error) {
            console.error("Error placing bid: ", error);
            alert("Failed to place bid.");
        }
    };

    return (
        <>
        <Header/>
        <div className="outer-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div className="auction-container">
            <div className="auction-image">
                <img src={imageUrl} alt="Auction Item" />
            </div>
            <div className="auction-details">
                <h1 className="auction-header">Product Item</h1>
                <div className="time-limit-container">
                    <p>Time Left:</p>
                    <p>{timeLeft}</p> {/* Update this to show the time left dynamically */}
                </div>
                <p className="current-bid">Current Highest Bid: {currentHighestBid}</p>
                <div className="bid-input">
                    <label htmlFor="bidAmount">Bid Amount: </label>
                    <input
                        id="bidAmount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min="1"
                    />
                </div>
                <div style={{bottom: '29%', position: 'absolute', left: '84.55%'}}>
                <button className="bid" onClick={handleSubmit}>
                    Place My Bid
                </button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
