import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function ForwardAuctionBidPage() {
    const { auctionId } = useParams();
    const [bidAmount, setBidAmount] = useState("");
    const [currentHighestBid, setCurrentHighestBid] = useState("");

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
        <div className="auction-page">
            <h2>Place your bid for Forward Auction {auctionId}</h2>
            <h3>Current Highest Bid: {currentHighestBid}</h3>
            <form onSubmit={handleSubmit}> {/* Added class name */}
                <label>
                    Bid Amount:
                    <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min="1"
                    />
                </label>
                <button type="submit" className="buy-now">Place Bid</button> {/* Changed class name */}
            </form>
        </div>
    );
}
