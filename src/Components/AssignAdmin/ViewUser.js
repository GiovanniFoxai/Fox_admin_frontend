import React, { useState, useEffect } from "react";

import { authAxios } from "../../config/config";
import IsLoadingHOC from "../IsLoadingHOC";
import { toast } from "react-toastify";
import { setFormatDate } from "../../Helper/helper";
import Pagination from "../../Common/Pagination";
const ViewAdmins = (props) => {
  const { setLoading, isLoading } = props;

  const [UserList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [TotalPost, setTotalPost] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, postsPerPage]);

  const fetchUsers = async () => {
    setLoading(true);
    await authAxios()
      .get(`/auth/get-all-users?page=${currentPage}&limit=${postsPerPage}`)
      .then((response) => {
        setLoading(false);
        setTotalPost(response.data.data.total);
        if (response.data.status === 1) {
          setTotalPages(response.data.data.totalPages);
          setUserList(response.data.data.users);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(true);
        console.log(error);
      });
  };

  console.log("Check Deployment",)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowChange=(e)=>{ 
    setPostsPerPage(e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <div className="dash-bar">
        <div>
          <h3>View User</h3>
        </div>
        <div className="bradcrum-section">
          <ul>
            <li>
              <a href="#"> Dashboard</a>{" "}
            </li>
            <li>
              <a href="#">Users</a>{" "}
            </li>
          </ul>
        </div>
      </div> 

      <select onChange={handleRowChange} >
        <option value="5" >5</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        
      </select>

      <div className="view-company-section">
        <div className="view-company-table">
          <table className="view-table">
            <thead className="table-head">
              <tr>
                <th className="table-heading sr-number">ID</th>
                <th className="table-heading">User Name</th>
                <th className="table-heading">Email</th>
                <th className="table-heading">Company ID</th>
                <th className="table-heading">Created At</th>
                <th className="table-heading">Edit</th>
                <th className="table-heading">Created At</th>
                <th className="table-heading" colspan="2">
                  Updated At
                </th>

              </tr>
            </thead>

            <tbody className="table-body">
              {UserList &&
                UserList.length > 0 &&
                UserList.map((item, index) => (
                  <tr key={index}>
                    <td className="table-data">{item._id.slice(0, 9)}</td>
                    <td className="table-data">{item.username}</td>
                    <td className="table-data">{item.email}</td>
                    <td className="table-data">{item.company}</td>
                    <td className="table-data">
                      {setFormatDate(item.createdAt)}
                    </td>
                    <td className="table-data">
                      {setFormatDate(item.updatedAt)}
                    </td>
                  </tr>
                ))}
            </tbody>
            <br />

            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <button
                    class="page-link"
                    disabled={currentPage === 1 ? true : false}
                    onClick={()=> setCurrentPage(currentPage - 1)}
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
                    onClick={()=> setCurrentPage(currentPage + 1)}
                  >
                    NEXT
                  </button>
                </li>
              </ul>
            </nav>
          </table>
        </div>
      </div>
    </>
  );
};

export default IsLoadingHOC(ViewAdmins);
