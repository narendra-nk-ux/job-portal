import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostAJob from '../assets/PostAjob.png';
import ClockIcon from '../assets/opportunity_time.png';
import experienceIcon from '../assets/opportunity_bag.png';
import placeIcon from '../assets/opportunity_location.png';
import twitterIcon from '../assets/socials-x.png';
import linkedinIcon from '../assets/socials-linkedin.png';
import facebookIcon from '../assets/socials-facebook.png';
import starIcon from '../assets/Star_icon.png';
import './PostJobPreview.css';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import { useJobs } from '../JobContext';

const PostJobPreview = () => {
  const { state } = useLocation();
  const { postJob, editJob, companyProfile, getSuggestedJobs, jobs } = useJobs();
  const navigate = useNavigate();
  const [step, setStep] = useState('preview');
  const [showSuggestions, setShowSuggestions] = useState(false);


  // const suggestions = useMemo(() => {
  //   if (!state || !getSuggestedJobs) return [];
  //   return getSuggestedJobs(state.jobTitle, state.category);
  // }, [state?.jobTitle, state?.category, getSuggestedJobs]);

  const suggestions = useMemo(() => {
    return getSuggestedJobs(state.jobTitle, state.category);
  }, [state.jobTitle, state.category, jobs]);

  if (!state) {
    return (
      <div className="jobpost-previous-error-screen" style={{ padding: "50px", textAlign: "center" }}>
        <h2>No job data found</h2>
        <button className="jobpost-previous-btn-cancel" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const getSelectedLabels = (val) => {
    if (!val) return [];
    if (typeof val === 'object' && !Array.isArray(val)) {
      return Object.keys(val)
        .filter(key => val[key])
        .map(key => key.charAt(0).toUpperCase() + key.slice(1));
    }
    if (Array.isArray(val)) return val;
    return [val];
  };

  const getPostedTime = (date) => {
    if (!date) return "Just now";
    const now = new Date();
    const postedDate = new Date(date);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);
    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatDisplay = (val) => {
    const labels = getSelectedLabels(val);
    return labels.length > 0 ? labels.join(', ') : 'Not specified';
  };

  const handleFinalPost = () => {
    setStep('loading');
    setTimeout(() => {
      if (state.id) {
        editJob(state.id, state);
      } else {
        postJob(state);
      }
      setStep('success');
      setTimeout(() => {
        navigate('/Job-portal/Employer/Dashboard');
      }, 2000);
    }, 1000);
  };

  if (step === 'loading' || step === 'success') {
    return (
      <div>
        <EHeader />
        <div className="jobpost-previous-status-container">
          {step === 'loading' ? (
            <div className="jobpost-previous-success-msg">
              <div className="jobpost-previous-loader"></div>
              <p className="jobpost-previous-success-title">Posting your job...</p>
            </div>
          ) : (
            <div className="jobpost-previous-success-msg">
              <img src={PostAJob} alt="Post Success" className="jobpost-previous-success-hero-img" />
              <h2 className="jobpost-previous-success-title">Job Posted Successfully for the position</h2>
              <p className="jobpost-previous-success-subtitle">{state.jobTitle}</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="jobpost-previous-preview-page-wrapper">
      <EHeader />
      <header className="jobpost-previous-preview-header">
        <h1>Preview Job</h1>
      </header>

      <main className="jobpost-previous-preview-content-area">
        <section className="jobpost-previous-card jobpost-previous-main-info">
          <div className="jobpost-previous-card-top-row">
            <div className="jobpost-previous-title-area">
              <h2 className="jobpost-previous-job-title-text">{state.jobTitle || "Job Title Not Specified"}</h2>
              <h5 className="overview-job-company">
                {companyProfile.companyName || "Company Name"}
                <span className="review-divider"> | </span>
                <span className="star">
                  <img src={starIcon} alt="star" style={{ width: '14px', marginRight: '4px' }} />
                </span>
                {companyProfile.ratings || "4.3"}
                <span className="review-divider"> | </span>
                <span className="opp-reviews">
                  {companyProfile.reviewNo || "55k+"} Reviews
                </span>
              </h5>
            </div>
            <div className="jobpost-previous-company-logo-square">
              {companyProfile.companyName ? companyProfile.companyName.charAt(0).toUpperCase() : "W"}
            </div>
          </div>

          <div className="jobpost-previous-info-grid-row">
            <div className="jobpost-previous-info-item-group">
              <div className="jobpost-previous-info-item">
                <img src={ClockIcon} alt="clock" className="jobpost-previous-icon" style={{ width: '16px', marginRight: '8px' }} />
                <span>{state.workDuration || 'Not specified'}</span>
              </div>
              <div className="jobpost-previous-vertical-separator"></div>
              <div className="jobpost-previous-info-item">
                <span style={{ fontWeight: 'bold', marginRight: '8px' }}>₹</span>
                <span>{state.salary || 'Not disclosed'}</span>
              </div>
            </div>

            <div className="jobpost-previous-info-item">
              <img src={experienceIcon} alt="experience" className="jobpost-previous-icon" style={{ width: '16px', marginRight: '8px' }} />
              <span className="experience-text">
                {state.experience ? `${state.experience} of experience` : "Fresher / Not specified"}
              </span>
            </div>

            <div className="jobpost-previous-info-item">
              <img src={placeIcon} alt="location" className="jobpost-previous-icon" style={{ width: '16px', marginRight: '8px' }} />
              <span>{state.location || 'Location not specified'}</span>
            </div>
          </div>

          <div className="jobpost-previous-tags-row">
            {getSelectedLabels(state.workType).map((type, index) => (
              <span key={index} className="jobpost-previous-job-type-tag">{type}</span>
            ))}
            {getSelectedLabels(state.shift).map((s, index) => (
              <span key={`shift-${index}`} className="jobpost-previous-job-type-tag" >
                {s} Shift
              </span>
            ))}
            <button
              className="jobpost-previous-suggest-link"
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              {showSuggestions ? "Hide Suggestions" : "Suggest more roles like this"}
            </button>
          </div>

          {/* {showSuggestions && (
            <div className="jobpost-suggestions-results">
              <h4 className="jobpost-suggestions-title">Similar Roles Found:</h4>
              <div className="jobpost-suggestions-list">
                {suggestions.length > 0 ? (
                  suggestions.map((job) => (
                    <div key={job.id} className="suggestion-item-card" onClick={() => navigate(`/Job-portal/job/${job.id}`)}>
                      <div className="suggestion-role-name">{job.jobTitle}</div>
                      <div className="suggestion-company-name">{job.company} • {job.location}</div>
                    </div>
                  ))
                ) : (
                  <p className="no-suggestions-text">No similar roles found at this time.</p>
                )}
              </div>
            </div>
          )} */}

          {showSuggestions && (
            <div className="jobpost-suggestions-results">
              <h4 className="jobpost-suggestions-title">Similar Roles in {formatDisplay(state.category)}</h4>
              <div className="jobpost-suggestions-list">
                {suggestions.map((job) => (
                  <div key={job.id} className="suggestion-item-card" onClick={() => navigate(`/job/${job.id}`)}>
                    <div className="suggestion-role-name">{job.jobTitle}</div>
                    <div className="suggestion-company-name">{job.company} • {job.location}</div>
                    <div className="match-pill">
                      {Math.min(job.relevance * 10, 100)}% Match
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="jobpost-previous-footer-meta-text">
            <span className="meta-item">
              <strong>Posted:</strong> {getPostedTime(state.createdAt)}
            </span>
            <span className="meta-separator">|</span>
            <span className="meta-item">
              <strong>Openings:</strong> {state.openings || 1}
            </span>
            <span className="meta-separator">|</span>
            <span className="meta-item">
              <strong>Applicants:</strong> <span className="applicant-count">0</span>
            </span>
          </div>
        </section>

        {/* Remaining sections (highlights, overview, description, etc.) stay the same */}
        <section className="jobpost-previous-card jobpost-previous-details-info">
          {/* ... existing detailed sections ... */}
          <div className="jobpost-previous-highlights-callout">
            <h4>Job highlights</h4>
            <ul>
              {state.jobHighlights && state.jobHighlights.filter(h => h.trim() !== "").map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
              {(!state.jobHighlights || state.jobHighlights[0] === "") && <li>No specific highlights added.</li>}
            </ul>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Company Overview {companyProfile.companyName}</h4>
            <p className="jobpost-previous-description-text">
              {companyProfile.about || "No company overview provided."}
            </p>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Job description</h4>
            <p className="jobpost-previous-description-text">{state.jobDescription || "No description provided."}</p>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Responsibilities</h4>
            <ul className="jobpost-previous-description-list">
              {state.responsibilities && state.responsibilities.filter(r => r.trim() !== "").map((res, i) => (
                <li key={i}>{res}</li>
              ))}
              {(!state.responsibilities || state.responsibilities[0] === "") && <li>Refer to job description.</li>}
            </ul>
          </div>

          <div className="jobpost-previous-meta-info-grid">
            <p><strong>Role:</strong> {formatDisplay(state.jobTitle)}</p>
            <p><strong>Industry Type:</strong> {formatDisplay(state.category)}</p>
            <p><strong>Department:</strong> {formatDisplay(state.department)}</p>
            <p><strong>Work Type:</strong> {formatDisplay(state.workType)}</p>
            <p><strong>Job Category:</strong> {state.jobCategory ? formatDisplay(state.jobCategory) : 'Not specified'}</p>
            <p><strong>Education:</strong> {formatDisplay(state.education)}</p>
            <p><strong>Work Duration:</strong> {formatDisplay(state.workDuration)}</p>
            <p><strong>Post Active For:</strong> {formatDisplay(state.jobPostDuration)}</p>
            <p><strong>Experience level:</strong> {state.experience ? `${formatDisplay(state.experience)} of experience` : "Fresher / Not specified"}</p>
            <p><strong>Location:</strong> {state.location ? formatDisplay(state.location) : 'Location not specified'}</p>
          </div>

          <div className="jobpost-previous-skills-section">
            <h4>Key Skills</h4>
            <div className="jobpost-previous-skills-container">
              {state.skills?.length > 0 ? (
                state.skills.map((skill, i) => (
                  <span key={i} className="jobpost-previous-skill-pill">{skill}</span>
                ))
              ) : (
                <span className="jobpost-previous-skill-pill">Not specified</span>
              )}
            </div>
          </div>

          <div className="jobpost-previous-footer-actions">
            <div className="jobpost-previous-social-sharing">
              <span>Share this job:</span>
              <div className="jobpost-previous-social-icons" style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <img src={linkedinIcon} alt="linkedin" className="jobpost-previous-icon-in" style={{ width: '22px', cursor: 'pointer' }} />
                <img src={facebookIcon} alt="facebook" className="jobpost-previous-icon-fb" style={{ width: '22px', cursor: 'pointer' }} />
                <img src={twitterIcon} alt="twitter" className="jobpost-previous-icon-x" style={{ width: '22px', cursor: 'pointer' }} />
              </div>
            </div>
            <div className="jobpost-previous-btn-group">
              <button className="jobpost-previous-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
              <button className="jobpost-previous-btn-post" onClick={handleFinalPost}>Post</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobPreview;