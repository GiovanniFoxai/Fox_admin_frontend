import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { withoutAuthAxios } from '../config/config'
import { toast } from 'react-toastify'
import IsLoadingHOC from './IsLoadingHOC'
import { minUserPasswordLength } from '../Helper/constants'

const Signup = (props) => {
  const { setLoading, isLoading } = props

  const navigate = useNavigate()

  const [data, setdata] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmpassword: '',
  })



  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9-+]/g, ""); // Remove non-numeric, non-hyphen, and non-plus characters
    if (sanitizedValue.match(/^\+?[0-9-]*$/)) {
      setdata((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user", data);
    const payload = data;
    setLoading(true)
    await withoutAuthAxios()
      .post("/auth/register", payload)
      .then(
        (response) => {
          setLoading(false)
          if (response.data.status === 1) {
            toast.success("Registration Successfully")
            navigate("/login");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false)
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white pt-6 sm:pt-0">
      <section className="login-main">
        <div className="login-page">
          <h1>Welcome Back</h1>
          <form onSubmit={handleSubmit} className="" aria-label="Login form" method="POST">
            <div className="area-entry">
              <div className="email-area">
                <input type="text" id="email" autoComplete="email" aria-label="Email" name="name" onChange={handleChange} value={data.name} required aria-invalid="false" className="" placeholder="Full name" fdprocessedid="g89qhl" />
              </div>
            </div>
            <div className="area-entry">
              <div className="email-area">
                <input type="text" id="email" maxLength={13} autoComplete="email" aria-label="Email" name="mobile" onChange={handleChangePhone} value={data.mobile} required aria-invalid="false" className="" placeholder="Mobile" fdprocessedid="g89qhl" />
              </div>
            </div>
            <div className="area-entry">
              <div className="email-area">
                <input type="email" id="email" autoComplete="email" aria-label="Email" name="email" onChange={handleChange} value={data.email} required aria-invalid="false" className="" placeholder="Email address" fdprocessedid="g89qhl" />
              </div>
            </div>
            <div className="email-area">
              <div className="relative"><input type="password" minLength={minUserPasswordLength} aria-label="Password" name="password" onChange={handleChange} value={data.password} required aria-invalid="false" className=" " placeholder="Password" fdprocessedid="ugqpqh" />
              </div>
            </div>
            <div className="email-area">
              <div className="relative"><input type="password" minLength={minUserPasswordLength} aria-label="Password" name="confirmpassword" onChange={handleChange} value={data.confirmpassword} required aria-invalid="false" className="" placeholder="Confirm Password" fdprocessedid="ugqpqh" />
              </div>
            </div>
            <div className="continue-next">
              <button aria-label="Sign in" type="submit">Continue</button>
            </div>
          </form>
          <p className="sign-up"> Already have an account?  <Link to="/login">Login</Link></p>
        </div>
      </section>
    </div>
  )
}

export default IsLoadingHOC(Signup)