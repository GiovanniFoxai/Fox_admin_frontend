import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../../config/config";
import { toast } from "react-toastify";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { setFormatDate } from "../../Helper/helper";
import Pagination from "../../Common/Pagination";
const ViewAdmins = (props) => {
  const { setLoading, isLoading } = props;
  const [AdminList, setAdminList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [TotalPost, setTotalPost] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);

  useEffect(() => {
    FetchAdmin();
  }, [currentPage, postsPerPage]);

  const FetchAdmin = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/auth/get-all-users?page=${currentPage}&limit=${postsPerPage}&user_type=admin`
      )
      .then((response) => {
        setLoading(false);
        setTotalPages(response.data.data.totalPages);
        setTotalPost(response.data.data.total);

        if (response.data.status === 1) {
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowChange = (e) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (e) => {
    console.log(e);

    const adminid = e;
    setLoading(true);
    await authAxios()
      .delete(`/user/${adminid}`)
      .then((response) => {
        if (response.data.status === 1) {
          setLoading(false);
          toast.success(response.data.message);
          FetchAdmin();
          setCurrentPage(1);
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

  const handleEdit = () => {};

  return (
    <Fragment>
      <div className="dash-bar">
        <div>
          <h3>View Admins</h3>
        </div>
        <div className="bradcrum-section">
          {/*  <ul>
            <li>
              <Link to="/"> Dashboard</Link>{" "}
            </li>
            <li>
              <Link href="/">Users</Link>{" "}
            </li>
          </ul>
          */}
        </div>
      </div>

      {AdminList.length > 0 && (
        <>
          {/*  
    <select onChange={handleRowChange}>
        <option value="5">5</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      */}

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
                          {item?.first_name} {item?.last_name}
                        </td>
                        <td className="table-data">{item?.email}</td>
                        <td className="table-data">
                          {item?.company?.name || "-"}
                        </td>
                        <td className="table-data">
                          {setFormatDate(item.createdAt)}
                        </td>
                        <td className="table-data">
                          {setFormatDate(item.updatedAt)}
                        </td>
                        {/*
                    <td>
                      {" "}
                      <button type="button" className="btn btn-info">
                        Edit
                      </button>

                    </td>
              */}
                        <td className="close-btn-sec">
                          {" "}
                          <button
                            onClick={() => handleDelete(item._id)}
                            type="button"
                            className="close-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <button
                      class="page-link"
                      disabled={currentPage === 1 ? true : false}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  <li class="page-item">
                    <Pagination
                      currentPage={currentPage}
                      postsPerPage={postsPerPage}
                      totalPosts={TotalPost}
                      paginate={paginate}
                    />{" "}
                  </li>

                  <li class="page-item">
                    <button
                      class="page-link"
                      disabled={currentPage === TotalPages ? true : false}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      NEXT
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default IsLoadingHOC(ViewAdmins);
