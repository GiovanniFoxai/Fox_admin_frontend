import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";
import { setFormatDate } from "../../Helper/helper";
const ViewAdmins = (props) => {
  const { setLoading, isLoading } = props;
  const [AdminList, setAdminList] = useState([]);

  useEffect(() => {
    FetchAdmin();
  }, []);

  const FetchAdmin = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-all-users?page=${1}&limit=${5}`)
      .then((response) => {
        setLoading(false);

        if (response.data.status === 1) {
          console.log(response.data.data.users);
          setAdminList(response.data.data.users);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="dash-bar">
        <div>
          <h3>View Admins</h3>
        </div>
        <div className="bradcrum-section">
          <ul>
            <li>
              <Link to="/"> Dashboard</Link>{" "}
            </li>
            <li>
              <Link href="/">Users</Link>{" "}
            </li>
          </ul>
        </div>
      </div>

      <div className="view-company-section">
        <div className="view-company-table">
          <table className="view-table">
            <thead className="table-head">
              <tr>
                <th className="table-heading sr-number">ID</th>
                <th className="table-heading">Name</th>
                <th className="table-heading">Email Id</th>
                <th className="table-heading">Company Id</th>
                <th className="table-heading">Created At</th>
                <th className="table-heading">Updated At</th>
                <th className="table-heading" colspan="2"></th>
              </tr>
            </thead>

            <tbody className="table-body">
              {AdminList &&
                AdminList.length > 0 &&
                AdminList.map((item, index) => (
                  <tr key={index}>
                    <td className="table-data">{item._id.slice(0, 9)}</td>
                    <td className="table-data">
                      {item.first_name} {item.last_name}
                    </td>
                    <td className="table-data">{item.email}</td>
                    <td className="table-data">{item.company}</td>
                    <td className="table-data">
                      {setFormatDate(item.createdAt)}
                    </td>
                    <td className="table-data">
                      {setFormatDate(item.updatedAt)}
                    </td>

                    <td>
                      {" "}
                      <button type="button" className="btn btn-info">
                        Edit
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button type="button" className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default IsLoadingHOC(ViewAdmins);
