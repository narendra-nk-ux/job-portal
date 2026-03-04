import React, { useState } from 'react';
import './PostedJobs.css';
import place from '../assets/opportunity_location.png'
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../JobContext';

export const PostedJobs = ({ onViewApplicants }) => {
  const navigate = useNavigate();

  const { jobs, setJobs } = useJobs();

  //   const [jobs, setJobs] = useState([
  //   { id: 1, jobTitle: 'UI/UX Designer', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 0, rejected: 3 },
  //   { id: 2, jobTitle:'Front End Developer', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 3, jobTitle:'Scrum Master', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 4, jobTitle: 'Team Lead', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 5, jobTitle: 'Tester', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 6, jobTitle: 'IT Analyst', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 7, jobTitle: 'IT Coordinator', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 },
  //   { id: 8, jobTitle: 'Systems Administrator', location: 'Coimbatore', date: '24/01/2026', applicants: 20, new: 15, reviewed: 12, hired: 5, rejected: 3 }
  // ]);

  const [activeMenu, setActiveMenu] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleEditClick = (job) => {
    setActiveMenu(null);
    navigate('/Job-portal/Employer/EditJob', { state: job });
  };

  const handleDeleteClick = (id) => {
    setSelectedJobId(id);
    setShowDeleteModal(true);
    setActiveMenu(null);
  };

  const confirmDelete = () => {
    setJobs(jobs.filter(job => job.id !== selectedJobId));
    setShowDeleteModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="postedjobs-container">
      <h2 className="postedjobs-header">Jobs posted by you</h2>
      {/* <h2>{jobs.length}</h2> */}

      <div className="postedjobs-grid-layout postedjobs-table-header">
        <div />
        <span className="postedjobs-label">Applicants</span>
        <span className="postedjobs-label">New</span>
        <span className="postedjobs-label">Reviewed</span>
        <span className="postedjobs-label">Hired</span>
        <span className="postedjobs-label">Rejected</span>
        <div />
      </div>

      <div className="postedjobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="postedjobs-grid-layout postedjobs-card">
            <div className="postedjobs-info">
              <h3>{job.title || title}</h3>

              <p className="postedjobs-loc flex items-center gap-2">
                <img src={place} alt="location" className="post-job-locationicon1" />
                {job.location}
              </p>
              <small>Created on: {job.postedDate || job.date}</small>
            </div>

            <span className="postedjobs-badge">{job.applicants || 0}</span>
            <span className="postedjobs-badge">{job.new || 0}</span>
            <span className="postedjobs-badge">{job.reviewed || 0}</span>
            <span className="postedjobs-badge">{job.hired || 0}</span>
            <span className="postedjobs-badge">{job.rejected || 0}</span>

            <div className="postedjobs-actions">
              {/* <button className="postedjobs-view-btn" onClick={() => onViewApplicants(job)}>View applicants</button> */}
              <button
                className="postedjobs-view-btn"
                onClick={() => onViewApplicants(job)}
              >
                View applicants
              </button>
              <div className="postedjobs-menu-wrapper">
                <button onClick={() => toggleMenu(job.id)} className="postedjobs-dots">⋮</button>
                {activeMenu === job.id && (
                  <div className="postedjobs-dropdown">
                    <button onClick={() => handleEditClick(job)}>Edit</button>
                    <button onClick={() => handleDeleteClick(job.id)} className="delete-opt">Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>


      {showDeleteModal && (
        <div className="postedjobs-modal-overlay">
          <div className="postedjobs-modal">
            <p>Do you want to remove this job post?</p>
            <div className="postedjobs-modal-btns">
              <button onClick={() => setShowDeleteModal(false)} className="postedjobs-btn-cancel">Cancel</button>
              <button onClick={confirmDelete} className="postedjobs-btn-delete">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="postedjobs-toast">
          Your job post has been removed <span className="close-icon" onClick={() => setShowSuccessToast(false)}>⊗</span>
        </div>
      )}
    </div>
  );
};
