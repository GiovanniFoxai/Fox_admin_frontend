import React, { useState, useRef, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";
import { Modelcategory } from "../../Helper/helper";

const AddModal = (props) => {
  const { setLoading, isLoading } = props;
  const fileInputRef = useRef(null);

  const [data, setdata] = useState({
    name: "",
    description: "",
    model_file: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, value } = e.target;

    const filename = e.target.files[0];

    setdata((prev) => ({
      ...prev,
      model_file: filename,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = data;

    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("model_file", payload.model_file);
    formData.append("category", payload.category);

    setLoading(true);
    await authAxios()
      .post("/model/create", formData)

      .then(
        (response) => {
          if (response.data.status === 1) {
            setLoading(false);
            toast.success(response.data.message);
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
            setdata((prev) => ({
              ...prev,
              name: "",
              model_file: null,
              category: "",
              description: "",
            }));
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          setLoading(false);
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        }
      )
      .catch((error) => {
        setLoading(false);
        console.log("errorr", error);
      });
  };

  return (
    <div className="create-company-section">
      <div className="create-company-form">
        <form onSubmit={handleSubmit} className="form-create">
          <label className="form-lable" for="fname">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            required
            value={data.name}
            name="name"
            onChange={handleChange}
          />

          <label className="form-lable" for="fname">
            Category
          </label>
          <select
            className="form-input"
            name="category"
            onChange={handleChange}
            value={data.category}
          >
            <option value="">Select</option>

            {Modelcategory &&
              Modelcategory.length > 0 &&
              Modelcategory.map((item) => <option>{item}</option>)}
          </select>

          <label className="form-lable" for="fname">
            Modal
          </label>

          <input
            type="file"
            accept=".csv,.doc,.pdf,.xls,.docx,.xlsx"
            ref={fileInputRef}
            className="form-input"
            name="model_file"
            onChange={handleFileChange}
          />

          <label className="form-lable" for="fname">
            Description
          </label>
          <input
            className="form-input"
            type="text"
            id="fname"
            value={data.description}
            name="description"
            onChange={handleChange}
          />

          <button className="form-submit" type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default IsLoadingHOC(AddModal);
