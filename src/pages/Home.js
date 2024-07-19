import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils/toaster';


const Home = () => {

  const [loggedInUser, setLoggedInUser]= useState('');
  const Navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[]);

  const handleSubmit = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(()=>{
      Navigate('/login')
    },1000)
    handleSuccess('Logged Out');
  };

  return (
    <div className='w-[100vw] h-screen flex justify-center border items-center'>
      <div className='flex flex-col items-center justify-center space-y-3'>
      <h1 className='m-auto text-center text-xl font-bold'>Welcome {loggedInUser}</h1>
      <button onClick={handleSubmit} className='py-1 px-2 text-white rounded-lg hover:bg-green-600 bg-green-500'>Logout</button>
      <ToastContainer />
      </div>
      
    </div>
  )
}

export default Home;
