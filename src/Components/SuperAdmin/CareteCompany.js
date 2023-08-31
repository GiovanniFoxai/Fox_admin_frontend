import { Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import IsLoadingHOC from "../IsLoadingHOC";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCompanyApi } from "../../Redux/Actions/companyAction";
import { companyCreated, companyCreatedSuccessfully } from "../../Redux/Reducers/companySlice";

const CareteCompany = (props) => {

    const { setLoading } = props

    const dispatch = useDispatch()

    const isCompanyCreated = useSelector(companyCreatedSuccessfully);

    useEffect(() => {
        console.log("Debugger", isCompanyCreated);
        if(!!isCompanyCreated) {
            toast.success("Company added successfully!");
            dispatch(companyCreated(false))
        }
    }, [isCompanyCreated])


    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Company name  is required"),
        address: Yup.string().required("Company address is required"),
    });

    const formik = useFormik({
        initialValues: {
            name:'',
            address: ''
        },
        validationSchema: validateSchema,
        onSubmit: async (value, {resetForm}) => {
            console.log("Debugeer", value);
            setLoading(true);
            try {
                await dispatch(createCompanyApi({...value}));
                resetForm();
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
            
        }
    })
    return (
        <Fragment>
            <div className="dash-bar">
                <div>
                    <h3>Add Company</h3>
                </div>
            </div>
            <div className="create-company-section">
                <div className="create-company-form">
                    <form className="form-create" onSubmit={formik.handleSubmit}>
                        <label className="form-lable" htmlFor="name">
                            Company Name
                        </label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name="name"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                        <label className="form-lable" htmlFor="address">
                            Company Address
                        </label>
                        <textarea
                            className="form-textarea"
                            name="address"
                            onChange={formik.handleChange}
                            form="address"
                            value={formik.values.address}
                        ></textarea>
                        {formik.touched.address && formik.errors.address ? (
                            <div>{formik.errors.address}</div>
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

export default IsLoadingHOC(CareteCompany);
