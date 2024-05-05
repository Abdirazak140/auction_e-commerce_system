import React from "react";

export default function ItemCard() {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-sm border-2 mx-2 my-2">
            <img
                className="w-full"
                src="https://via.placeholder.com/350x150"
                alt="Placeholder"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Name</div>
                <p className="text-gray-700 text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                    pharetra eros ac augue volutpat, sit amet efficitur nisl dapibus.
                </p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-semibold">Auction Type</span>
                    <span className="text-sm font-bold">$ Current Bid</span>
                </div>
            </div>
        </div>
    );
};
