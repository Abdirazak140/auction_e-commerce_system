import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const navigate = useNavigate();
  const [searchedQuery, setSearchdQuery] = useState("");

  const handleSearch = () => {
    navigate(`/item-search/${searchedQuery}`)
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

  return (
    <div>
      <Navbar />

      <div className="h-screen w-screen flex flex-col justify-start items-start pt-12 pl-10">
        <div className="w-full mb-6">
          <span className="text-4xl text-gray-600 font-bold">Item Search</span>
        </div>
        <div className="search-bar-container">
          <input
            placeholder="Search by..."
            className="search-bar"
            type="text"
            value={searchedQuery}
            onChange={(e) => setSearchdQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="search-bar-underline"></div>
          <div className="search-bar-highlight"></div>
          <div className="search-bar-icon">
            <CiSearch size={30} />
          </div>
        </div>

        <div className="w-full mt-24 text-gray-600 text-lg flex justify-center">
          <span className="w-1/2 text-center">Start your journey now. Simply enter a keyword or item name in the search bar above and let the bidding excitement begin!</span>
        </div>
      </div>
    </div>
  )
}

