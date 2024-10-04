import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username,setUsername]=useState('')
  const navigate=useNavigate('')

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password,username })
    });
    const data = await response.json();
    if (response.ok) {
      setMessage('Registration successful!');
      const accessToken=data.data?.access_token
            console.log('token',accessToken); 
            if (accessToken){
                localStorage.setItem('access-token', accessToken)
                toast.success('Login Successful!',{
                  position:'top-left',
                  autoClose:1000,
                })
                
                
                
                
                console.log('Token',localStorage.getItem('access-token'));
                setTimeout(()=>{
                  navigate('/')

                },4000)
                
            }
      // Handle successful registration (e.g., redirecting)
    } else {
      setMessage(data.message || 'Registration failed!');
    }
  };

  return (
    <div>
    <form onSubmit={handleRegister}>
    <div className="flex justify-center items-center h-screen bg-indigo-600 ">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="font-semibold text-3xl">Registration</h1>
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
        <div className='mt-3'>
       <label className='block text-base mb-2 text-left'>Email</label>
      <input
          className="border w-full text-base px-2 py-2"
          type="email"
          value={email}
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          required
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
          <button type="submit" className="border-2 text-white text-xl border-indigo-700 text-red py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-indigo-500 bg-cyan-700">
            Register
          </button>
        </div>
        <div className="mt-5">
          <Link className='text-amber-600 text-lg'  to='/login'>Already have an account?</Link>

        </div>
      </div>
    </div>
    </form>
    <ToastContainer/>
    </div>

  );
};

export default RegisterForm;
