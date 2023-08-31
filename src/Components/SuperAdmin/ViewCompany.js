import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyList } from "../../Redux/Actions/companyAction";
import { companiesList } from "../../Redux/Reducers/companySlice";
import { toast } from "react-toastify";
import IsLoadingHOC from "../IsLoadingHOC";
import { format, toDate } from 'date-fns'


const ViewCompany = (props) => {
    const { setLoading } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        const getCompanyData = async () => {
            setLoading(true);
            try {
                await dispatch(fetchCompanyList());
            } catch (error) {
                toast.error(error.message);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        getCompanyData();
        return () => {
            setLoading(false);
        };
    }, []);

    const companies = useSelector(companiesList);

    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>View Company</h3>
                </div>
            </div>
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
                            {companies.map((item, index) => (
                                <tr key={"compnay_" + index}>
                                    <td className="table-data">{item._id}</td>
                                    <td className="table-data">{item.name}</td>
                                    <td className="table-data">
                                        {item.userCount}
                                    </td>
                                    <td className="table-data">{item.adminCount}</td>
                                    <td className="table-data">{format(new Date(item.createdAt), 'MM/dd/yyyy hh:mm:ss aaa')}</td>
                                    <td className="close-btn-sec">
                                        <button className="close-btn">
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

export default IsLoadingHOC(ViewCompany);
