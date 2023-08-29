import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Signup'
import ForgetPassword from './ForgetPassword'
import Login from './Login'
import Home from "./Home"
import Resetpassword from './Resetpassword';




const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={< Login />} />
        <Route exact path="/signup" element={< Signup />} />
        <Route exact path='/forget_password' element={< ForgetPassword />} />
        <Route exact path='/reset_password' element={< Resetpassword />} />
      </Routes>
    </Router>
  )
}

export default Routing