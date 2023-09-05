import React, { useState, useEffect } from "react";
import { minUserPasswordLength } from "../../Helper/constants";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";
import { useSelector } from "react-redux";
//import IsLoadingHOC from "";

const AdminCareteUser = (props) => {
  const { setLoading, isLoading } = props;
  const Companyid = useSelector((state) => state.auth.user.company._id);
  const [data, setdata] = useState({
    user_type: "USER",
    username: "",
    email: "",
    password: "",
    mobile: "",
    company: `${Companyid}`,
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = data;

    setLoading(true);
    await authAxios()
      .post("/user/create", payload)

      .then(
        (response) => {
          setLoading(false);
          if (response.data.status === 1) {
            toast.success("User Created SucessFully");

            setdata({
              user_type: "USER",
              username: "",
              email: "",
              password: "",
              mobile: "",
            });
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          console.log(error);
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        console.log("errorrrr", error);
      });
  };

  return (
    <>
      <div className="create-company-section">
        <div className="create-company-form">
          <form onSubmit={handleSubmit} className="form-create">
            <label className="form-lable" for="fname">
              User name
            </label>
            <input
              className="form-input"
              type="text"
              id="fname"
              required
              value={data.username}
              name="username"
              onChange={handleChange}
            />

            <label className="form-lable" for="start">
              Email
            </label>

            <input
              type="email"
              required
              id="email"
              autoComplete="email"
              aria-label="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              aria-invalid="false"
              className="form-input"
              fdprocessedid="g89qhl"
            />

            <label className="form-lable" for="password">
              Password
            </label>
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
              className="form-input"
              fdprocessedid="ugqpqh"
            />
            <label className="form-lable" for="phone">
              Phone Number
            </label>
            <input
              className="form-input"
              type="tel"
              id="tel"
              required
              value={data.mobile}
              name="mobile"
              maxLength={12}
              onChange={handleChangePhone}
            />

            <button className="form-submit" type="submit" value="Submit">
              Submit
            </button>

            
          </form>
        </div>
      </div>
    </>
  );
};

export default IsLoadingHOC(AdminCareteUser);
