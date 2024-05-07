import React, { useEffect, useState } from 'react';
import '../styles/Payment.css';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const sessionId = window.localStorage.getItem('sessionId');
  const { id, price } = useParams();
  const [formData, setFormData] = useState<any>({
    sessionId: sessionId,
    creditCardNumber: '',
    nameOnCard: '',
    expDate: '',
    securityCode: '',
    totalPayment: price,
    productId: id,
  });
  const [userInfo, setUserInfo] = useState<any>({})

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/pay', formData);
      console.log(response.data);
      if (response.data.paymentSuccessful) {
        navigate(`/receipt/${id}/${price}`);
      }

    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className='flex flex-row justify-evenly h-screen w-screen py-10 bg-gradient-to-r from-white to-blue-100'>
        <div className="flex flex-col">
          <span onClick={() => (
            navigate(`/dutch-auction-bid/${id}`))
          }
            className='text-blue-500 font-bold text-2xl mb-24 cursor-pointer'>{'< Back'}</span>
          <h1 className="text-2xl font-bold mb-4">Winning Bidder #{id}{userInfo.id}</h1>
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
        <form className="px-10 py-5 rounded-lg overflow-hidden shadow-sm border-4 bg-gray-100" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-start">
            <span className="font-semibold text-2xl w-full flex justify-start text-left mb-6">Enter Card Details</span>
            <div className="space-y-3">
              <div className="relative">
                <input
                  id="card-number-input" type="text" placeholder="Card number" className="input w-72" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} />
                <span className="highlight"></span>
                <span className="bar w-72"></span>
              </div>

              <div className="relative">
                <input id="name-input" type="text" placeholder="Name on card" className="input w-72" name="nameOnCard" value={formData.nameOnCard} onChange={handleChange} />
                <span className="highlight"></span>
                <span className="bar w-72"></span>
              </div>

              <div className="relative">
                <input id="exp-date-input" type="text" placeholder="Exp. date" className="input w-72" name="expDate" value={formData.expDate} onChange={handleChange} />
                <span className="highlight"></span>
                <span className="bar w-72"></span>
              </div>

              <div className="relative">
                <input id="security-code-input" type="text" placeholder="Security code" className="input w-72" name="securityCode" value={formData.securityCode} onChange={handleChange} />
                <span className="highlight"></span>
                <span className="bar w-72"></span>
              </div>
            </div>
            <span className="text-xl text-red-500 font-bold mt-4"></span>
            <div className="mt-24">
              <input
                type="submit"
                value="Submit"
                className="w-96 cursor-pointer bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Payment;
