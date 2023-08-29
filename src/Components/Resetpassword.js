import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { withoutAuthAxios } from '../config/config';
import IsLoadingHOC from './IsLoadingHOC';
import { useNavigate } from 'react-router-dom';
import { minUserPasswordLength } from '../Helper/constants';
import { useSelector } from 'react-redux';

const Resetpassword = (props) => {
  const { setLoading } = props
  const navigate = useNavigate()
  const { forgotPassEmail } = useSelector(state => state.auth)

  const [data, setdata] = useState({
    otp: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    if (forgotPassEmail) {
      setdata((prev) => ({
        ...prev,
        email: forgotPassEmail,
      }));
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = data;

    setLoading(true)
    await withoutAuthAxios()
      .post("/auth/reset-password", payload)
      .then(
        (response) => {
          setLoading(false)
          if (response.data.status === 1) {
            toast.success("Password reset Successfully")
            navigate('/login')
          } else {
            toast.error(response?.data?.message);
          }
        },
        (error) => {
          setLoading(false)
          toast.error(error.response?.data?.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <section className="login-main">
      <div className="login-page">
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit} className="" aria-label="Login form" method="POST">
          <div className="area-entry">
            <div className="email-area">
              <input type="email" id="email" disabled aria-label="Email" name="email" onChange={handleChange} value={data.email} required aria-invalid="false" className="" placeholder="Email Address" fdprocessedid="g89qhl" />
            </div>
          </div>
          <div className="area-entry">
            <div className="email-area">
              <input type="text" id="email"  aria-label="Email" name="otp" onChange={handleChange} value={data.otp} required aria-invalid="false" className="" placeholder="OTP" fdprocessedid="g89qhl" />
            </div>
          </div>
          <div className="email-area">
            <div className="relative"><input minLength={minUserPasswordLength} type="password" autoComplete="current-password" aria-label="Password" name="password" onChange={handleChange} value={data.password} required aria-invalid="false" placeholder="Password" fdprocessedid="ugqpqh" />
            </div>
          </div>
          <div className="email-area">
            <div className="relative"><input minLength={minUserPasswordLength} type="password" autoComplete="current-password" aria-label="Password" name="confirm_password" onChange={handleChange} value={data.confirm_password} required aria-invalid="false" placeholder="Confirm Password" fdprocessedid="ugqpqh" />
            </div>
          </div>
          <div className="continue-next">
            <button aria-label="Sign in" type="submit" className=" " fdprocessedid="r4dvcy">Reset</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default IsLoadingHOC(Resetpassword)