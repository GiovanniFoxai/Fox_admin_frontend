import React, {  } from 'react';
import AdminLogo from '../../assets/image/logo.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/Reducers/authSlice';

const DashboardTopBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "auth/logout" });
    dispatch(logout())
    navigate('/auth/login')
  };
  
  return (
    <>
      <div className='content-top-bar'>
        <div className='top-bar-admin' onClick={logoutHandler}>
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