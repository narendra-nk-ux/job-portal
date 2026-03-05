import React, { useState } from "react";
import { EHeader } from "./EHeader";
import { Footer } from "../Components-LandingPage/Footer";
import { Link } from "react-router-dom";
import "./AboutYourCompany.css";
import fileIcon from "../assets/fileIcon.png"
import { useNavigate } from "react-router-dom";
import { useJobs } from '../JobContext';

export const AboutYourCompany = () => {
    const navigate = useNavigate();
    const { setCompanyProfile } = useJobs();

    const [formData, setFormData] = useState({
        companyName: "",
        companyMoto: "",
        contactPerson: "",
        contactNumber: "",
        companyMail: "",
        website: "",
        companySize: "",
        address1: "",
        address2: "",
        about: "",
        companyLogo: null
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {

        
        let newErrors = {};


        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
        if (!formData.address1.trim()) newErrors.address1 = "Primary address is required";
        if (!formData.companySize.trim()) newErrors.companySize = "Please specify company size";
        if (!formData.about.trim()) newErrors.about = "Please provide a description";


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.companyMail) {
            newErrors.companyMail = "Email is required";
        } else if (!emailRegex.test(formData.companyMail)) {
            newErrors.companyMail = "Invalid email format";
        }

        const phoneRegex = /^[6-9]\d{9}$/;;
        if (!formData.contactNumber) {
            newErrors.contactNumber = "Phone number is required";
        } else if (!phoneRegex.test(formData.contactNumber)) {
            newErrors.contactNumber = "Number must start with 6, 7, 8, or 9 and be 10 digits";
        }


        if (!formData.companyLogo) {
            newErrors.companyLogo = "Please upload a logo";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }

        if (files) {
            const file = files[0];
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

            if (!allowedTypes.includes(file.type)) {
                alert("Only image files (PNG, JPG, JPEG, WEBP) are allowed!");
                return;
            }
            setFormData({ ...formData, [name]: file });
        } else {

            if (name === "contactNumber") {
                const onlyNums = value.replace(/[^0-9]/g, "");
                if (onlyNums.length <= 10) {
                    setFormData({ ...formData, [name]: onlyNums });
                }
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            // setCompanyProfile({
            //     companyName: formData.companyName,
            //     about: formData.about,
            //     website: formData.website,
            //     companyLogo: formData.companyLogo,
            //     contactNumber: formData.contactNumber,
            //     companyMail: formData.companyMail
            // }); 

            console.log("Form Validated. Proceeding to Verification...");
            navigate("/Job-portal/Employer/about-your-company/company-verification");
        } else {
            const firstError = Object.keys(errors)[0];
            console.log("Validation failed at:", firstError);
        }
    };

    return (
        <div>
            <EHeader />

            <div className="aboutcompany-container">
                <h2 className="aboutcompany-title">About Your Company</h2>

                <form className="aboutcompany-form" onSubmit={handleSubmit}>

                    <div className="aboutcompany-form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            className={errors.companyName ? "error-border" : ""}
                            placeholder="e.g., job portal"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                        {errors.companyName && <span className="error-text">{errors.companyName}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Moto (Optional)</label>
                        <input
                            type="text"
                            name="companyMoto"
                            value={formData.companyMoto}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Contact Person</label>
                        <input
                            type="text"
                            name="contactPerson"
                            className={errors.contactPerson ? "error-border" : ""}
                            placeholder="e.g., vijay"
                            value={formData.contactPerson}
                            onChange={handleChange}
                        />
                        {errors.contactPerson && <span className="error-text">{errors.contactPerson}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Contact Number</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            name="contactNumber"
                            className={errors.contactNumber ? "error-border" : ""}
                            placeholder="e.g., 9145******"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                        {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Mail Id</label>
                        <input
                            type="email"
                            name="companyMail"
                            className={errors.companyMail ? "error-border" : ""}
                            placeholder="e.g., hr@example.com"
                            value={formData.companyMail}
                            onChange={handleChange}
                        />
                        {errors.companyMail && <span className="error-text">{errors.companyMail}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Web Site</label>
                        <input
                            type="text"
                            name="website"
                            placeholder="e.g., https://example.com"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Logo</label>
                        <div className={`aboutcompany-file-upload-box ${errors.companyLogo ? "error-border" : ""}`}>
                            <input
                                type="file"
                                name="companyLogo"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                id="logoUpload"
                                onChange={handleChange}
                                hidden
                            />

                            {!formData.companyLogo && (
                                <label htmlFor="logoUpload" className="aboutcompany-upload-placeholder">
                                    Click to Upload Logo
                                </label>
                            )}

                            {formData.companyLogo && (
                                <div className="aboutcompany-file-preview">
                                    <label htmlFor="logoUpload" className="aboutcompany-file-left clickable-area">
                                        <img src={fileIcon} alt="file" />
                                        <div>
                                            <p>{formData.companyLogo.name}</p>
                                            <span>
                                                {(formData.companyLogo.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>
                        {errors.companyLogo && <span className="error-text">{errors.companyLogo}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Size</label>
                        <input
                            type="text"
                            name="companySize"
                            className={errors.companySize ? "error-border" : ""}
                            placeholder="e.g., 10-50 employees"
                            value={formData.companySize}
                            onChange={handleChange}
                        />
                        {errors.companySize && <span className="error-text">{errors.companySize}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Address</label>
                        <input
                            type="text"
                            name="address1"
                            className={errors.address1 ? "error-border" : ""}
                            placeholder="e.g., 123 Street Name"
                            value={formData.address1}
                            onChange={handleChange}
                        />
                        {errors.address1 && <span className="error-text">{errors.address1}</span>}
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>Company Address 2 (Optional)</label>
                        <input
                            type="text"
                            name="address2"
                            placeholder="e.g., Suite or Floor"
                            value={formData.address2}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="aboutcompany-form-group">
                        <label>About Company</label>
                        <textarea
                            rows="5"
                            name="about"
                            className={errors.about ? "error-border" : ""}
                            placeholder="Tell us about your company culture and mission..."
                            value={formData.about}
                            onChange={handleChange}
                        />
                        {errors.about && <span className="error-text">{errors.about}</span>}
                    </div>

                    <div className="aboutcompany-form-buttons">
                        <button type="button" className="aboutcompany-back-btn" onClick={() => navigate(-1)}>Back</button>
                        {/* <button type="submit" className="aboutcompany-next-btn">Next</button> */}
                        {/* <Link to="/Job-portal/Employer/about-your-company/company-verification"> */}
                            <button type="submit" className="aboutcompany-next-btn">
                                Next
                            </button>
                        {/* </Link> */}
                    </div>

                </form>
            </div>

            <Footer />
        </div>
    );
};