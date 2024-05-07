import React, { useEffect, useState } from "react";
import "../styles/AuctionPage.css";
import auctionEndImage from "../images/chevroletCorvette.jpeg"
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AuctionEndPage = () => {
    const navigate = useNavigate();
    const sessionId = window.localStorage.getItem('sessionId');
    const [userInfo, setUserInfo] = useState<any>({})
    const [isWinner, setIsWinner] = useState(false);
    const { id, price } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/catalogue/product/all/id/${id}`);
                
                const productData = response.data

                try {
                    const response = await axios.get(`http://localhost:8080/api/users/user?sessionId=${sessionId}`);
                    setUserInfo(response.data)
                } catch (error) {
                    console.log(error);
                }

                if (productData.currentWinnerID === userInfo.id) {
                    setIsWinner(true)
                }
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

    const handleBuyNow = () => {
        navigate(`/payment/${id}/${price}`);
    };


    return (
        <>
            <Navbar />
            <div className="auction-page">
                <h1 className="auction-end-heading">Auction Ended</h1>
                {isWinner ? (<p className="auction-end-message">
                    Congratulations {userInfo.fname} {userInfo.lname} ! You can now proceed to payment.
                </p>) :
                (<p className="auction-end-message">
                Unfortunately, {userInfo.fname} {userInfo.lname}, you did not win this auction. Better luck next time!
            </p>)
                
            }
                
                {isWinner && (
                    <img src={auctionEndImage} alt="Auction Ended" className="auction-end-image" />
                )}

                {isWinner ?
                    (<div className="w-full mt-2 flex justify-center">
                        <button onClick={handleBuyNow} className="w-96 cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300">Pay Now</button>
                    </div>) :

                    (<div className="w-full mt-2 flex justify-center">
                        <button onClick={() => (
                            navigate(`/dashboard`))
                        } className="w-96 cursor-pointer bg-red-600 text-white py-4 px-4 rounded-md hover:bg-red-700 transition duration-300">Back to dashboard</button>
                    </div>)
                }
            </div>
        </>
    );
};

export default AuctionEndPage;


