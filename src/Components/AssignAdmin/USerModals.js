import { Fragment, useState, useEffect } from "react";
import { authAxios } from "../../config/config";
import IsLoadingHOC from "../../Common/IsLoadingHOC";
import { toast } from "react-toastify";
import Pagination from "../../Common/Pagination";
import { setFormatDate } from "../../Helper/helper";

const Modals = (props) => {
  const { setLoading, isLoading } = props;
  const [ModelList, setModelList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [TotalPost, setTotalPost] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMoalList();
  }, [currentPage, postsPerPage]);

  const fetchMoalList = async () => {
    setLoading(true);
    await authAxios()
      .get(`/model/list?page=${currentPage}&limit=${postsPerPage}`)
      .then(
        (response) => {
          if (response.data.status === 1) {
            setLoading(false);
            setTotalPages(response.data.data.totalPages);
            setTotalPost(response.data.data.totalCount);

            setModelList(response.data.data.models);
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

  const handleDelete = async (e) => {
    const modelId = e;
    setLoading(true);
    await authAxios()
      .delete(`/model/${modelId}`)
      .then((response) => {
        setLoading(false)
        setCurrentPage(1);
        toast.success(response.data.message);
        fetchMoalList();
      })
      .catch((error) => {
        setLoading(false)
        toast.error(error.response.data.message)
      });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowChange = (e) => {
    setPostsPerPage(e.target.value);
    setCurrentPage(1);
  };

  console.log(ModelList)

  return (
    <Fragment>
      <div className="dash-bar">
        <div>
          <h3>Models</h3>
        </div>
      </div>

      {ModelList.length > 0 && (
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
                    <th className="table-heading">Name</th>
                    <th className="table-heading">Cateogary</th>
                    <th className="table-heading">Company Id</th>
                    {/*<th className="table-heading">Created At</th>
                    <th className="table-heading">Updated At</th>
    */}

                    <th className="table-heading" colspan="2"></th>
                  </tr>
                </thead>

                <tbody className="table-body">
                  {ModelList &&
                    ModelList.length > 0 &&
                    ModelList.map((item,index) => (
                      <tr key={index} >
                        <td className="table-data">{item._id.slice(0, 9)}</td>
                        <td className="table-data">{item.name}</td>
                        <td className="table-data">{item.category}</td>
                        <td className="table-data">
                          {item?.user?.company?.name || "-"}
                        </td>
                      {/*  <td className="table-data">
                          {setFormatDate(item.createdAt)}
                        </td>
                        <td className="table-data">
                          {setFormatDate(item.updatedAt )}
                        </td>
                  */}
                        <td >{item?.user?.username}</td>
                        <td className="close-btn-sec">
                          <button
                            onClick={() => handleDelete(item._id)}
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

export default IsLoadingHOC(Modals);
