import { Fragment } from "react";
const CreateAdmin = () => {
    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>Add Admin</h3>
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
                        <label className="form-lable" for="email">
                            Email
                        </label>
                        <input className="form-input" type="email" id="email" />
                        <label className="form-lable" for="start">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="pasword"
                        />

                        <input
                            className="form-submit"
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default CreateAdmin;
