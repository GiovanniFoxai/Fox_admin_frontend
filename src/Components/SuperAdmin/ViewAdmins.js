import DashboardTopBar from './DashboardTopBar';
import AdminSidebar from './AdminSidebar';
const ViewAdmins = () => {



  return (
    <>

      <section className='dashbord-section'>
        <AdminSidebar />

        <div className="content--section">
          <DashboardTopBar />

          <div className='dash-bar'>
            <div>
              <h3>View Admins</h3>
            </div>
            <div className='bradcrum-section'>
              <ul>
                <li><a href="#" > Dashboard</a>  </li>
                <li><a href="#" >Users</a>  </li>
              </ul>

            </div>
          </div>

          <div className='view-company-section'>

            <div className='view-company-table'>

              <table className='view-table'>
                <thead className='table-head' >
                  <tr>
                    <th className='table-heading sr-number'>ID</th>
                    <th className='table-heading'>Name</th>
                    <th className='table-heading'>Cateogary</th>
                    <th className='table-heading'>Company Id</th>
                    <th className='table-heading'>Created At</th>
                    <th className='table-heading'>Updated At</th>
                    <th className='table-heading' colspan="2" >Created By</th>
                  </tr>
                </thead>

                <tbody className='table-body'>
                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='close-btn-sec'><button className='close-btn' >Delete</button></td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='close-btn-sec' colspan="2"><button className='close-btn' >Delete</button></td>
                  </tr>



                </tbody>

              </table>
            </div>

          </div>





        </div>


      </section>


    </>

  )
}

export default ViewAdmins;