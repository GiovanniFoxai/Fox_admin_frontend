import React, { useEffect, useState } from "react";
import DashboardIcon from "../../assets/image/dashboard.png";
import DropDwonIcon from "../../assets/image/down-arrow.png";
import Createcompany from "../../assets/image/create.png";
import Logo from "../../assets/image/dashbordlogo.png";
import Logout from "../../assets/image/logout.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Reducers/authSlice";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const toggleBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const [activeItem, setActiveItem] = useState("home");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "auth/logout" });
    dispatch(logout())
    navigate('/auth/login')
    toast.success("Logout successfully")
  };

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
                  <span className="hide--toggle--slide">Create Company</span>
                </span>
                <span className="nav-section-arrow hide--toggle--slide">
                  <img src={DropDwonIcon} alt="DropDwonIcon" />
                </span>
              </span>
              <ul className="sub-menu">
                <li>
                  <Link to="/compaies/create">Add Company</Link>
                </li>
                <li>
                  <Link to="/compaies">View Companies</Link>
                </li>
              </ul>
            </li>

            <li className="dropdown--item--dashborad">
              <span
                className={`drop--link ${
                  activeItem === "createadmin" ? "active--nav" : ""
                }`}
                onClick={() => handleItemClick("createadmin")}
              >
                <span className="drop--list">
                  <img
                    src={Createcompany}
                    alt="careate company logo"
                    className="icon--nav"
                  />
                  <span className="hide--toggle--slide">Admin</span>
                </span>
                <span className="nav-section-arrow hide--toggle--slide">
                  <img src={DropDwonIcon} alt="DropDwonIcon" />
                </span>
              </span>
              <ul className="sub-menu">
                <li>
                  <Link to="/admin/add">Add Admin</Link>
                </li>
                <li>
                  <Link to="/admin"> Admin List</Link>
                </li>
              </ul>
            </li>
            <li>
              <button className="sidebar--log" onClick={logoutHandler} >
                <img  src={Logout}  alt="logout" className="icon--nav" /> Logout
              </button>
            </li>
            {/*
                        <li className="dropdown--item--dashborad">
                            <Link
                                to="/modals"
                                className={`drop--link ${
                                    activeItem === "viewmodals"
                                        ? "active--nav"
                                        : ""
                                }`}
                                onClick={() => handleItemClick("viewmodals")}
                            >
                                <span className="drop--list">
                                    <img
                                        src={DashboardIcon}
                                        alt="Hamburger"
                                        className="icon--nav"
                                    />{" "}
                                    <span className="hide--toggle--slide">
                                        Modals
                                    </span>
                                </span>
                            </Link>
                        </li>
                        */}
          </ul>
        </div>
        {/* <Routes>
                        <Route path="/" exact component={<Home />} />
                        <Route path="/add-company" component={<CareteCompany />} />
                        <Route path="/view-companies" component={<ViewCompany />} />
                    </Routes> */}
      </div>
    </>
  );
};

export default AdminSidebar;
