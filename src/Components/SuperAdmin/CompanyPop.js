import React, { useState, useRef, useEffect } from "react";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";

const CompanyPop = ({ props, onClose, show }) => {
  const { name, address, _id } = props;
  const [data, setdata] = useState({
    companyId: "",
    name: name || "",
    address: address || "",
  });

  useEffect(() => {
    setdata((prev) => ({
      ...prev,
      companyId: _id || "",
      name: name || "",
      address: address || "",
    }));
  }, [name, address]);

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
      .post("/company/update", payload)
      .then(
        (response) => {
          if (response.data.status === 1) {
            toast.success(response.data.message);
            onClose();
          } else {
            toast.error(response.data.message);
          }
        },
        (error) => {
          toast.error(error.response.data.message);
        }
      )
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="create-company-section">
            <div className="create-company-form">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>

              <form onSubmit={handleSubmit} className="form-create">
                <label className="form-lable" for="fname">
                  Company Name
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
                  Company Address
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="fname"
                  value={data.address}
                  name="address"
                  onChange={handleChange}
                />

                <button className="form-submit" type="submit" value="Submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPop;
