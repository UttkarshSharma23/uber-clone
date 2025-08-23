import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserLogin, UserSignup, Home , CaptainSignup, CaptainLogin } from './pages'
import { UserDataContext } from './context/UserContext';


const App = () => {

const data =  useContext(UserDataContext)

  console.log("User Data in App.jsx:", data);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App