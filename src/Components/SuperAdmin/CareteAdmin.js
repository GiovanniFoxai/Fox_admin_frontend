import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyList } from "../../Redux/Actions/companyAction";
import IsLoadingHOC from "../IsLoadingHOC";
import { toast } from "react-toastify";
import { companiesList } from "../../Redux/Reducers/companySlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../../Redux/Actions/userAction";
import {
    setUserCreateError,
    userCreated,
    userCreatedRejected,
    userCreatedSuccessfully,
} from "../../Redux/Reducers/userSlice";

const CreateAdmin = (props) => {
    const { setLoading } = props;
    const dispatch = useDispatch();
    const getCompanyData = async () => {
        setLoading(true);
        try {
            await dispatch(fetchCompanyList());
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCompanyData();
    }, []);

    const isUserCreated = useSelector(userCreatedSuccessfully);
    const userCreatedError = useSelector(userCreatedRejected);

    useEffect(() => {
        if (!!isUserCreated) {
            toast.success("Admin User added successfully!");
            formik.resetForm();
            dispatch(userCreated(false));
        }
    }, [isUserCreated]);

    useEffect(() => {
        if (!!userCreatedError) {
            toast.error(userCreatedError);
            dispatch(setUserCreateError(null));
        }
    }, [userCreatedError]);

    const companies = useSelector(companiesList);

    const validateSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("First name is required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
        last_name: Yup.string()
            .required("Last name is required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
        mobile: Yup.string().required("Mobile number is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Please enter valie email address"),
        password: Yup.string()
            .required("This field is required")
            .min(8, "Pasword must be 8 or more characters")
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])\w+/,
                "Password ahould contain at least one uppercase and lowercase character"
            )
            .matches(/\d/, "Password should contain at least one number")
            .matches(
                /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
                "Password should contain at least one special character"
            ),
        confirmPassword: Yup.string()
            .required("This field required")
            .when("password", (password, field) => {
                if (password) {
                    return field
                        .required("The passwords do not match")
                        .oneOf(
                            [Yup.ref("password")],
                            "The passwords do not match"
                        );
                }
            }),
        company: Yup.string().required("Pleae select a company"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            first_name: "",
            last_name: "",
            mobile: "",
            email: "",
            password: "",
            company: "",
            confirmPassword: "",
        },
        validationSchema: validateSchema,
        onSubmit: async (value, { resetForm }) => {
            console.log("Debugeer", value);
            setLoading(true);
            try {
                let {
                    first_name,
                    last_name,
                    password,
                    email,
                    mobile,
                    company,
                } = value;
                await dispatch(
                    createUser({
                        name: first_name + " " + last_name,
                        first_name,
                        last_name,
                        password,
                        email,
                        mobile,
                        company,
                        user_type: "ADMIN",
                        username: email,
                    })
                );
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>Add Admin</h3>
                </div>
            </div>
            <div className="create-company-section">
                <div className="create-company-form">
                    <form
                        className="form-create"
                        onSubmit={formik.handleSubmit}
                    >
                        <label className="form-lable" htmlFor="first_name">
                            First name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="first_name"
                            name="first_name"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        {formik.touched.first_name &&
                        formik.errors.first_name ? (
                            <div className="error">
                                {formik.errors.first_name}
                            </div>
                        ) : null}
                        <label className="form-lable" htmlFor="last_name">
                            Last name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="last_name"
                            name="last_name"
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                            <div>{formik.errors.last_name}</div>
                        ) : null}
                        <label className="form-lable" htmlFor="mobile">
                            Mobile Number
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="mobile"
                            name="mobile"
                            onChange={formik.handleChange}
                            value={formik.values.mobile}
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                            <div>{formik.errors.mobile}</div>
                        ) : null}
                        <label className="form-lable" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <label className="form-lable" htmlFor="pasword">
                            Password
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="pasword"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                        <label
                            className="form-lable"
                            htmlFor="confirm_password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="form-input"
                            type="password"
                            id="confirm_password"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword ? (
                            <div>{formik.errors.confirmPassword}</div>
                        ) : null}
                        <label className="form-lable" htmlFor="company">
                            Select company
                        </label>
                        <select
                            name="company"
                            className="form-input"
                            id="company"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.company}
                        >
                            <option value="" label="Select a comnany">
                                Select a Company{" "}
                            </option>
                            {companies.map((item, index) => (
                                <option
                                    value={item._id}
                                    key={"company_dropdown_" + index}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.company && formik.errors.company ? (
                            <div>{formik.errors.company}</div>
                        ) : null}
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

export default IsLoadingHOC(CreateAdmin);
