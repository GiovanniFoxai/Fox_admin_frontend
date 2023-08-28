import React, { useEffect, useState } from 'react';
import DashboardIcon from '../../assets/image/dashboard.png';
import DropDwonIcon from '../../assets/image/down-arrow.png';
import Createcompany from '../../assets/image/create.png';
import Logo from '../../assets/image/dashbordlogo.png';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import Home from './index';
import CareteCompany from './CareteCompany';
import ViewCompany from './ViewCompany'

const AdminSidebar = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const toggleBar = () => {
        setToggleSidebar(!toggleSidebar);
    }

    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const [windowScreenWidth, setWindowScreenWidth] = useState(window.screen.width);

    const actualWidth = () => {
        setWindowScreenWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', actualWidth);

        return () => {
            window.removeEventListener('resize', actualWidth);
        }
    });

    useEffect(() => {
        if (windowScreenWidth < 767) {
            setToggleSidebar(false);
        }else{
            setToggleSidebar(true);
        }
    }, [windowScreenWidth]);



    return (
        <>
            <div className={`sidebar--section ${toggleSidebar ? 'toggle--sidebar' : 'toggle--sidebar--slide'}`}>
                <div className="side-menu">
                    <div className="image-box" >
                        <a href='/'>
                            <img src={Logo} alt="dashbord-logo" className='active--logo' />
                        </a>
                    </div>
                    <div className='toggle-menu' onClick={toggleBar}>
                        <img src={DropDwonIcon} alt="dashbord-logo" />
                    </div>
                </div>
                <Router>
                    <div className='nav-bar-section' >
                        <ul>
                            <li>
                                <Link to="/"
                                    className={activeItem === 'home' ? 'active--nav' : ''}
                                    onClick={() => handleItemClick('home')}
                                >
                                    <img src={DashboardIcon} alt="Hamburger" className='icon--nav' />  <span className='hide--toggle--slide'>Dashboard</span>

                                </Link>
                                {/* <a href="/" className={activeItem === 'home' ? 'active--nav' : ''} onClick={() => handleItemClick('home')}><img src={DashboardIcon} alt="Hamburger" className='icon--nav' />  <span className='hide--toggle--slide'>Dashboard</span></a> */}
                            </li>
                            <li className='dropdown--item--dashborad'>
                                <span className={`drop--link ${activeItem === 'createcompany' ? 'active--nav' : ''}`} onClick={() => handleItemClick('createcompany')}>
                                    <span className='drop--list'>
                                        <img src={Createcompany} alt="careate company logo" className='icon--nav' />
                                        <span className='hide--toggle--slide'>Create Company</span>
                                    </span>
                                    <span className='nav-section-arrow hide--toggle--slide'><img src={DropDwonIcon} alt="DropDwonIcon" /></span>
                                </span>
                                <ul className='sub-menu'>
                                    <li>
                                        <Link
                                            to="/add-company">
                                            Add Company
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/view-companies">
                                            View Companies
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className='dropdown--item--dashborad'>
                                <span className={`drop--link ${activeItem === 'createadmin' ? 'active--nav' : ''}`} onClick={() => handleItemClick('createadmin')}>
                                    <span className='drop--list'>
                                        <img src={Createcompany} alt="careate company logo" className='icon--nav' />
                                        <span className='hide--toggle--slide'>Create Admin</span>
                                    </span>
                                    <span className='nav-section-arrow hide--toggle--slide'><img src={DropDwonIcon} alt="DropDwonIcon" /></span>
                                </span>
                                <ul className='sub-menu'>
                                    <li><a href="./createcompany" >Add Admin</a></li>
                                    <li><a href="#" >View Admins</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" className={activeItem === 'viewmodals' ? 'active--nav' : ''} onClick={() => handleItemClick('viewmodals')}><img src={DashboardIcon} alt="Hamburger" className='icon--nav' />  <span className='hide--toggle--slide'>Modals</span></a>
                            </li>



                        </ul>
                    </div>
                    <Routes>
                        <Route path="/" exact component={<Home />} />
                        <Route path="/add-company" component={<CareteCompany />} />
                        <Route path="/view-companies" component={<ViewCompany />} />
                    </Routes>

                </Router>
            </div>
        </>
    )
}

export default AdminSidebar