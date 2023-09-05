import React, { useEffect, useState } from "react";
import DashboardIcon from "../../assets/image/dashboard.png";
import DropDwonIcon from "../../assets/image/down-arrow.png";
import Createcompany from "../../assets/image/create.png";
import Logo from "../../assets/image/dashbordlogo.png";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Home from "./index";
import CareteCompany from "./CareteCompany";
import ViewCompany from "./ViewCompany";

const AdminSidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const toggleBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const [windowScreenWidth, setWindowScreenWidth] = useState(
    window.screen.width
  );

  const actualWidth = () => {
    setWindowScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", actualWidth);

    return () => {
      window.removeEventListener("resize", actualWidth);
    };
  });

  useEffect(() => {
    if (windowScreenWidth < 767) {
      setToggleSidebar(false);
    } else {
      setToggleSidebar(true);
    }
  }, [windowScreenWidth]);

  return (
    <>
      <div
        className={`sidebar--section ${
          toggleSidebar ? "toggle--sidebar" : "toggle--sidebar--slide"
        }`}
      >
        <div className="side-menu">
          <div className="image-box">
            <a href="/">
              <img src={Logo} alt="dashbord-logo" className="active--logo" />
            </a>
          </div>
          <div className="toggle-menu" onClick={toggleBar}>
            <img src={DropDwonIcon} alt="dashbord-logo" />
          </div>
        </div>
        <div className="nav-bar-section">
          <ul>
            <li>
              <Link
                to="/"
                className={activeItem === "home" ? "active--nav" : ""}
                onClick={() => handleItemClick("home")}
              >
                <img
                  src={DashboardIcon}
                  alt="Hamburger"
                  className="icon--nav"
                />{" "}
                <span className="hide--toggle--slide">Dashboard</span>
              </Link>
              {/* <a href="/" className={activeItem === 'home' ? 'active--nav' : ''} onClick={() => handleItemClick('home')}><img src={DashboardIcon} alt="Hamburger" className='icon--nav' />  <span className='hide--toggle--slide'>Dashboard</span></a> */}
            </li>

            <li className="dropdown--item--dashborad">
              <span
                className={`drop--link ${
                  activeItem === "createcompany" ? "active--nav" : ""
                }`}
                onClick={() => handleItemClick("createcompany")}
              >
                <span className="drop--list">
                  <img
                    src={Createcompany}
                    alt="careate company logo"
                    className="icon--nav"
                  />
                  <span className="hide--toggle--slide">Create User</span>
                </span>
                <span className="nav-section-arrow hide--toggle--slide">
                  <img src={DropDwonIcon} alt="DropDwonIcon" />
                </span>
              </span>
              <ul className="sub-menu">
                <li>
                  <Link to="/add-user">Add User</Link>
                </li>
                <li>
                  <Link to="/view-users">View User</Link>
                </li>
              </ul>
            </li>

            <li className="dropdown--item--dashborad">
              <span
                className={`drop--link ${
                  activeItem === "DashboardIcon" ? "active--nav" : ""
                }`}
                onClick={() => handleItemClick("DashboardIcon")}
              >
                <span className="drop--list">
                  <img
                    src={DashboardIcon}
                    alt="Hamburger"
                    className="icon--nav"
                  />{" "}
                  <span className="hide--toggle--slide">Create Modal</span>
                </span>
                <span className="nav-section-arrow hide--toggle--slide">
                  <img src={DashboardIcon} alt="DashboardIcon" />
                </span>
              </span>
              <ul className="sub-menu">
                <li>
                  <Link to="/add-modal">Add Modal</Link>
                </li>
                <li>
                  <Link to="/view-modal">View Modal</Link>
                </li>
              </ul>
            </li>

            {/*
                        <li>
                            <Link
                                to="/modals"
                                className={
                                    activeItem === "viewmodals"
                                        ? "active--nav"
                                        : ""
                                }
                                onClick={() => handleItemClick("viewmodals")}
                            >
                                <img
                                    src={DashboardIcon}
                                    alt="Hamburger"
                                    className="icon--nav"
                                />{" "}
                                <span className="hide--toggle--slide">
                                    Modals
                                </span>
                            </Link>
                        </li>
 */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
