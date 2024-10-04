import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://127.0.0.1:4000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Login Successful');
                const accessToken = data.data?.access_token;
                if (accessToken) {
                    localStorage.setItem('access-token', accessToken);
                    // Show the toast notification
                    toast.success('Login Successful!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Redirect after a short delay to allow the toast to be seen
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                }
            } else {
                setMessage(data.message || 'Login failed!');
            }
        } catch (error) {
            setMessage('Error occurred');
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="flex justify-center items-center h-screen bg-indigo-600">
                    <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                        <h1 className="font-semibold text-3xl">Login</h1>
                        <hr className="mt-3" />
                        <div className="mt-3">
                            <label className="block text-base mb-2 text-left">Username</label>
                            <input
                                type="text"
                                className="border w-full text-base px-2 py-2"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <label className="block text-base mb-2 text-left">Password</label>
                            <input
                                type="password"
                                className="border px-2 py-2 text-base w-full"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-5">
                            <button type="submit" className="border-2  text-xl text-white border-indigo-700 text-red py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-500 bg-cyan-700">
                                Login
                            </button>
                        </div>
                        <div className="mt-5">
                    <div className="text-lg" >Don't have an account? <Link to='/register' className="     text-amber-600">Register</Link></div>


                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
