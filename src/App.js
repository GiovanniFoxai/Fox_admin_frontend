import "./assets/css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import SupAdmin from "./Components/SuperAdmin";
import CreatCompany from "./Components/SuperAdmin/CreateCompany";
import ViewCompany from "./Components/SuperAdmin/ViewCompany";
import ViewAdmins from "./Components/SuperAdmin/ViewAdmins";
import Modals from "./Components/AssignAdmin/USerModals";
import ViewUser from "./Components/AssignAdmin/ViewUser";
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
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
import { AuthProvide } from "./context/auth.context.provider";
import AdminCareteUser from "./Components/AssignAdmin/AdminCareteUser";
import AddModal from "./Components/AssignAdmin/AddModal";

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
            element: <CreatCompany />,
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
        { path: "/view-users", element: <ViewUser /> },
        { path: "/add-user", element: <AdminCareteUser /> },
        { path: "/add-modal", element: <AddModal /> },
        { path: "/view-modal", element: <Modals /> },
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
                return <AuthProvide><Outlet /></AuthProvide>
            default:
                return <Navigate to="/auth/login" replace />;
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
