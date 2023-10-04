import React, { useState, useEffect } from "react";

import { authAxios, withoutAuthAxios } from "../../config/config";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { toast } from "react-toastify";
import { setFormatDate } from "../../Helper/helper";
import Pagination from "../../Common/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setcompany,
  setemail,
  setuser,
} from "../../Redux/Reducers/authSlice";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUsers = async () => {
    setLoading(true);
    await authAxios()
      .get(
        `/auth/get-all-users?page=${currentPage}&limit=${postsPerPage}&user_type=USER`
      )
      .then(
        (response) => {
          if (response.data.status === 1) {
            setLoading(false);
            setTotalPost(response.data.data.total);
            setTotalPages(response.data.data.totalPages);
            setUserList(response.data.data.users);
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
        toast.error(error.response.data.message);
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowChange = (e) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (e) => {
    const Userid = e;
    setLoading(true);
    await authAxios()
      .delete(`/user/${Userid}`)
      .then((response) => {
        if (response.data.status == 1) {
          setLoading(false);
          setCurrentPage(1);
          fetchUsers();
          toast.success(response.data.message);
        } else {
          setLoading(false);
          toast.error(response.data.error.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  const handleDashboard = async (e) => {
    const { _id } = e;
    const { email } = e;
    const company = e?.company?.name;
    console.log(e);
    console.log(_id);
    const data = {
      user_id: _id,
    };

    await authAxios()
      .post("/auth/user-token", data)
      .then((response) => {
        console.log(response.data);

        dispatch(setAccessToken(response.data.message));
        dispatch(setuser("USER"));
        dispatch(setemail(email));
        dispatch(setcompany(company));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="dash-bar">
        <div>
          <h3>View User</h3>
        </div>
       
      </div>

     
        <>
          {/*
          
      <select onChange={handleRowChange} >
        <option value="5" >5</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        
      </select>
      */}

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
                    <th className="table-heading">Updated At</th>

                    <th className="table-heading" colspan="2"></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {UserList &&
                    UserList.length > 0 &&
                    UserList.map((item, index) => (
                      <tr key={index}>
                        <td className="table-data">{item?._id.slice(0, 9)}</td>
                        <td className="table-data">
                          {item?.first_name} {item?.last_name}
                        </td>
                        <td className="table-data">{item?.email}</td>
                        <td className="table-data">
                          {item?.company?.name || "-"}
                        </td>
                        <td className="table-data">
                          {setFormatDate(item?.createdAt)}
                        </td>
                        <td className="table-data">
                          {setFormatDate(item?.updatedAt)}
                        </td>
                        <td className="close-btn-sec">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="close-btn"
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => handleDashboard(item)}
                            className="Edit--btn"
                          >
                            Chatbot
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
              {UserList.length > 0 && (
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
              )}
            </div>
          </div>


        </>
      
    </>
  );
};

export default IsLoadingHOC(ViewAdmins);
