import React from "react";
import "./AuctionPage.css"; // Import the CSS file

const AuctionEndPage = () => {
    return (
        <div className="auction-page">
            <h1 className="auction-end-heading">Auction Ended</h1>
            <p className="auction-end-message">Congratulations! If you're the winning bidder, you can now proceed to payment.</p>
            <div className="expedited-shipment">
                <label>
                    <input type="checkbox" className="checkbox" /> Add expedited shipment for an additional cost.
                </label>
            </div>
            <button className="pay-now-button">Pay Now</button>
            <p className="payment-note">Only the winning bidder can proceed with payment. All others will receive a failure notice if they attempt to pay.</p>
        </div>
    );
};

export default AuctionEndPage;

