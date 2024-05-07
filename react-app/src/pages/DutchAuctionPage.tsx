import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AuctionPage.css";
import imageUrl from "../images/vintageCar.jpeg";
import Navbar from "../components/navbar";

export default function DutchAuctionBidPage() {
    const navigate = useNavigate();
    const sessionId = window.localStorage.getItem('sessionId');
    const { id } = useParams();
    const [currentPrice, setCurrentPrice] = useState("");
    const [endTime, setEndTime] = useState("");
    const [itemName, setItemName] = useState("");
    const [errorMsg, setErrorMsg] = useState("")
    const [userInfo, setUserInfo] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/catalogue/product/all/id/${id}`);
                setCurrentPrice(response.data.currentBid)
                setItemName(response.data.name)
                setEndTime(response.data.endTime)
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAuthState = async () => {
            if (sessionId) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);
                    if (response.data === false) {
                        navigate(`/login`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchAuthState();
    }, [])


    const handleBuyNow = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auctions/buyProduct?auctionId=${id}&sessionId=${sessionId}`);
            console.log(response);
            setErrorMsg(response.data.msg)
            if (response.data.successful) {
                navigate(`/auction-end/${id}/${currentPrice}`);
            }
        } catch (error) {
            console.error("Error buying now: ", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="outer-container" style={{ marginTop: '5%' }}>
                <div className="auction-container">
                    <div className="auction-image">
                        <img src={imageUrl} alt="Auction Item" />
                    </div>
                    <div className="auction-details">
                        <h1 className="auction-header">Product Item: {itemName} #{id}</h1>
                        <div className="time-limit-container">
                            <p>End Time:</p>
                            <p>{endTime}</p>
                        </div>
                        <p className="current-price">Current Price: ${currentPrice}</p>
                        <span className="text-xl text-gray-500 mt-4">{errorMsg}</span>
                        <div style={{ bottom: '30.5%', position: 'absolute' }}>
                            <button className="w-96 cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                                onClick={handleBuyNow}
                            >Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
