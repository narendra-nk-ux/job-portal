import React, { useState } from "react";
import { Footer } from "../Components-LandingPage/Footer";
import fileIcon from "../assets/fileIcon.png"
import "./CompanyVerify.css";
import { EHeader } from "./EHeader";
import { useNavigate } from "react-router-dom";

export const CompanyVerify = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    legalName: "",
    registrationNumber: "",
    taxId: "",
    websiteUrl: "",
    officialEmail: "",
    phoneNumber: "",
    incorporationCertificate: null,
  });

  // --- NEW: Error State ---
  const [errors, setErrors] = useState({});

  // --- NEW: Validation Logic ---
  const validateForm = () => {
    let newErrors = {};

    if (!formData.legalName.trim()) newErrors.legalName = "Legal name is required";
    if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
    if (!formData.taxId.trim()) newErrors.taxId = "Tax/GST ID is required";
    if (!formData.websiteUrl.trim()) newErrors.websiteUrl = "Website URL is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.officialEmail) {
      newErrors.officialEmail = "Official email is required";
    } else if (!emailRegex.test(formData.officialEmail)) {
      newErrors.officialEmail = "Invalid email format";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit number";
    }

    if (!formData.incorporationCertificate) {
      newErrors.incorporationCertificate = "Incorporation Certificate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle all inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }

    if (files) {
      const file = files[0];

      // Only allow PDF
      if (file && file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        return;
      }

      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      // Numbers only validation for phoneNumber (matching your About page logic)
      if (name === "phoneNumber") {
        const onlyNums = value.replace(/[^0-9]/g, "");
        if (onlyNums.length <= 10) {
          setFormData({
            ...formData,
            [name]: onlyNums,
          });
        }
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // --- UPDATED: Check validation ---
    if (validateForm()) {
      console.log("Verification Data Ready:", formData);
      navigate('/Job-portal/Employer/Dashboard', { state: { fromVerify: true } });
    } else {
      console.log("Validation failed", errors);
    }
  };

  return (
    <div className="verify-page">
      <EHeader />

      <div className="company-verify-container">
        <h2 className="company-verify-title">Company Verify</h2>

        <form className="company-verify-form" onSubmit={handleSubmit}>

          <div className="company-verify-form-group">
            <label>Company Legal Name</label>
            <input
              type="text"
              name="legalName"
              className={errors.legalName ? "error-border" : ""}
              placeholder="e.g., India"
              value={formData.legalName}
              onChange={handleChange}
            />
            {errors.legalName && <span className="error-text">{errors.legalName}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              className={errors.registrationNumber ? "error-border" : ""}
              value={formData.registrationNumber}
              onChange={handleChange}
            />
            {errors.registrationNumber && <span className="error-text">{errors.registrationNumber}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Tax Id / VAT / GST</label>
            <input
              type="text"
              name="taxId"
              className={errors.taxId ? "error-border" : ""}
              placeholder="e.g., GB123456789 or 27AAAAA0000A1Z5"
              value={formData.taxId}
              onChange={handleChange}
            />
            {errors.taxId && <span className="error-text">{errors.taxId}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Web Site URL</label>
            <input
              type="text"
              name="websiteUrl"
              className={errors.websiteUrl ? "error-border" : ""}
              placeholder="e.g., https://example.com"
              value={formData.websiteUrl}
              onChange={handleChange}
            />
            {errors.websiteUrl && <span className="error-text">{errors.websiteUrl}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Official Company Mail Id</label>
            <div className="company-verify-input-with-btn">
              <input
                type="email"
                name="officialEmail"
                className={errors.officialEmail ? "error-border" : ""}
                placeholder="e.g., hr@example.com"
                value={formData.officialEmail}
                onChange={handleChange}
              />
              <button type="button" className="company-small-verify-btn">
                verify
              </button>
            </div>
            {errors.officialEmail && <span className="error-text">{errors.officialEmail}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Phone Number</label>
            <div className="company-verify-input-with-btn">
              <input
                type="text"
                inputMode="numeric"
                name="phoneNumber"
                className={errors.phoneNumber ? "error-border" : ""}
                placeholder="e.g., 9145******"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <button type="button" className="company-small-verify-btn">
                verify
              </button>
            </div>
            {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
          </div>

          <div className="company-verify-form-group">
            <label>Company Incorporation Certificate</label>

            <div className={`company-verify-file-upload-box ${errors.incorporationCertificate ? "error-border" : ""}`}>

              <input
                type="file"
                name="incorporationCertificate"
                accept="application/pdf"
                id="pdfUpload"
                onChange={handleChange}
                hidden
              />

              {!formData.incorporationCertificate && (
                <label htmlFor="pdfUpload" className="company-verify-upload-placeholder">
                  <p>Click to Upload File (PDF only)</p>
                </label>
              )}

              {formData.incorporationCertificate && (
                <div className="company-verify-file-preview">
                  <label htmlFor="pdfUpload" className="company-verify-file-left clickable-area">
                    <img src={fileIcon} alt="file" />
                    <div>
                      <p>{formData.incorporationCertificate.name}</p>
                      <span>
                        {(formData.incorporationCertificate.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>
            {errors.incorporationCertificate && <span className="error-text">{errors.incorporationCertificate}</span>}
          </div>


          <div className="company-verify-btn-wrapper">
            <button type="submit" className="company-main-verify-btn">
              Verify
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
};