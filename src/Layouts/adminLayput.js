import { Outlet } from "react-router-dom"
import { AuthProvide } from "../context/auth.context.provider"
import AdminSidebar from "../Components/AssignAdmin/AdminSidebar"
import DashboardTopBar from "../Components/AssignAdmin/DashboardTopBar"

export const AdminLayout = () => {
    return (
        <AuthProvide>
            <section className="dashbord-section">
                <AdminSidebar />
                <div className="content--section">
                    <DashboardTopBar />
                    <Outlet />
                </div>
            </section>
        </AuthProvide>
    )
}