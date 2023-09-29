import React, { useState, useEffect } from "react";
import { withoutAuthAxios } from "../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "./IsLoadingHOC";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AdminLogo from "../assets/image/logo.png";

import * as Yup from "yup";
import { UsaStateList, countryList } from "../Helper/helper";
import {
  setAccessToken,
  setcompany,
  setuser,
} from "../Redux/Reducers/authSlice";
import { useDispatch } from "react-redux";
import AdminForm from "./AdminForm";
import UserForm from "./UserForm";
function App(props) {
  const { setLoading, isLoading } = props;
  const [hideCompanyForm, sethideCompanyForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  console.log(activeTab, 'check index')

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
      country: "USA",
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
        company_name: values.company_name,
        company_address: values.company_address,
        company_city: values.company_city,
        company_zip: values.company_zip,
        company_state: values.company_state,
        country: values.country,
      };

      const payload = data;

      setLoading(true);
      await withoutAuthAxios()
        .post("/user/amin-registration", payload)

        .then((response) => {
          if (response.data.status === 1) {
            setLoading(false);
            const resData = response.data.data;
            dispatch(setAccessToken(resData.token));
            dispatch(setuser(resData.user_type));
            dispatch(setcompany(resData.company));

            navigate("/");
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

  const personalForm = () => {
    sethideCompanyForm(false);
    formik.resetForm();
  };

  const companyForm = () => {
    sethideCompanyForm(true);
    formik.resetForm();
  };

  return (
    <div className="create-company-section">
      <div className="create-company-form--sec">
        <div className="create--foem--logo">
          <img
            src={AdminLogo}
            className="carete--form--logo"
            alt="  Admin logo"
          />

          <h2>Create Your AI Fox Account</h2>
          {/*
          <div className="radio--btn">
            <input
              type="radio"
              name="hideCompanyForm"
              value="Company"
              id="company"
              checked = {activeTab === 1}
              // checked={hideCompanyForm == true}
              className={activeTab === 1 ? 'active' : ''}
              onClick={() => handleTabClick(1)}
             // onClick={companyForm}
              //onClick={() => {sethideCompanyForm(true)}}
            />{" "}
            Company
            
            <input
              type="radio"
              name="hideCompanyForm"
              value="Personal"
              id="personal"
              checked = {activeTab === 2}
              // checked={hideCompanyForm == false}
              className={activeTab === 2 ? 'active' : ''}
              onClick={() => handleTabClick(2)}
             // onClick={personalForm}
              // onClick={() => sethideCompanyForm(false)}
            />{" "}
            Personal
          </div>
          */}


        </div>

        {activeTab === 1 && <AdminForm /> }
      {/*   {activeTab === 2 && <UserForm /> }*/}

      </div>
    </div>
  );
}

export default IsLoadingHOC(App);
