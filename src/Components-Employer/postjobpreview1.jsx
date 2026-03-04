import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EHeader } from "./EHeader";
import { Footer } from "../Components-LandingPage/Footer";
import { useJobs } from "../JobContext";

// Use the exact CSS from the JobSeeker view for perfect alignment
import "../Components-JobSeeker/OpportunityOverview.css";

// Assets (Using the same icons as OpportunityOverview)
import starIcon from '../assets/Star_icon.png';
import timeIcon from '../assets/opportunity_time.png';
import experienceIcon from '../assets/opportunity_bag.png';
import placeIcon from '../assets/opportunity_location.png';

const PostJobPreview = () => {
  const { state: job } = useLocation();
  const navigate = useNavigate();
  const { postJob, editjob } = useJobs();

  if (!job) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        <h2>No job data found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handlePostJob = () => {
    postJob(job);
    navigate("/Job-portal/Employer/Dashboard");
  };

  return (
    <>
      <EHeader />

      <div className="opp-overview-content">
        <div className="search-backbtn-container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <h2 style={{ marginLeft: "20px", color: "#444" }}>Preview Your Job Post</h2>
        </div>

        <div className="opp-overview-main" style={{ gridTemplateColumns: "1fr" }}>
          <div className="opp-job-main">
            
            {/* --- MAIN CARD (Mirrors OpportunityOverview.jsx) --- */}
            <div className="opp-overview-job-card">
              <div className="Opportunities-job-header">
                <div>
                  <h2 className="opp-topcard-job-title">{job.title}</h2>
                  <h5 className="Opportunities-job-company">
                    {job.company || "Your Company"} <span className="Opportunities-divider">|</span>
                    <span className="star">
                      <img src={starIcon} alt="star" />
                    </span>{" "}
                    {job.ratings || "3.5"} 
                    <span className="Opportunities-divider">|</span>
                    <span className="opp-reviews"> {job.reviewNo || "0"} Reviews</span>
                  </h5>
                </div>
                {/* Logo placeholder logic as per seeker view */}
                <div className="Opportunities-job-logo-placeholder">
                  {(job.company || "C").charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="Opportunities-job-details">
                <p className="Opportunities-detail-line">
                  <img src={timeIcon} className="card-icons" alt="time" />
                  {job.duration || "Full-time"} <span className="Opportunities-divider">|</span> ₹ {job.salary} Lpa
                </p>
                <p className="Opportunities-detail-line">
                  <img src={experienceIcon} className="card-icons" alt="exp" />
                  {job.experience} years of experience
                </p>
                <p className="Opportunities-detail-line">
                  <img src={placeIcon} className="card-icons" alt="loc" />
                  {job.location}
                </p>
              </div>

              <div className="Opportunities-details-bottom">
                <div className="Opportunities-job-tags">
                  {/* Job Seeker style colored tags */}
                  {job.jobCategory && (
                    <span className={`Opportunities-job-tag ${job.jobCategory.toLowerCase()}`}>
                      {job.jobCategory}
                    </span>
                  )}
                </div>
                <div className="Opportunities-job-type">
                  {job.WorkType || "Hybrid"}
                </div>
              </div>

              <hr className="Opportunities-separator" />

              <div className="Opportunities-job-footer">
                <div className="Opportunities-job-meta">
                  <p>
                    Posted: Just Now <span className="Opportunities-divider">|</span>{" "}
                    Openings: {job.openings} <span className="Opportunities-divider">|</span>{" "}
                    Applicants: 0
                  </p>
                </div>

                <div className="Opportunities-job-actions">
                  <button className="Opportunities-save-btn" onClick={() => navigate(-1)}>
                    Save
                  </button>
                  <button className="Opportunities-apply-btn" onClick={handlePostJob}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* --- DETAILS CARD --- */}
            <div className="opp-job-details-card">
              <div className="opp-job-highlights">
                <h3>Job Highlights</h3>
                <ul>
                  {job.JobHighlights?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                  {(!job.JobHighlights || job.JobHighlights[0] === "") && (
                    <li>No specific highlights added</li>
                  )}
                </ul>
              </div>

              <h3>Job Description</h3>
              <p>{job.jobDescription || "No description provided."}</p>

              <h3>Responsibilities</h3>
              <ul>
                {job.Responsibilities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {(!job.Responsibilities || job.Responsibilities[0] === "") && (
                  <li>Refer to job description</li>
                )}
              </ul>

              <h3>Key Details:</h3>
              <div className="key-details-grid">
                <p><strong>Role:</strong> {job.title}</p>
                <p><strong>Industry Type:</strong> {job.IndustryType?.join(", ") || "Not specified"}</p>
                <p><strong>Department:</strong> {job.Department?.join(", ") || "Not specified"}</p>
                <p><strong>Job Type:</strong> {job.WorkType}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Shift:</strong> {job.Shift}</p>
              </div>

              <h3>Key Skills</h3>
              <div className="opp-key-skills-container">
                {job.KeySkills?.length > 0 ? (
                  job.KeySkills.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))
                ) : (
                  <span>Not specified</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostJobPreview;