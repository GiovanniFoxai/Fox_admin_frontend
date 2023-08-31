import "./assets/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import SupAdmin from "./Components/SuperAdmin";
import CareteCompany from "./Components/SuperAdmin/CareteCompany";
import ViewCompany from "./Components/SuperAdmin/ViewCompany";
import ViewAdmins from "./Components/SuperAdmin/ViewAdmins";
import Modals from "./Components/SuperAdmin/Modals";
import AssignAdmin from "./Components/AssignAdmin";
import UserAdmin from "./Components/AssignAdmin/UserAdmin";
import ViewUser from "./Components/AssignAdmin/ViewUser";
import USerModals from "./Components/AssignAdmin/USerModals";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error404 } from "./pages/error-404";
import CreateAdmin from "./Components/SuperAdmin/CareteAdmin";
import Login from "./Components/Login";
import { LoginLayout } from "./Layouts/loginLayout";
import { DashboardLayout } from "./Layouts/dashboardLayout";
import Signup from "./Components/Signup";
import ForgetPassword from "./Components/ForgetPassword";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { getUser } from "./Redux/Reducers/authSlice";
import { AdminLayout } from "./Layouts/adminLayput";
import Home from "./Components/Home";
import AdminCreateUser from "./Components/SuperAdmin/AdminCreateUser";

function App() {
    const user = useSelector(getUser);

    const superAdminRoute = [
        {
            path: "/",
            element: <SupAdmin />,
        },
        {
            path: "/compaies",
            element: <ViewCompany />,
        },
        {
            path: "/compaies/create",
            element: <CareteCompany />,
        },
        { path: "/admin", element: <ViewAdmins /> },
        { path: "/admin/add", element: <CreateAdmin /> },
        { path: "/modals", element: <Modals /> },
    ];

    const adminRoute = [
        {
            path: "/",
            element: <SupAdmin />,
        },
        {
            path: "/compaies",
            element: <ViewCompany />,
        },
        {
            path: "/compaies/create",
            element: <CareteCompany />,
        },
        { path: "/view-users", element: <ViewUser /> },
        { path: "/add-user", element: <AdminCreateUser /> },
        { path: "/modals", element: <Modals /> },
    ];
    const normalUserRoute = [
        {
            path: "/",
            element: <Home />,
        },
    ];

    const getUserRoute = (userType) => {
        switch (userType) {
            case "SUPERADMIN":
                return superAdminRoute;
            case "ADMIN":
                return adminRoute;
            case "USER":
                return normalUserRoute;
        }
    };


    const getLayout = (userType) => {
        switch (userType) {
            case "SUPERADMIN":
                return <DashboardLayout />;
            case "ADMIN":
                return <AdminLayout />;
            case "USER":
                return <Fragment><Outlet /></Fragment>
        }
    }

    const router = createBrowserRouter([
        {
            path: "/auth",
            element: <LoginLayout />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "signup",
                    element: <Signup />,
                },
                {
                    path: "forget_password",
                    element: <ForgetPassword />,
                },
            ],
        },
        {
            path: "/",
            element: getLayout(user.user_type),
            children: getUserRoute(user.user_type),
        },
        {
            path: "*",
            element: <Error404 />,
        },
    ]);

    return (
        <Fragment>
            <ToastContainer />
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
