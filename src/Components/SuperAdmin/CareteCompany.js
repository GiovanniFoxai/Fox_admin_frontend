import AdminSidebar from './AdminSidebar';
import DashboardTopBar from './DashboardTopBar';
const CareteCompany = () => {



  return (
    <>

      <section className='dashbord-section'>

        <AdminSidebar />

        <div className="content--section">

        <DashboardTopBar />

          <div className='dash-bar'>
            <div>
              <h3>Add Company</h3>
            </div>
          </div>



          <div className='create-company-section' >
            <div className='create-company-form' >
              <form className='form-create'>

                <label className="form-lable" for="fname">Company Name</label>
                <input className="form-input" type="text" id="fname" name="fname" />
                <label className="form-lable" for="lname">Company Address</label>
                <input className="form-input" type="text" id="lname" name="lname" />
                <label className="form-lable" for="start">Date</label>
                <input className="form-input" type="date" id="date" />
                <label className="form-lable" for="start">Description</label>
                <textarea className="form-textarea" name="comment" form="usrform"></textarea>
                <input className="form-submit" type="submit" value="Submit" />

              </form>

            </div>
          </div>


        </div>


      </section>


    </>

  )
}

export default CareteCompany;