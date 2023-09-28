import React, { useState, useEffect } from 'react'
import { withoutAuthAxios } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import IsLoadingHOC from './IsLoadingHOC';
import { useDispatch } from 'react-redux';
import { saveForgotPassEmail } from '../Redux/Reducers/authSlice';

const ForgetPassword = (props) => {
  const { setLoading, isLoading } = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[email , setEmail] =  useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {email};
    setLoading(true)
    await withoutAuthAxios()
      .post("auth/send-otp", payload)
      .then(
        (response) => {
          setLoading(false)
          if (response.data.status === 1) {
            const resData = response.data.data;
            toast.success("OTP sent successfully to your mail");
            dispatch(saveForgotPassEmail(email))
            navigate("/reset_password");
          } else {
            setLoading(false)
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  }


  return (

    <section className="login-main">
      <div className="login-page">
        <h1>Forget  Password ?</h1>
        <form onSubmit={handleSubmit} className="" aria-label="Login form" method="POST">
          <div className="area-entry">
            <div className="email-area">
              <input type="email" id="email" required name="email" value={email} onChange={(e) =>setEmail(e.target.value)} autoComplete="email" aria-label="Email" aria-invalid="false" className="" placeholder="Email address" fdprocessedid="g89qhl" />
            </div>
          </div>
          <div className="continue-next">
            <button aria-label="Sign in" type="submit" fdprocessedid="r4dvcy">Submit</button>
          </div>
        </form>
      </div>
    </section>

  )
}

export default IsLoadingHOC(ForgetPassword)