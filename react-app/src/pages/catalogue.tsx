import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { CiSearch } from "react-icons/ci";

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
                        className="search-bar"
                        type="text"
                    />
                    <div className="search-bar-mini-underline"></div>
                    <div className="search-bar-mini-highlight"></div>
                    <div className="search-bar-mini-icon">
                        <CiSearch size={30}/>
                    </div>     
                </div>
                
                <div className="w-full">
                   
                </div>
            </div>
        </div>
    )
}

