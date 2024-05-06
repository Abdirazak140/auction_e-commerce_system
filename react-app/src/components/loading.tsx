import React from 'react';

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-700 opacity-75">
            <div className="flex flex-col items-center">
                <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4a7.946 7.946 0 01-6-2.709zm16-9.157A7.946 7.946 0 0120 12h4c0-6.627-5.373-12-12-12v4a7.962 7.962 0 016 2.709z"></path>
                </svg>
                <p className="text-lg text-white">Loading...</p>
            </div>
        </div>
    );
}

