import React, { useEffect, useState } from "react";
import DashboardIcon from "../../assets/image/dashboard.png";
import DropDwonIcon from "../../assets/image/down-arrow.png";
import Createcompany from "../../assets/image/create.png";
import Logo from "../../assets/image/dashbordlogo.png";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Logout from "../../assets/image/logout.png";

import Home from "./index";
import CareteCompany from "./CareteCompany";
import ViewCompany from "./ViewCompany";
import { logout } from "../../Redux/Reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const Companyid = useSelector((state) => state.auth?.company);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const toggleBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const [activeItem, setActiveItem] = useState("home");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const [windowScreenWidth, setWindowScreenWidth] = useState(
    window.screen.width
  );

  const sideBarFalse = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const actualWidth = () => {
    setWindowScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", actualWidth);

    return () => {
      window.removeEventListener("resize", actualWidth);
    };
  });

  const logoutHandler = () => {
    dispatch({ type: "auth/logout" });
    dispatch(logout());
    navigate("/auth/login");
    toast.success("Logout successfully");
  };

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
                onClick={() => {
                  handleItemClick("home");
                  sideBarFalse();
                }}
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

            {Companyid ? (
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
                    <span className="hide--toggle--slide">Manage User</span>
                  </span>
                  <span className="nav-section-arrow hide--toggle--slide">
                    <img src={DropDwonIcon} alt="DropDwonIcon" />
                  </span>
                </span>
                <ul className="sub-menu">
                  <li>
                    <Link to="/add-user" onClick={sideBarFalse}>
                      Add User
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-users" onClick={sideBarFalse}>
                      View Users
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <></>
            )}

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
                  <span className="hide--toggle--slide">Manage Models</span>
                </span>
                <span className="nav-section-arrow hide--toggle--slide">
                  <img src={DropDwonIcon} alt="DropDwonIcon" />
                </span>
              </span>
              <ul className="sub-menu">
                <li>
                  <Link to="/add-modal" onClick={sideBarFalse}>
                    Add Models
                  </Link>
                </li>
                <li>
                  <Link to="/view-modal" onClick={sideBarFalse}>
                    View Models
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button className="sidebar--log" onClick={logoutHandler}>
                <img src={Logout} alt="logout" className="icon--nav" /> Logout
              </button>
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
