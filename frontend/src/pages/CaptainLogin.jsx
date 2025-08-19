import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [captainData, setCaptainData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Email:', email);

    setCaptainData({
      email: email,
      password: password
    })

    console.log('User Data:', captainData);
    // empty the input fields after submission
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      {/* Main content for user login */}
      <div>
        <img className='w-20 mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s" alt="" />


        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            value={email}
            onChange={(email) => {
              //console.log(email.target.value)
              setEmail(email.target.value)
            }}
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            id="email" />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(pass) => {
              //console.log(email.target.value)
              setPassword(pass.target.value)
            }}
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            id="password" />


          <button className='bg-[#111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>

        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link></p>
      </div>

      {/* Added a button for Captain Login */}
      <div>
        <Link to='/user-login' className='bg-[#d06a04] flex items-center justify-center text-white font-bold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>

    </div>
  )
}

export default CaptainLogin