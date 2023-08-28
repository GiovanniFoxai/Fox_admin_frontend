import Logo from '../assets/image/dashbordlogo.png';
import AdminLogo from '../assets/image/logo.png';
import DownarrowIcon from '../assets/image/Vector.png';
import hamburger from '../assets/image/Maskgroup.png';
import Createcompany from '../assets/image/careatecompany.svg';
const AdminCareteUser = () => {



  return (
    <>

      <section className='dashbord-section'>
        <div className="sidebar--section">
          <div className='side-menu'>
            <div className="image-box" >
              <img src={Logo} alt="dashbord-logo" />
            </div>
            <div className='toggle-menu'>
              <button>
                <img src={DownarrowIcon} alt="dashbord-logo" />
              </button>

            </div>
          </div>

          <div className='nav-bar-section' >
            <ul>
              <li><span className='nav-section'> <span><img src={hamburger} alt="  Admin logo" /></span> <a href="#" > Dashboard</a></span> <span className='nav-section-arrow'></span> </li>
              <li><span className='nav-section'> <span><img src={Createcompany} alt="careate company logo" /></span> <a href="#" > Create Company</a></span> <span className='nav-section-arrow'><img src={DownarrowIcon} alt="dashbord-logo" /></span> </li>
            </ul>

          </div>


        </div>

        <div className="content--section">

          <div className='content-top-bar'>
            <div>
              <h2></h2>
            </div>
            <div className='top-bar-admin'>
              <h2>Other Developer <span>( Admin )</span></h2>

              <div className='top-bar-admin-logo'>
                <img src={AdminLogo} alt="  Admin logo" />
              </div>
            </div>
          </div>


          <div className='dash-bar'>
            <div>
              <h3>Carete User</h3>
            </div>
            <div className='bradcrum-section'>
              <ul>
                <li><a href="#" > Dashboard</a>  </li>
                <li><a href="#" >Carete User</a>  </li>
              </ul>
            </div>
          </div>


          <div className='create-company-section' >
            <div className='create-company-form' >
              <form className='form-create'>

                <label className="form-lable" for="fname">User name</label>
                <input className="form-input" type="text" id="fname" name="fname" />
                <label className="form-lable" for="lname">First Name</label>
                <input className="form-input" type="text" id="lname" name="lname" />

                <label className="form-lable" for="lname">Last Name</label>
                <input className="form-input" type="text" id="lname" name="lname" />

                <label className="form-lable" for="start">Email</label>
                <input className="form-input" type="email" id="email" />

                <label className="form-lable" for="password">Password</label>
                <input className="form-input" type="Password" id="Password" />

                <label className="form-lable" for="phone">Phone Number</label>
                <input className="form-input" type="tel" id="tel" />


                <input className="form-submit" type="submit" value="Submit" />

              </form>

            </div>
          </div>


        </div>


      </section>


    </>

  )
}

export default AdminCareteUser;