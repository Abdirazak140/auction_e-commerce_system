import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { CiSearch } from "react-icons/ci";
import ItemCard from "../components/item_card";

export default function AuctionHistory() {
    const navigate = useNavigate();
    const sessionId = window.localStorage.getItem('sessionId');
    const [isLoading, setLoading] = useState(false)
    const [items, setItems] = useState<{ id: number; name: string; currentBid: number; auctionType: string; endTime: string; }[]>([]);
    const [userId, setUserId] = useState(null);

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
        setLoading(true);
        const fetchCatalogue = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/catalogue/product/seller?sellerId=${userId}`);
                setItems(response.data)
                console.log(response)
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }

        fetchCatalogue();
    }, [userId])

    return (
        <div>
            <Navbar />
            <div className="h-screen w-screen flex flex-col justify-start items-start pt-12 pl-10">
                <div className="w-full mb-6">
                    <span className="text-4xl text-gray-600 font-bold">My Auctions:</span>
                </div>

                <div className="w-full mt-8 flex flex-wrap">
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            currentBid={item.currentBid}
                            auctionType={item.auctionType}
                            endTime={item.endTime}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

