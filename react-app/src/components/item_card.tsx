import React from "react";
import { useNavigate } from "react-router-dom";

interface ItemCard {
    id: number;
    name: string;
    currentBid: number;
    auctionType: string;
    endTime: string;
}

export default function ItemCard({id, name, currentBid, auctionType, endTime}: ItemCard) {
    const navigate = useNavigate();
    
    function selectItem(){
        if (auctionType === "dutch"){
            navigate(`/dutch-auction-bid/${id}`)
        }
        else{
            navigate(`/forward-auction-bid/${id}`)
        }
    }

    return (
        <div onClick={selectItem} className="max-w-sm cursor-pointer rounded overflow-hidden shadow-sm border-2 mx-2 my-2">
            <img
                className="w-full"
                src="https://via.placeholder.com/350x150"
                alt="Placeholder"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                    <span className="text-sm">End time: {endTime}</span>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold">Auction Type: {auctionType}</span>
                    <span className="text-sm font-bold">{`$ ${currentBid}`}</span>
                </div>
            </div>
        </div>
    );
};
