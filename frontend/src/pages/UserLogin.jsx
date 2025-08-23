import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  // to way binding the email input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userData, setUserData] = useState({});

  // Logging userData whenever it changes
  useEffect(() => {
    if (userData.email || userData.password) {
      console.log('User Data updated:', userData);
    }
  }, [userData])

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      email: email,
      password: password,
    });

    // empty the input fields after submission
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>

      {/* Main content for user login */}
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />


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
              //console.log(pass.target.value)
              setPassword(pass.target.value)
            }}
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
            id="password" />


          <button className='bg-[#111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>

        <p className='text-center'>New Here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link></p>
      </div>

      {/* Added a button for Captain Login */}
      <div>
        <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-bold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>

    </div>
  )
}

export default UserLogin