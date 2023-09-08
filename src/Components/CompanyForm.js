import React, { useState, useEffect } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "./IsLoadingHOC";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AdminLogo from "../assets/image/logo.png";

import * as Yup from "yup";
import { countryList } from "../Helper/helper";
function App(props) {
  const { setLoading, isLoading } = props;
  /*
  const [data, setdata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    company_name: "",
    company_address: "",
    mobile: "",
  });*/

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
      company_name: "",
      company_address: "",
      company_city: "",
      company_zip: "",
      company_state: "",
      country: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(3, "Mininum 3 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      last_name: Yup.string()
        .min(3, "Mininum 3 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid email format").required("Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
      mobile: Yup.number()
        .min(10, "Mininum 10 characters")
        // .max(10, "Mininum 10 characters")

        .required("Required!"),
    }),
    onSubmit: async (values, e) => {
      // console.log("sdsds", values);

      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        company_name: values.company_name,
        company_address: values.company_address,
        company_city: values.company_city,
        company_zip: values.company_zip,
        company_state: values.company_state,
        country: values.country,
      };

      const payload = data;
      console.log(payload);

      setLoading(true);
      await withoutAuthAxios()
        .post("/user/amin-registration", payload)

        .then((response) => {
          if (response.data.status === 1) {
            setLoading(false);
            toast.success(response.data.message);
            formik.resetForm();
          } else {
            setLoading(false);
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setLoading(false);
          toast.error(error.response.data.message);
        });
    },
  });

  /*
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
          setLoading(false);
          toast.success(response.data.message);
          setdata((prev) => ({
            ...prev,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            address: "",
            company_name: "",
            company_address: "",
            mobile: "",
          }));
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };*/

  return (
    <div className="create-company-section">
      <div className="create-company-form">
        <img src={AdminLogo} style={{ width: 50,marginLeft:"120px",marginBottom:"20px" }} alt="  Admin logo" />
  
        <h2>Create Your AI Fox Account</h2>

        <form onSubmit={formik.handleSubmit} className="form-create">
          <h2 style={{textAlign:"center"}}>Company Form</h2>
          <br />
          <br />

          <label className="form-lable" for="fname">
            Company Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.company_name}
            name="company_name"
            onChange={formik.handleChange}
          />

          <label className="form-lable" for="fname">
          Company Address
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.company_address}
            name="company_address"
            onChange={formik.handleChange}
          />

          <label className="form-lable" for="fname">
            Select Country
          </label>

          <select
            onChange={formik.handleChange}
            name="country"
            value={formik.values.country}
            className="form-input"
          >
            <option value="">Select</option>

            {countryList &&
              countryList.length > 0 &&
              countryList.map((item) => <option>{item}</option>)}
          </select>

          <label className="form-lable" for="fname">
            State
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.company_state}
            name="company_state"
            onChange={formik.handleChange}
          />

          <label className="form-lable" for="fname">
            City
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.company_city}
            name="company_city"
            onChange={formik.handleChange}
          />

          <label className="form-lable" for="fname">
            Zip Code
          </label>
          <input
            className="form-input"
            type="number"
            id="fname"
            value={formik.values.company_zip}
            name="company_zip"
            onChange={formik.handleChange}
          />

          <h2 style={{textAlign:"center"}} >Admin Details </h2>

          <br />
          <br />

          <label className="form-lable" for="fname">
            First Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            name="first_name"
          />
          {formik.errors.first_name && formik.touched.first_name && (
            <p className="error">{formik.errors.first_name}</p>
          )}

          <label className="form-lable" for="fname">
            Last Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={formik.values.last_name}
            name="last_name"
            onChange={formik.handleChange}
          />

          {formik.errors.last_name && formik.touched.last_name && (
            <p className="error">{formik.errors.last_name}</p>
          )}

          <label className="form-lable" for="start">
            Email
          </label>

          <input
            type="email"
            id="email"
            autoComplete="email"
            aria-label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            aria-invalid="false"
            className="form-input"
            fdprocessedid="g89qhl"
          />

          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}

          <label className="form-lable" for="password">
            Password
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            autoComplete="current-password"
            aria-label="Password"
            name="password"
            aria-invalid="false"
            className="form-input"
            fdprocessedid="ugqpqh"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}

          <label className="form-lable" for="password">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirm_password}
            id="password"
            autoComplete="current-password"
            aria-label="Password"
            name="confirm_password"
            aria-invalid="false"
            className="form-input"
            fdprocessedid="ugqpqh"
          />
          {formik.errors.confirm_password &&
            formik.touched.confirm_password && (
              <p className="error">{formik.errors.confirm_password}</p>
            )}

          <label className="form-lable" for="fname">
            Phone
          </label>
          <input
            className="form-input"
            maxLength={10}
            id="fname"
            value={formik.values.mobile}
            name="mobile"
            onChange={formik.handleChange}
          />
          {formik.errors.mobile && formik.touched.mobile && (
            <p className="error">{formik.errors.mobile}</p>
          )}

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
