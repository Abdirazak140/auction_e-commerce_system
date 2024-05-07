import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { CiSearch } from "react-icons/ci";
import ItemCard from "../components/item_card";

export default function Catalogue() {
    const navigate = useNavigate();
    const { item } = useParams();
    const [searchedQuery, setSearchdQuery] = useState(item);
    const [isLoading, setLoading] = useState(false)
    const [items, setItems] = useState<{ id: number; name: string; currentBid: number; auctionType: string; endTime: string; }[]>([]);
    const [filteredItems, setFilteredItems] = useState<{ id: number; name: string; currentBid: number; auctionType: string; endTime: string; }[]>([]);
    const [selectedAuctionType, setSelectedAuctionType] = useState('All');

    const handleSearch = async () => {
        navigate(`/item-search/${searchedQuery}`)
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/catalogue/product/all/name/${searchedQuery}`);
            setItems(response.data._embedded.productList)
            setFilteredItems(selectedAuctionType === 'All' ? items : items.filter(item => item.auctionType === selectedAuctionType));

            console.log(items)
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAuctionTypeChange = (e: any) => {
        const selectedType = e.target.value;
        setSelectedAuctionType(selectedType);
        setFilteredItems(selectedType === 'All' ? items : items.filter(item => item.auctionType === selectedType));
    };

    useEffect(() => {
        const fetchAuthState = async () => {
            const sessionId = window.localStorage.getItem('sessionId');

            if (sessionId) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);
                    console.log(sessionId)
                    console.log(response.data);

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
                const response = await axios.get(`http://localhost:8080/api/catalogue/product/all/name/${searchedQuery}`);
                setItems(response.data._embedded.productList)
                setFilteredItems(selectedAuctionType === 'All' ? items : items.filter(item => item.auctionType === selectedAuctionType));
    
                console.log(items)
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }

        fetchCatalogue();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="h-screen w-screen flex flex-col justify-start items-start pt-12 pl-10">
                <div className="w-full mb-6">
                    <span className="text-4xl text-gray-600 font-bold">Catalogue</span>
                </div>

                <div className="search-bar-mini-container">
                    <input
                        placeholder="Search by..."
                        className="search-bar-mini"
                        type="text"
                        value={searchedQuery}
                        onChange={(e) => setSearchdQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="search-bar-mini-underline"></div>
                    <div className="search-bar-mini-highlight"></div>
                    <div className="search-bar-mini-icon">
                        <CiSearch size={20} />
                    </div>
                </div>


                <div className="w-full mt-6">
                    <div className="radio-inputs">
                        <label className="radio">
                            <input type="radio" name="radio" value="All" checked={selectedAuctionType === 'All'} onChange={handleAuctionTypeChange} />
                            <span className="name">All</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" value="dutch" checked={selectedAuctionType === 'dutch'} onChange={handleAuctionTypeChange} />
                            <span className="name">Dutch Auctions</span>
                        </label>

                        <label className="radio">
                            <input type="radio" name="radio" value="forward" checked={selectedAuctionType === 'forward'} onChange={handleAuctionTypeChange} />
                            <span className="name">Forward Auctions</span>
                        </label>
                    </div>
                </div>

                <div className="w-full mt-8 flex flex-wrap">
                    {filteredItems.map((item) => (
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

