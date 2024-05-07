import React, { useEffect, useState } from 'react';
import '../styles/Payment.css';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { Link, useLocation } from 'react-router-dom'
//<!-- <Link to="/Receipt" className='submit'>SUBMIT</Link> -->   

const Receipt = () => {
  const sessionId = window.localStorage.getItem('sessionId');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>({})
  const { id, price } = useParams();
  
  useEffect(() => {
    const fetchAuthState = async () => {
      if (sessionId) {
        try {
          const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);

          if (response.data === false) {
            navigate(`/login`);
          }
          else {
            try {
              const response = await axios.get(`http://localhost:8080/api/users/user?sessionId=${sessionId}`);
              setUserInfo(response.data)
              console.log(response)
              console.log(userInfo);
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchAuthState();
  }, []);
  return (
    <>
      <div className='flex flex-row justify-evenly h-screen w-screen py-10 bg-gradient-to-r from-white to-blue-100'>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Reciept</h1>
          <div className="flex flex-col py-4 rounded-lg w-96 overflow-hidden shadow-sm border-4 bg-white">
            <div className='Winning-bidder'>
            <div className='flex flex-row w-full justify-between px-3'>
                <p>First Name:</p>
                <p className='text-black font-semibold'>{userInfo.fname}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Last Name:</p>
                <p className='text-black font-semibold'>{userInfo.lname}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Address:</p>
                <p className='text-black font-semibold'>{userInfo.address}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>City:</p>
                <p className='text-black font-semibold'>{userInfo.city}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Country:</p>
                <p className='text-black font-semibold'>{userInfo.country}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Postal Code:</p>
                <p className='text-black font-semibold'>{userInfo.postalCode}</p>
              </div>
              <div className="w-full border-t border-gray-300 my-4 border-1"></div>
              <div className='flex flex-row w-full justify-between px-3'>
                <p>Total Cost:</p>
                <p className='text-black font-semibold'>${price}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
          <div className="flex flex-col py-4 rounded-lg w-96 overflow-hidden shadow-lg border-4 bg-purple-500">
            <p className="text-lg text-center text-white font-semibold">The item will be shipped in XXX days</p>
          </div>

          <span 
          onClick={() => (
            navigate(`/dashboard`))
          }
          className='text-blue-500 font-bold text-2xl mt-96 cursor-pointer'>{'Back to main page >'}</span>
        </div>

      </div>
    </>
  );
}

export default Receipt;
