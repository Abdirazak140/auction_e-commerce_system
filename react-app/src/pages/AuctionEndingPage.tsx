import React from "react";
import "../styles/AuctionPage.css"; // Import the CSS file
import Header from "./Header";
import auctionEndImage from "../images/chevroletCorvette.jpeg"
const AuctionEndPage = () => {
    
    return (
        <>
        <Header />
        <div className="auction-page">
        <h1 className="auction-end-heading">Auction Ended</h1>
            <p className="auction-end-message">
                Congratulations John Doe! You can now proceed to payment.
            </p>
            {auctionEndImage && (
                <img src={auctionEndImage} alt="Auction Ended" className="auction-end-image" />
            )}
            <div className="expedited-shipment">
                <label>
                    <input type="checkbox" className="checkbox" />
                    Add expedited shipment for an additional cost.
                </label>
            </div>
            <div style={{left: "57%", position: "absolute", top: "95%"}}>
            <button className="pay-now-button">Pay Now</button>
            </div>
            <p className="payment-note">
                Only the winning bidder can proceed with payment. All others will receive a failure notice if they attempt to pay.
            </p>
        </div>
        </>
    );
};

export default AuctionEndPage;


