import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/users/register", {
                username,
                password,
                fname,
                lname,
                address,
                city,
                country,
                postalCode,
            })
            console.log(response)

        } catch (error) {

        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form className="px-24 py-20 w-full h-form" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <span className="font-semibold text-2xl w-full flex justify-center text-left mb-6">Register</span>

                    {/* Name */}
                    <div className="space-x-6 flex flex-row mb-4">
                        <div className="relative">
                            <input id="fname-input" type="text" placeholder="First Name" className="input w-36"
                                value={fname} onChange={(e) => setFname(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>

                        <div className="relative">
                            <input id="lname-input" type="text" placeholder="Last Name" className="input w-36"
                                value={lname} onChange={(e) => setLname(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>
                    </div>

                    {/* Address and Postal Code */}
                    <div className="space-x-6 flex flex-row mb-4">
                        <div className="relative">
                            <input id="address-input" type="text" placeholder="Address" className="input w-36"
                                value={address} onChange={(e) => setAddress(e.target.value)} />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>

                        <div className="relative">
                            <input id="code-input" type="text" placeholder="Postal/Zip Code" className="input w-36"
                                value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>
                    </div>

                    {/* Nation */}
                    <div className="space-x-6 flex flex-row mb-4">
                        <div className="relative">
                            <input id="city-input" type="text" placeholder="City" className="input w-36"
                                value={city} onChange={(e) => setCity(e.target.value)} />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>

                        <div className="relative">
                            <input id="country-input" type="text" placeholder="Country" className="input w-36"
                                value={country} onChange={(e) => setCountry(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar w-36"></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <input id="username-input" type="text" placeholder="Username" className="input w-80"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar w-80"></span>
                        </div>

                        <div className="relative">
                            <input id="password-input" type="password" placeholder="Password" className="input w-80"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="highlight"></span>
                            <span className="bar w-80"></span>
                        </div>
                    </div>
                    <div className="mt-16">
                        <input
                            type="submit"
                            value="Submit"
                            className="w-96 cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                        />
                    </div>

                    <div className="flex flex-row space-x-2 justify-center items-center mt-4">
                        <Link className="text-purple-400 font-semibold" to="/login">Back</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}