import { Fragment, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyList } from "../../Redux/Actions/companyAction";
import { companiesList } from "../../Redux/Reducers/companySlice";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";
import { authAxios } from "../../config/config";
import Pagination from "../../Common/Pagination";


const ViewCompany = (props) => {
    const { setLoading } = props;


    const [companies, setcompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [TotalPost, setTotalPost] = useState(0);
  const [TotalPages, setTotalPages] = useState(0);
   
    useEffect(()=>{
        FetchCompany()
    },[currentPage, postsPerPage])

    const FetchCompany=async(e)=>{
        setLoading(true)
            await authAxios()
            .get(`/company/list?page=${currentPage}&limit=${postsPerPage}`)
            .then((response)=>{
               
                setLoading(false)
                setTotalPost(response.data.data.pagination.totalCompanies)
                setTotalPages(response.data.data.pagination.totalPages)
                if (response.data.status === 1) {
                   
                    setcompanies(response.data.data.companies)
                }else{
                    toast.error(response.data.message);
                }
               
            }).catch((error)=>{
                setLoading(true)
                console.log(error)
            })
    }

    const handleDelete=async(e)=>{
        const CompanyId=e
        setLoading(true)
         await authAxios()
         .delete(`/company/delete/${CompanyId}`)
         .then((response)=>{
            console.log(response.data)
            setLoading(false);
            if (response.data.status === 1) {
                toast.success("Compnay Deleted SucessFully")
                FetchCompany()
                setCurrentPage(1)
                
            }else{
                toast.error(response.data.message);
            }
         }).catch((error)=>{
            setLoading(true)
            console.log(error)
         }) 

    
        
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleRowChange=(e)=>{ 
        setPostsPerPage(e.target.value)
        setCurrentPage(1)
      }
   

    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>View Company</h3>
                  
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
                                <th className="table-heading sr-number">
                                    SR NO
                                </th>
                                <th className="table-heading">Company Name</th>
                                <th className="table-heading">
                                    Number Of User
                                </th>
                                <th className="table-heading">
                                    Number Of Admin
                                </th>
                                <th className="table-heading" colSpan="2">
                                    Creare At Date{" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {companies&&companies.length>0 && companies.map((item, index) => (
                                <tr key={"compnay_" + index}>
                                    <td className="table-data">{item._id}</td>
                                    <td className="table-data">{item.name}</td>
                                    <td className="table-data">
                                        {item.userCount}
                                    </td>
                                    <td className="table-data">{item.adminCount}</td>
                                       <td className="table-data">{item.name}</td>
                                    <td className="close-btn-sec">
                                        <button  type="button"   onClick={()=>handleDelete(item._id)} className="close-btn">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
     {/*      
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Are Your Sure You want to Delete This Company</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"   >Save changes</button>
      </div>
    </div>
  </div>
</div>
*/}   

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


   
        </Fragment>
    );
};

export default IsLoadingHOC(ViewCompany);
