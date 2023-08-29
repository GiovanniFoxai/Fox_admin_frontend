import { Fragment } from "react";
const Modals = () => {
    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>Models</h3>
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
                                <th className="table-heading">Models Name</th>
                                <th className="table-heading">
                                    Models category
                                </th>
                                <th className="table-heading">
                                    Models description
                                </th>
                                <th></th>
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
                                <td className="close-btn-sec" colspan="2">
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
                                <td className="close-btn-sec">
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

export default Modals;
