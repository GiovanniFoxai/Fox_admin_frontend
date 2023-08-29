import { Fragment } from "react";
import { Link } from "react-router-dom";
const ViewAdmins = () => {
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
                                <th className="table-heading">Cateogary</th>
                                <th className="table-heading">Company Id</th>
                                <th className="table-heading">Created At</th>
                                <th className="table-heading">Updated At</th>
                                <th className="table-heading" colspan="2">
                                    Created By
                                </th>
                            </tr>
                        </thead>

                        <tbody className="table-body">
                            <tr>
                                <td className="table-data">001</td>
                                <td className="table-data">Maria Anders</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="close-btn-sec">
                                    <button className="close-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td className="table-data">001</td>
                                <td className="table-data">Maria Anders</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="table-data">Germany</td>
                                <td className="close-btn-sec" colspan="2">
                                    <button className="close-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewAdmins;
