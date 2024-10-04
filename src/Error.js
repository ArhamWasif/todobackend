import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate=useNavigate()
    const handleLogout =() =>{
        navigate('/')
    }
  return (
    <div className='bg-cyan-600 '> <h4 className='text-center align-center text-8xl    align-middle text-red-800 '>404 Error not found!</h4>
        <div className='text-2xl'><button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 mb-4'>Go back to home page </button></div>


    </div>
  )
}

export default Error