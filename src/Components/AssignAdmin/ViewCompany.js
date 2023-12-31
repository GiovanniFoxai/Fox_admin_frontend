import AdminSidebar from './AdminSidebar';
import DashboardTopBar from './DashboardTopBar';
const ViewCompany = () => {



  return (
    <>

      <section className='dashbord-section'>
      <AdminSidebar />

        <div className="content--section">
        <DashboardTopBar />

          <div className='dash-bar'>
            <div>
              <h3>View Company</h3>
            </div>
          </div>

          <div className='view-company-section'>

            <div className='view-company-table'>

              <table className='view-table'>
                <thead className='table-head' >
                  <tr>
                    <th className='table-heading sr-number'>SR NO</th>
                    <th className='table-heading'>Company Name</th>
                    <th className='table-heading'>Number Of User</th>
                    <th className='table-heading'>Number Of Admin</th>
                    <th className='table-heading'>Creare At Date </th>
                  </tr>
                </thead>

                <tbody className='table-body'>
                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                  </tr>

                  <tr>
                    <td className='table-data'>001</td>
                    <td className='table-data'>Maria Anders</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
                    <td className='table-data'>Germany</td>
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

export default ViewCompany;