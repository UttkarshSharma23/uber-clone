import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [userSigninData, setUserSignInData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();

    setUserSignInData({
      username: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
    })

    console.log('User Data:', userSigninData);
    
    // empty the input fields after submission
    setFirstName('');
    setLastName('');
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
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
          <div className='flex gap-2 mb-6'>
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-base placeholder:text-base'
              type="text"
              value={firstName}
              onChange={(fname) => {
                setFirstName(fname.target.value)
              }}
              placeholder='First Name'
              id="firstName" />

            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded px-4 py-2  text-base placeholder:text-base'
              type="text"
              placeholder='Last Name'
              value={lastName}
              onChange={(lname) => {
                setLastName(lname.target.value)
              }}
              id="lastName" />
          </div>


          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            type="email"
            placeholder='email@example.com'
            value={email}
            onChange={(email) => {
              setEmail(email.target.value)
            }}
            id="email" />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm'
            type="password"
            placeholder='password'
            value={password}
            onChange={(pass) => {
              setPassword(pass.target.value)
            }}
            id="password" />


          <button className='bg-[#111] text-white font-bold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'>Login</button>
        </form>

        <p className='text-center'>Already have an account? <Link to='/user-login' className='text-blue-600'>Login here</Link></p>
      </div>

      {/* terms  */}
      <div>
        <p className='text-[10px] leading-tight'>
          By proceeding, you agree to Uber's <span className='text-blue-600'>Terms of Service</span> and acknowledge that you have read the <span className='text-blue-600'>Privacy Policy</span>, including <span className='text-blue-600'>Cookie Use</span>.
        </p>
      </div>

    </div>
  )
}

export default UserSignup