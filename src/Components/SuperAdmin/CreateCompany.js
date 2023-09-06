import React, { Fragment, useState, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";

const CreateCompany = (props) => {
  const { setLoading, isLoading } = props;



  const [data, setdata] = useState({
    name: "",
    address: "",
  });

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
   

    await authAxios()
      .post(`/company/create`, payload)
      .then((response) => {
        if (response.data.status == 1) {
          setdata((prev)=>({
            ...prev,
            name:"",
            address:"",
          }))
          setLoading(false);
          toast.success(response.data.message);
        } else {
          setLoading(false);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.response.data.message);
      });

    
  };

  
  return (
    <Fragment>
      <div className="dash-bar">
        <div>
          <h3>Add Company</h3>
        </div>
      </div>
      <div className="create-company-section">
        <div className="create-company-form">
          <form className="form-create" onSubmit={handleSubmit}>
            <label className="form-lable" htmlFor="name">
              Company Name
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              onChange={handleChange}
              value={data.name}
              name="name"
              required
            />

            <label className="form-lable" htmlFor="name">
              Company Address
            </label>
            <textarea
               
              type="text"
              required
              className="form-textarea"
              name="address"
              onChange={handleChange}
              value={data.address}
             
            />

            <input className="form-submit" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default IsLoadingHOC(CreateCompany);
