import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imageUrl from "../images/chevroletCorvette.jpeg"
import Navbar from "../components/navbar";

export default function ForwardAuctionBidPage() {
    const navigate = useNavigate();
    const sessionId = window.localStorage.getItem('sessionId');
    const { id } = useParams();
    const [currentPrice, setCurrentPrice] = useState("");
    const [endTime, setEndTime] = useState("");
    const [itemName, setItemName] = useState("");
    const [bidAmount, setBidAmount] = useState(0);
    const [errorMsg, setErrorMsg] = useState("")
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/catalogue/product/all/id/${id}`);
                setCurrentPrice(response.data.currentBid)
                setItemName(response.data.name)
                setEndTime(response.data.endTime)
                console.log(response)
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

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/userId?sessionId=${sessionId}`);
                setUserId(response.data);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);


    const handleBid = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auctions/placeBid?auctionId=${id}&bidAmount=${bidAmount}&sessionId=${sessionId}`);
            setErrorMsg(response.data.msg)

            if (response.data.successful) {
                const updateAuction = async () => {
                    try {
                        const response = await axios.put(`http://localhost:8080/api/catalogue/product/update/${id}/${bidAmount}?bidderId=${userId}`);
                        console.log("Ryan:", response.data);
                    } catch (error) {
                        console.error("Error buying now: ", error);
                    }
                }

                updateAuction();

                setCurrentPrice(bidAmount.toString())
            }

            console.log(response);  
        } catch (error) {
            console.error("Error buying now: ", error);  
        }
    };

    return (
        <>
        <Navbar/>
        <div className="outer-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh' }}>
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
                <p className="current-bid">Current Highest Bid: ${currentPrice}</p>
                <div className="bid-input mt-2">
                    <label htmlFor="bidAmount">Bid Amount: </label>
                    <input
                        id="bidAmount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(parseInt(e.target.value, 10))}
                        min="1"
                    />
                </div>
                <span className="text-xl text-gray-500 mt-4">{errorMsg}</span>
                <div className="mt-4">
                <button className="w-96 cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300" 
                onClick={handleBid}
                >
                    Place My Bid
                </button>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
