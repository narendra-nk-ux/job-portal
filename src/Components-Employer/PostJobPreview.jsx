import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostAJob from '../assets/PostAjob.png';
import ClockIcon from '../assets/opportunity_time.png';
import experience from '../assets/opportunity_bag.png'
import place from '../assets/opportunity_location.png'
import twitter from '../assets/socials-x.png'
import linkedin from '../assets/socials-linkedin.png'
import facebook from '../assets/socials-facebook.png'
import './PostJobPreview.css';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';

export const PostJobPreview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState('preview');

  if (!state) {
    return (
      <div className="jobpost-previous-error-screen" style={{ padding: "50px", textAlign: "center" }}>
        <h2>No job data found</h2>
        <button className="jobpost-previous-btn-cancel" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  const handleFinalPost = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        navigate('/Job-portal/Employer/Dashboard');
      }, 2000);
    }, 1500);
  };

  if (step === 'loading' || step === 'success') {
    return (
      <div className="jobpost-previous-preview-page-wrapper">
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
              {/* <button className="jobpost-previous-btn-post" style={{ marginTop: '30px' }} onClick={() => navigate('/Job-portal/Employer/Dashboard')}>
                Go to Dashboard
              </button> */}
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
              <h2 className="jobpost-previous-job-title-text">{state.jobTitle || "UX/UI Designer"}</h2>
              <p className="jobpost-previous-company-meta">Wipro • ⭐ 4.3 • 55k+ reviews</p>
            </div>
            <div className="jobpost-previous-company-logo-square">W</div>
          </div>

          <div className="jobpost-previous-info-grid-row">
            <div className="jobpost-previous-info-item-group">
              <div className="jobpost-previous-info-item">
                <img src={ClockIcon} alt="clock" className="jobpost-previous-icon"/>

                <span>{state.trainingMin || '3'} months training</span>
              </div>
              <div className="jobpost-previous-vertical-separator"></div>
              <div className="jobpost-previous-info-item">

                <span>₹ {state.salaryMin} - {state.salaryMax}/month</span>
              </div>
            </div>

            <div className="jobpost-previous-info-item">

              <img src={experience} alt="experience" className="jobpost-previous-icon"/>
              <span className="experience-text">
                {state.experience !== undefined && state.experience !== null ? (
                  String(state.experience)
                    .replace(/([0-9]+)/g, '  $1  ')
                    .replace(/([a-zA-Z])\s*([0-9])/g, '$1, $2')
                    .trim()
                ) : (
                  "Not specified"
                )}
                {!String(state.experience).toLowerCase().includes('year') && " years of experience"}
              </span>
            </div>

            <div className="jobpost-previous-info-item">

              <img src={place} alt="location" className="jobpost-previous-icon"/>
              <span>{state.city || 'Location not specified'}</span>
            </div>
          </div>

          <div className="jobpost-previous-tags-row">
            {Array.isArray(state.jobType) && state.jobType.length > 0 ? (
              state.jobType.map((type, index) => (
                <span key={index} className="jobpost-previous-job-type-tag">
                  {type}
                </span>
              ))
            ) : (
              <span className="jobpost-previous-job-type-tag">
                {state.jobType || "Not specified"}
              </span>
            )}

            <button className="jobpost-previous-suggest-link" type="button">
              Suggest more roles like this
            </button>
          </div>

          <div className="jobpost-previous-footer-meta-text">
            Posted: Just now | Openings: {state.vacancyMin || 1}  | Applicants: 0
          </div>
        </section>

        <section className="jobpost-previous-card jobpost-previous-details-info">
          <div className="jobpost-previous-highlights-callout">
            <h4>Job highlights</h4>
            <ul>
              <li>Candidates with {state.experience} experience preferred.</li>
              <li>Strong Communication Skills.</li>
            </ul>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Company Overview</h4>
            <p className="jobpost-previous-description-text">
              Driving Digital Transformation With Innovation And Intelligence. Founded in 1945, Wipro is a leading global information technology, consulting, and business process services company...
            </p>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Job description</h4>
            <p className="jobpost-previous-description-text">{state.description}</p>
          </div>

          <div className="jobpost-previous-section-block">
            <h4>Responsibilities</h4>
            <ul className="jobpost-previous-description-list">
              <li>Collaborate with product and development teams to define and implement innovative UI/UX solutions.</li>
              <li>Create wireframes, user flows, and high-fidelity designs.</li>
            </ul>
          </div>

          <div className="jobpost-previous-meta-info-grid">
            <p>
              <strong>Role:</strong> {Array.isArray(state.jobTitle) ? state.jobTitle.join(', ') : state.jobTitle || 'Not specified'}
            </p>

            <p>
              <strong>Industry Type:</strong> {Array.isArray(state.industry) ? state.industry.join(', ') : state.industry || 'Not specified'}
            </p>

            <p>
              <strong>Department:</strong> {Array.isArray(state.category) ? state.category.join(' /  ') : state.category || 'Not specified'}
            </p>

            <p>
              <strong>Job Type:</strong> {Array.isArray(state.jobType) ? state.jobType.join(', ') : state.jobType || 'Not specified'}
            </p>

            <p>
              <strong>Experience level:</strong> {Array.isArray(state.experience) ? state.experience.join(',  ') : String(state.experience || 'Not specified')}
            </p>

            <p>
              <strong>Qualification:</strong> {Array.isArray(state.education) ? state.education.join(',   ') : state.education || 'Not specified'}
            </p>

            <p>
              <strong>Location:</strong> {state.city && state.country
                ? `${Array.isArray(state.city) ? state.city.join(', ') : state.city}, ${Array.isArray(state.country) ? state.country.join(', ') : state.country}`
                : 'Location not specified'}
            </p>
          </div>

          <div className="jobpost-previous-skills-section">
            <h4>Key Skills</h4>
            <div className="jobpost-previous-skills-container">
              {state.skills ? state.skills.split(',').map((skill, i) => (
                <span key={i} className="jobpost-previous-skill-pill">{skill.trim()}</span>
              )) : <span className="jobpost-previous-skill-pill">Not specified</span>}
            </div>
          </div>

          <div className="jobpost-previous-footer-actions">
            <div className="jobpost-previous-social-sharing">
              <span>Share this job:</span>
              <div className="jobpost-previous-social-icons" style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
 
                <img src={linkedin} alt="linkedin" className="jobpost-previous-icon-in"/>
                <img src={facebook} alt="facebook" className="jobpost-previous-icon-fb"/>
                <img src={twitter} alt="twitter" className="jobpost-previous-icon-x"/>
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
