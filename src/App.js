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
import { Route, Routes } from "react-router-dom";
import { Error404 } from "./pages/error-404";
import AdminSidebar from "./Components/SuperAdmin/AdminSidebar";
import DashboardTopBar from "./Components/SuperAdmin/DashboardTopBar";
import CreateAdmin from "./Components/SuperAdmin/CareteAdmin";

function App() {
    return (
        <section className="dashbord-section">
            <AdminSidebar />
            <div className="content--section">
                <DashboardTopBar />
                <Routes>
                    <Route path="/" element={<SupAdmin />} />
                    <Route path="compaies" element={<ViewCompany />} />
                    <Route path="compaies/create" element={<CareteCompany />} />
                    <Route path="admin" element={<ViewAdmins />} />
                    <Route path="admin/add" element={<CreateAdmin />} />
                    <Route path="admin/assign" element={<AssignAdmin />} />
                    <Route path="admin/user" element={<UserAdmin />} />
                    <Route path="admin/view-user" element={<ViewUser />} />
                    <Route path="modals" element={<Modals />} />
                    <Route path="modals/user-modals" element={<USerModals />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </section>
    );
}

export default App;
