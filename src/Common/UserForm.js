import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withoutAuthAxios } from "../config/config";
import IsLoadingHOC from "./IsLoadingHOC";
import { UsaStateList, countryList } from "../Helper/helper";
import {
  setAccessToken,
  setcompany,
  setuser,
} from "../Redux/Reducers/authSlice";
import { toast } from "react-toastify";

const UserForm = (props) => {
  const { setLoading, isLoading } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hide, sethide] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile: "",
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
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        mobile: values.mobile,
        
      };

      const payload = data;
      console.log(payload)

      setLoading(true);
      await withoutAuthAxios()
        .post("/user/create", payload)

        .then((response) => {
          if (response.data.status === 1) {
            setLoading(false);
           
            const resData = response.data.data;
            console.log(resData)
           /* dispatch(setAccessToken(resData.token));
            dispatch(setuser(resData.user_type));
            dispatch(setcompany(resData.company));

            navigate("/");*/
            // toast.success(response.data.message);
            //formik.resetForm();
          } else {
            setLoading(false);
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    },
  });
  return (
    <> 
    
    {hide?null: <form onSubmit={formik.handleSubmit} className="form-create">
      <div className="company--create--sec">
        <div className="admin--detals--sec w--50">
          <div className="admin--sec">
            <div>
              <label className="form-lable" for="fname">
                First Name <span className="req-icon">*</span>
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
                <p style={{ color: "black" }}>{formik.errors.first_name}</p>
              )}
            </div>
            <div>
              <label className="form-lable" for="fname">
                Last Name <span className="req-icon">*</span>
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
                <p style={{ color: "black" }}>{formik.errors.last_name}</p>
              )}
            </div>
            <div>
              <label className="form-lable" for="start">
                Email <span className="req-icon">*</span>
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
                <p style={{ color: "black" }}>{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label className="form-lable" for="password">
                Password <span className="req-icon">*</span>
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
                <p style={{ color: "black" }}>{formik.errors.password}</p>
              )}
            </div>
            <div>
              <label className="form-lable" for="password">
                Confirm Password <span className="req-icon">*</span>
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
                  <p style={{ color: "black" }}>
                    {formik.errors.confirm_password}
                  </p>
                )}
            </div>
            <div>
              <label className="form-lable" for="fname">
                Phone <span className="req-icon">*</span>
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
                <p style={{ color: "black" }}>{formik.errors.mobile}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button className="form-submit" type="submit" value="Submit">
        Submit
      </button>
      <span>
            Have an account? <Link to="/auth/login"> Login</Link>{" "}
          </span>
    </form>}
   

    </>
  );
};

export default IsLoadingHOC(UserForm);
