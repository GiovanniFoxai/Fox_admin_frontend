import React, {  } from 'react';
import AdminLogo from '../../assets/image/logo.png';

const DashboardTopBar = () => {
  
  return (
    <>

      <div className='content-top-bar'>

        <div className='top-bar-admin'>
          <h2>Other Developer <span>( Admin )</span></h2>

          <div className='top-bar-admin-logo'>
            <img src={AdminLogo} alt="  Admin logo" />
          </div>
        </div>
      </div>


    </>
  )
}

export default DashboardTopBar