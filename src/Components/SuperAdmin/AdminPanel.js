import Logo from '../../assets/image/dashbordlogo.png';
import AdminLogo from '../../assets/image/logo.png';
import DownarrowIcon from '../../assets/image/Vector.png';
import hamburger from '../../assets/image/Maskgroup.png';
import Createcompany from '../../assets/image/careatecompany.svg';
import AdminSidebar from './AdminSidebar';
import DashboardTopBar from './DashboardTopBar';
const AdminPanel = () => {



  return (
    <>

      <section className='dashbord-section'>


        <AdminSidebar />



        <div className="content--section">
          
          <DashboardTopBar />

          <div className='dash-bar'>
            <div>
              <h3>Admin Panel</h3>
            </div>
          </div>





        </div>


      </section>


    </>

  )
}

export default AdminPanel;