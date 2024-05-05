import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { CiSearch } from "react-icons/ci";
import ItemCard from "../components/item_card";

export default function Catalogue() {
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
                            <input type="radio" name="radio" />
                            <span className="name">All</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" />
                            <span className="name">Dutch Auctions</span>
                        </label>

                        <label className="radio">
                            <input type="radio" name="radio" />
                            <span className="name">Forward Auctions</span>
                        </label>
                    </div>
                </div>

                <div className="w-full mt-8 flex flex-wrap">
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                </div>
            </div>
        </div>
    )
}

