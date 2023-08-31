import Logo from "../../assets/image/dashbordlogo.png";
import AdminLogo from "../../assets/image/logo.png";
import DownarrowIcon from "../../assets/image/Vector.png";
import hamburger from "../../assets/image/Maskgroup.png";
import Createcompany from "../../assets/image/careatecompany.svg";
const AdminCreateUser = () => {
    return (
        <>
            <div className="dash-bar">
                <div>
                    <h3>Create User</h3>
                </div>
            </div>

            <div className="create-company-section">
                <div className="create-company-form">
                    <form className="form-create">
                        <label className="form-lable" for="fname">
                            User name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="fname"
                            name="fname"
                        />
                        <label className="form-lable" for="lname">
                            First Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="lname"
                            name="lname"
                        />

                        <label className="form-lable" for="lname">
                            Last Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="lname"
                            name="lname"
                        />

                        <label className="form-lable" for="start">
                            Email
                        </label>
                        <input className="form-input" type="email" id="email" />

                        <label className="form-lable" for="password">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type="Password"
                            id="Password"
                        />

                        <label className="form-lable" for="phone">
                            Phone Number
                        </label>
                        <input className="form-input" type="tel" id="tel" />

                        <input
                            className="form-submit"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminCreateUser;
