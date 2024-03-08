import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event: any) =>  {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080//api/users/login", {
                username,
                password
            })
            console.log(response)

        } catch (error) {

        }

    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form className="px-24 py-20 w-full h-form" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full h-full justify-center items-center">
                    <span className="font-semibold text-2xl w-full flex justify-center text-left mb-6">Login</span>
                    <div className="space-y-3">
                        <div className="relative">
                            <input 
                            id="username-input" type="text" placeholder="Username" className="input w-72" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <span className="highlight"></span>
                            <span className="bar w-72"></span>
                        </div>

                        <div className="relative">
                            <input id="password-input" type="password" placeholder="Password" className="input w-72" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <span className="highlight"></span>
                            <span className="bar w-72"></span>
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
                        <span>Not registered yet?</span>
                        <Link className="text-purple-400 font-semibold" to="/signup">Create an Account</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}