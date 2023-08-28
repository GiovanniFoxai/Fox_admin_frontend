import Logo from '../../assets/image/dashbordlogo.png';
import AdminLogo from '../../assets/image/logo.png';
import DownarrowIcon from '../../assets/image/Vector.png';
import hamburger from '../../assets/image/Maskgroup.png';
import Createcompany from '../../assets/image/careatecompany.svg';
import AdminSidebar from './AdminSidebar';
import DashboardTopBar from './DashboardTopBar';
const Modals = () => {



  return (
    <>

      <section className='dashbord-section'>
        <AdminSidebar />

        <div className="content--section">
          <DashboardTopBar />

          <div className='dash-bar'>
            <div>
              <h3>Models</h3>
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
                    <th></th>
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
                    <td className='close-btn-sec'><button className='close-btn' >Delete</button></td>

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

export default Modals;