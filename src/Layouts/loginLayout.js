import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export const LoginLayout = () => {
    return (
        <Fragment>
            <ToastContainer />
            <Outlet />
        </Fragment>
    )
}