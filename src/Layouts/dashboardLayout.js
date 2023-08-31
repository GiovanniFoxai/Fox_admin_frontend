import { Outlet } from "react-router-dom"
import AdminSidebar from "../Components/SuperAdmin/AdminSidebar"
import DashboardTopBar from "../Components/SuperAdmin/DashboardTopBar"
import { AuthProvide } from "../context/auth.context.provider"

export const DashboardLayout = () => {
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