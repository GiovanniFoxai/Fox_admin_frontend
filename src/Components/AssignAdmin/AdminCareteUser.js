import React, { useState, useEffect } from "react";
import { minUserPasswordLength } from "../../Helper/constants";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const AdminCareteUser = (props) => {
  const { setLoading, isLoading } = props;
  const Companyid = useSelector((state) => state.auth?.company);
  console.log(Companyid)


  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
      company: "",
     
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
    onSubmit: async (values) => {
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        company: Companyid,
       // user_type:values.user_type
        
       
      };

      const payload = data;
      
      console.log(payload);

    

      setLoading(true);
      await authAxios()
        .post("/user/create", payload)

        .then(
          (response) => {
            if (response.data.status === 1) {
              setLoading(false);
              toast.success(response.data.message);
              formik.resetForm()
            } else {
              setLoading(false);
              toast.error(response.data.message);
            }
          },
          (error) => {
            setLoading(false);
            toast.error(error.response.data.message);
          }
        )
        .catch((error) => {
          setLoading(false);
          console.log("errorrrr", error);
        });
      /*
        .then(
          (response) => {
            setLoading(false);
            if (response.data.status === 1) {
              toast.success("User Created Successfully");
              console.log("sds", response.data);
            } else {
              toast.error(response.data.message);
            }
          },
          (error) => {
            setLoading(false);

            if (error.response.data.message === "ValidationError") {
              toast.error("Company is Deleted You cannot Assign to the user ");
            } else {
              toast.error(error.response.data.message);
            }
          }
        )
        .catch((error) => {
          console.log("errorrrr", error);
        });
        */
    },
  });

  return (
    <>
      <div className="create-company-section">
        <div className="create-company-form">
          <form onSubmit={formik.handleSubmit} className="form-create">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default IsLoadingHOC(AdminCareteUser);
