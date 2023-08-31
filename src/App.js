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
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Error404 } from "./pages/error-404";
import CreateAdmin from "./Components/SuperAdmin/CareteAdmin";
import Login from "./Components/Login";
import { LoginLayout } from "./Layouts/loginLayout";
import { DashboardLayout } from "./Layouts/dashboardLayout";
import Signup from "./Components/Signup";
import ForgetPassword from "./Components/ForgetPassword";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";

function App() {
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
            element: <DashboardLayout />,
            children: [
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
                { path: "/admin/assign", element: <AssignAdmin /> },
                { path: "/admin/user", element: <UserAdmin /> },
                { path: "/admin/view-user", element: <ViewUser /> },
                { path: "/modals", element: <Modals /> },
                { path: "/modals/user-modals", element: <USerModals /> },
            ],
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
