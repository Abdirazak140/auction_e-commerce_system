import React from 'react';
import '../styles/Payment.css';
import Navbar from '../components/navbar';
//import { Link, useLocation } from 'react-router-dom'
//<!-- <Link to="/Receipt" className='submit'>SUBMIT</Link> -->   

const Receipt = () => {
  return (
    <>
      <div className='flex flex-row justify-evenly h-screen w-screen py-10 bg-gradient-to-r from-white to-blue-100'>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Reciept</h1>
          <div className="flex flex-col py-4 rounded-lg w-96 overflow-hidden shadow-sm border-4 bg-white">
            <div className='Winning-bidder'>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>First Name:</p>
                <p className='text-black font-semibold'>Abdirazak</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Last Name:</p>
                <p className='text-black font-semibold'>Yusuf</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Address:</p>
                <p className='text-black font-semibold'>123 main street</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Province:</p>
                <p className='text-black font-semibold'>Ontario</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Country:</p>
                <p className='text-black font-semibold'>Canada</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Postal Code:</p>
                <p className='text-black font-semibold'>123 ABC</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Total Paid:</p>
                <p className='text-black font-semibold'>$100</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Item ID:</p>
                <p className='text-black font-semibold'>123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
          <div className="flex flex-col py-4 rounded-lg w-96 overflow-hidden shadow-lg border-4 bg-purple-500">
            <p className="text-lg text-center text-white font-semibold">The item will be shipped in XXX days</p>
          </div>

          <span className='text-blue-500 font-bold text-2xl mt-96 cursor-pointer'>{'Back to main page >'}</span>
        </div>

      </div>
    </>
  );
}

export default Receipt;
