import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import './EditJob.css'; 

export const EditJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingJob = location.state || {};

 
  const categoryOptions = ["Aerospace & Defense", "Ai/MI", "Analytics", "Artificial Intelligence", "Automotive", "Big Data", "Biotechnology", "Business Consulting", "Business Intelligence", "Cloud Computing", "Cloud Services", "Construction", "Consulting", "Consumer Goods", "Consumer Tech", "Corporate", "Corporate Functions", "Customer Support", "Cybersecurity", "Data Infrastructure", "Data Science", "Design", "Digital Marketing", "Digital Media", "E-Commerce", "Ed-Tech", "Energy", "Enterprise Software", "Entertainment", "Finance", "Financial Services", "Fintech!!", "Fmcg", "Healthcare", "Hospital", "Hr Services", "Human Resources", "Internet", "It Consulting", "It Networking", "IT Services", "Logistics", "Marketing", "Marketing & Advertising", "Martech", "Mobile App Development", "Mobile Development", "Pharmaceutical", "Pharma", "Product Development", "Project Management", "Real Estate", "Recruitment", "Regional Sales", "Renewable Power", "Research", "Retail", "Retail Tech", "Saas", "Sales", "Site Reliability Engineering", "Software Development", "Software Product", "Software Testing", "Subscription Service", "Supply Chain", "Technology", "Telecommunications"];
  
  const experienceOptions = ["Fresher", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years", "8 Years", "9 Years", "10 Years", "11 Years", "12 Years", "13 Years", "14 Years", "15 Years", "16 Years", "17 Years", "18 Years", "19 Years", "20 Years"];
  
  const educationOptions = ["BS (2)", "B.A (23)", "CA (28)", "B.Ed (2)", "M.Com (6)", "B.Sc (132)", "MCA (280)", "BCA (119)", "LLM (70)", "MS/M.Sc (Science) (134)", "Diploma (34)", "B.Com (15)", "M.Tech (301)", "MBA/PGDM (136)", "PG Diploma (21)", "B.B.A/ B.M.S (27)", "Medical-MS/MD (10)", "B.Tech/B.E. (1865)", "Any Graduate (4607)", "Other Post Graduate (8)", "ITI Certification (2)", "Any Postgraduate (4541)", "Graduation Not Required (25)", "Post Graduation Not Required (50)", "Bachelor Of Science (B.Sc.) In Business Economics (2)" ];

  const [formData, setFormData] = useState({
    jobTitle: existingJob.title || '',
    category: existingJob.category || [],
    experience: existingJob.experience || [],
    education: existingJob.education || [],
    skills: existingJob.skills || '',
    industry: existingJob.industry || '',
    jobType: existingJob.jobType || [],
    salaryMin: existingJob.salaryMin || '',
    salaryMax: existingJob.salaryMax || '',
    city: existingJob.city || existingJob.location || '',
    state: existingJob.state || '',
    country: existingJob.country || '',
    pin: existingJob.pin || '',
    trainingMin: existingJob.trainingMin || '',
    trainingMax: existingJob.trainingMax || '',
    vacancyMin: existingJob.vacancyMin || '',
    vacancyMax: existingJob.vacancyMax || '',
    description: existingJob.description || ''
  });

  const [manualExp, setManualExp] = useState(existingJob.manualExp || '');
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

  const handleCheckboxChange = (name, value, allOptions = []) => {
    setFormData(prev => {
      const currentList = prev[name];
      if (value === "all") {
        const isAllSelected = currentList.length === allOptions.length;
        return { ...prev, [name]: isAllSelected ? [] : allOptions };
      }
      const newList = currentList.includes(value)
        ? currentList.filter(i => i !== value)
        : [...currentList, value];
      return { ...prev, [name]: newList };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'jobType') {
      const newList = checked
        ? [...formData.jobType, value]
        : formData.jobType.filter(t => t !== value);
      setFormData(prev => ({ ...prev, [name]: newList }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleManualExpChange = (e) => {
    setManualExp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      experience: manualExp ? [...formData.experience, manualExp] : formData.experience,
      title: formData.jobTitle, 
      location: formData.city 
    };
    navigate('/Job-portal/Employer/PostJobpreview', { state: submissionData });
  };

  return (
    <div className="jobpost-page-title"> 
      <EHeader />
      <main className="edit-job-main">
        <header className="jobpost-form-header">
          <h1>Edit a Job</h1>
          {/* <p>Update the details below to keep your job post accurate</p> */}
          <p> Complete the steps below to reach thousands of qualified candidates </p>
        </header>

        <div className="jobpost-form-container">
          <form className="jobpost-form" onSubmit={handleSubmit}>

            {/* Job Title */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Job title</label>
              <input 
                className="jobpost-input" 
                type="text" 
                name="jobTitle" 
                placeholder="e.g., Fullstack Developer" 
                value={formData.jobTitle}
                onChange={handleChange} 
              />
            </div>

            {/* Category Dropdown */}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Category/Department</label>
              <div className={`jobpost-dropdown ${openDropdown === 'category' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('category')}>
                  {formData.category.length > 0 ? `${formData.category.length} Selected` : 'Select Category'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>
                <div className="jobpost-dropdown-panel">
                  <label className="jobpost-select-all">
                    <input 
                      type="checkbox" 
                      onChange={() => handleCheckboxChange('category', 'all', categoryOptions)}
                      checked={formData.category.length === categoryOptions.length && categoryOptions.length > 0} 
                    />
                    <strong>Select all</strong>
                  </label>
                  <div className="jobpost-options-grid">
                    {categoryOptions.map(cat => (
                      <label key={cat} className="jobpost-option-item">
                        <input 
                          type="checkbox" 
                          checked={formData.category.includes(cat)} 
                          onChange={() => handleCheckboxChange('category', cat)} 
                        /> 
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Experience</label>
              <div className={`jobpost-dropdown ${openDropdown === 'experience' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('experience')}>
                  {formData.experience.length > 0 || manualExp
                    ? `${formData.experience.length + (manualExp ? 1 : 0)} Selected`
                    : 'Select Experience'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>
                <div className="jobpost-dropdown-panel">
                  <div className="jobpost-options-grid">
                    {experienceOptions.map(exp => (
                      <label key={exp} className="jobpost-option-item">
                        <input
                          type="checkbox"
                          checked={formData.experience.includes(exp)}
                          onChange={() => handleCheckboxChange('experience', exp)}
                        /> 
                        {exp}
                      </label>
                    ))}
                    <div className="jobpost-manual-exp-container">
                      <span className="jobpost-manual-label">For {'>'}20 years</span>
                      <input
                        type="text"
                        className="jobpost-manual-input"
                        placeholder="Enter experience"
                        value={manualExp}
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleManualExpChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education*/}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Education</label>
              <div className={`jobpost-dropdown ${openDropdown === 'education' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('education')}>
                  {formData.education.length > 0 ? `${formData.education.length} Selected` : 'Select Education'}
                  <i className="fas fa-angle-down jobpost-arrow"></i>
                </div>
                <div className="jobpost-dropdown-panel">
                  <div className="jobpost-options-grid">
                    {educationOptions.map(edu => (
                      <label key={edu} className="jobpost-option-item">
                        <input 
                          type="checkbox" 
                          checked={formData.education.includes(edu)} 
                          onChange={() => handleCheckboxChange('education', edu)} 
                        /> 
                        {edu}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Key skills</label>
              <input 
                className="jobpost-input" 
                type="text" 
                name="skills" 
                placeholder="React, Node.js, etc." 
                value={formData.skills}
                onChange={handleChange} 
              />
            </div>

            {/* Industry */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Industry</label>
              <input 
                className="jobpost-input" 
                type="text" 
                name="industry" 
                placeholder="IT Services" 
                value={formData.industry}
                onChange={handleChange} 
              />
            </div>

            {/* Job Type */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Job type</label>
              <div className="jobpost-checkbox-group">
                {['Full time', 'Part time', 'Hybrid', 'Remote'].map(type => (
                  <label key={type} className="jobpost-checkbox-label">
                    <input 
                      type="checkbox" 
                      name="jobType" 
                      value={type} 
                      checked={formData.jobType.includes(type)}
                      onChange={handleChange} 
                    /> 
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Salary</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item">
                  <span>From</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="salaryMin" 
                    value={formData.salaryMin}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>To</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="salaryMax" 
                    value={formData.salaryMax}
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Location</label>
              <div className="jobpost-boxed-container jobpost-grid-2-rows">
                <div className="jobpost-grid-item">
                  <span>City</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="city" 
                    value={formData.city}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>State</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="state" 
                    value={formData.state}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>Country</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="country" 
                    value={formData.country}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>Pin</span>
                  <input 
                    className="jobpost-input" 
                    type="text" 
                    name="pin" 
                    value={formData.pin}
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            {/* Training Period */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Training period</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item">
                  <span>From</span>
                  <input 
                    className="jobpost-input" 
                    type="date" 
                    name="trainingMin" 
                    value={formData.trainingMin}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>To</span>
                  <input 
                    className="jobpost-input" 
                    type="date" 
                    name="trainingMax" 
                    value={formData.trainingMax}
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            {/* Vacancy Duration */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Vacancy duration</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item">
                  <span>From</span>
                  <input 
                    className="jobpost-input" 
                    type="date" 
                    name="vacancyMin" 
                    value={formData.vacancyMin}
                    onChange={handleChange} 
                  />
                </div>
                <div className="jobpost-grid-item">
                  <span>To</span>
                  <input 
                    className="jobpost-input" 
                    type="date" 
                    name="vacancyMax" 
                    value={formData.vacancyMax}
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Job description</label>
              <textarea 
                className="jobpost-textarea" 
                name="description" 
                placeholder="Describe the role..." 
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Actions */}
            <div className="jobpost-actions">
              <button type="button" className="jobpost-btn-cancel" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="jobpost-btn-post">Preview</button>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

