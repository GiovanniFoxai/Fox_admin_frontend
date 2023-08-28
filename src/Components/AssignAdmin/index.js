import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import DashboardTopBar from './DashboardTopBar';

const SupAdmin = () => {


  return (
    <>

      <section className='dashbord-section'>
        
        <AdminSidebar />

        <div className="content--section">
          <DashboardTopBar/>

          <div className='dash-bar'>
            <div>
              <h3>Dashboard</h3>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default SupAdmin;