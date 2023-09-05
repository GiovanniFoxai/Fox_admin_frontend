import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import { setAccessToken, setuser } from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";
import IsLoadingHOC from "./IsLoadingHOC";
import { minUserPasswordLength } from "../Helper/constants";

const Login = (props) => {
  const { setLoading, isLoading } = props;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

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
    setLoading(true);
    await withoutAuthAxios()
      .post("/auth/login", payload)
      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            const resData = response.data.data;
            toast.success("Logged in successfully");
            dispatch(setAccessToken(resData.token));
            dispatch(setuser(resData.user));
            navigate("/");
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <section className="login-main">
        <div className="login-page">
          <h1>Welcome Back</h1>
          <form
            onSubmit={handleSubmit}
            className=""
            aria-label="Login form"
            method="POST"
          >
            <div className="area-entry">
              <div className="email-area">
                <input
                  type="mail"
                  required
                  id="email"
                  autoComplete="email"
                  aria-label="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  aria-invalid="false"
                  className=""
                  placeholder="Email address"
                  fdprocessedid="g89qhl"
                />
                {/* <label for="email" className=" ">Email address</label></div> */}
              </div>
              <div className="email-area">
                <div className="relative">
                  <input
                    minLength={minUserPasswordLength}
                    type="password"
                    required
                    onChange={handleChange}
                    value={data.password}
                    id="password"
                    autoComplete="current-password"
                    aria-label="Password"
                    name="password"
                    aria-invalid="false"
                    className=" "
                    placeholder="Password"
                    fdprocessedid="ugqpqh"
                  />
                  {/* <label for="password" className=" ">Password</label> */}
                </div>
              </div>
              <Link to="/auth/forget_password" className="forget-s">
                {" "}
                Forgot Password?
              </Link>
              <div className="continue-next">
                <button
                  aria-label="Sign in"
                  type="submit"
                  className=" "
                  fdprocessedid="r4dvcy"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        {/*  <p className="sign-up">
            {" "}
            Don't have an account?<Link to="/auth/signup">Signup</Link>
          </p>
          */}
        </div>
      </section>
    </>
  );
};

export default IsLoadingHOC(Login);
