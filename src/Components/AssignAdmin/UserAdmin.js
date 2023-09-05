const CareteAdmin = () => {
    return (
        <>
            <div className="dash-bar">
                <div>
                    <h3>Add User</h3>
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
                            password
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
       </>
    );
};

export default CareteAdmin;
