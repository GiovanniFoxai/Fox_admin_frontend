import React, { useState, useEffect } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "./IsLoadingHOC";
import { Link } from "react-router-dom";
function App(props) {
  const { setLoading, isLoading } = props;

  const [data, setdata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    company_name: "",
    company_address: "",
    mobile: "",
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
    await withoutAuthAxios()
      .post("/user/amin-registration", payload)

      .then((response) => {
        if (response.data.status === 1) {
          setLoading(false)
          toast.success(response.data.message)
          setdata((prev)=>({
            ...prev,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            address: "",
            company_name: "",
            company_address: "",
            mobile: "",
          }))
        }else{
          setLoading(false)
          toast.error(response.data.message);
        }
       
      })
      .catch((error) => {
        console.log(error.response.data.message)
        setLoading(false)
        toast.error(error.response.data.message)
      });
  };

  return (
    <div className="create-company-section">
      <div className="create-company-form">
        <form onSubmit={handleSubmit} className="form-create">
          <label className="form-lable" for="fname">
            First Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.first_name}
            name="first_name"
            onChange={handleChange}
          />

          <label className="form-lable" for="fname">
            Last Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.last_name}
            name="last_name"
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

          <label className="form-lable" for="password">
            Address
          </label>
          <input
            type="text"
            required
            onChange={handleChange}
            value={data.address}
            aria-label="Password"
            name="address"
            aria-invalid="false"
            className="form-input"
            fdprocessedid="ugqpqh"
          />

          <label className="form-lable" for="fname">
            Phone
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.mobile}
            name="mobile"
            onChange={handleChangePhone}
          />

          <label className="form-lable" for="fname">
            Comapny Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.company_name}
            name="company_name"
            onChange={handleChange}
          />

          <label className="form-lable" for="fname">
            Comapny Address
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.company_address}
            name="company_address"
            onChange={handleChange}
          />

          <button className="form-submit" type="submit" value="Submit">
            Submit
          </button>

          <span>
            Have an account? <Link to="/auth/login"> Login</Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
}

export default IsLoadingHOC(App);
