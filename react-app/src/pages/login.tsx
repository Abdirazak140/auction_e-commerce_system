import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/navbar";
import LoadingScreen from "../components/loading";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", {
                username,
                password
            })
            console.log(response.data)
            if (response.data.substring(0, 5) === "Error"){
                setErrorMsg(response.data.substring(6));
            }
            else{
                localStorage.setItem('sessionId', response.data);
                navigate(`/dashboard`);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchAuthState = async () => {
            const sessionId = window.localStorage.getItem('sessionId');

            if (sessionId) {
                try {
                    const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);
                    console.log(sessionId)
                    console.log(response.data);

                    if (response.data === true) {
                        navigate(`/dashboard/${sessionId}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchAuthState();
    }, [])

    return (
        <body>
            {isLoading ? (<LoadingScreen/> ) : null}
             
            <Navbar/> 
            <div className="h-screen w-screen flex justify-center items-start pt-12">
                <form className="px-24 py-20 w-full h-form" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full h-full justify-center items-center">
                        <span className="font-semibold text-3xl w-full flex justify-center text-left mb-12">Login to your account</span>
                        <div className="space-y-3">
                            <div className="relative">
                                <input
                                    id="username-input" type="text" placeholder="Username" className="input w-72" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <span className="highlight"></span>
                                <span className="bar w-72"></span>
                            </div>

                            <div className="relative">
                                <input id="password-input" type="password" placeholder="Password" className="input w-72" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span className="highlight"></span>
                                <span className="bar w-72"></span>
                            </div>
                        </div>
                        <span className="text-xl text-red-500 font-bold mt-4">{errorMsg}</span>
                        <div className="mt-9">
                            <input
                                type="submit"
                                value="Submit"
                                className="w-96 cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                            />
                        </div>

                        {/* <div className="flex flex-row space-x-2 justify-center items-center mt-4">
                            <span>Not registered yet?</span>
                            <Link className="text-purple-400 font-semibold underline" to="/signup">Create an Account</Link>
                        </div> */}
                        <span className="mt-4 text-purple-400 font-semibold underline">Forgot Password?</span>
                    </div>

                </form>
            </div>
        </body>
    )
}