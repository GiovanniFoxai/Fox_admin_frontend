import React, { useState, useEffect } from 'react';
import AdminLogo from '../../assets/image/logo.png';
import DropDwonIcon from '../../assets/image/down-arrow.png';
import AdminSidebar from './AdminSidebar';

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