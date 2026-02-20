import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EHeader } from './EHeader';
import { Footer } from '../Components-LandingPage/Footer';
import './PostJobForm.css';

export const PostJobForm = () => {
  const navigate = useNavigate();

  const [manualExp, setManualExp] = useState('');

  const handleManualExpChange = (e) => {
    const value = e.target.value;
    setManualExp(value);
  };

  const categoryOptions = ["Aerospace & Defense", "Ai/MI", "Analytics", "Artificial Intelligence", "Automotive", "Big Data", "Biotechnology", "Business Consulting", "Business Intelligence", "Cloud Computing", "Cloud Services", "Construction", "Consulting", "Consumer Goods", "Consumer Tech", "Corporate", "Corporate Functions", "Customer Support", "Cybersecurity", "Data Infrastructure", "Data Science", "Design", "Digital Marketing", "Digital Media", "E-Commerce", "Ed-Tech", "Energy", "Enterprise Software", "Entertainment", "Finance", "Financial Services", "Fintech!!", "Fmcg", "Healthcare", "Hospital", "Hr Services", "Human Resources", "Internet", "It Consulting", "It Networking", "IT Services", "Logistics", "Marketing", "Marketing & Advertising", "Martech", "Mobile App Development", "Mobile Development", "Pharmaceutical", "Pharma", "Product Development", "Project Management", "Real Estate", "Recruitment", "Regional Sales", "Renewable Power", "Research", "Retail", "Retail Tech", "Saas", "Sales", "Site Reliability Engineering", "Software Development", "Software Product", "Software Testing", "Subscription Service", "Supply Chain", "Technology", "Telecommunications"];
  const experienceOptions = ["Fresher", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years", "8 Years", "9 Years", "10 Years", "11 Years", "12 Years", "13 Years", "14 Years", "15 Years", "16 Years", "17 Years", "18 Years", "19 Years", "20 Years"];
  const educationOptions = ["BS (2)", "B.A (23)", "CA (28)", "B.Ed (2)", "M.Com (6)", "B.Sc (132)", "MCA (280)", "BCA (119)", "LLM (70)", "MS/M.Sc (Science) (134)", "Diploma (34)", "B.Com (15)", "M.Tech (301)", "MBA/PGDM (136)", "PG Diploma (21)", "B.B.A/ B.M.S (27)", "Medical-MS/MD (10)", "B.Tech/B.E. (1865)", "Any Graduate (4607)", "Other Post Graduate (8)", "ITI Certification (2)", "Any Postgraduate (4541)", "Graduation Not Required (25)", "Post Graduation Not Required (50)", "Bachelor Of Science (B.Sc.) In Business Economics (2)" ];

  const [formData, setFormData] = useState({
    jobTitle: '',
    category: [],
    experience: [],
    education: [],
    skills: '',
    industry: '',
    jobType: [],
    salaryMin: '',
    salaryMax: '',
    city: '',
    state: '',
    country: '',
    pin: '',
    trainingMin: '',
    trainingMax: '',
    vacancyMin: '',
    vacancyMax: '',
    description: ''
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
    ...formData,
    experience: manualExp 
      ? [...formData.experience, manualExp] 
      : formData.experience
  };


    navigate('/Job-portal/Employer/PostJobpreview', { state: submissionData });
    
  };

  return (
    <div className="jobpost-page-title">
      <EHeader />
      <main className="jobpost-main-content">
        <header className="jobpost-form-header">
          <h1>Post a Job</h1>
          <p>Complete the steps below to reach thousands of qualified candidates</p>
        </header>

        <div className="jobpost-form-container">
          <form className="jobpost-form" onSubmit={handleSubmit}>

            {/* Job Title */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Job title</label>
              <input className="jobpost-input" type="text" name="jobTitle" placeholder="e.g., Fullstack Developer" onChange={handleChange} />
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
                    <input type="checkbox" onChange={() => handleCheckboxChange('category', 'all', categoryOptions)}
                      checked={formData.category.length === categoryOptions.length && categoryOptions.length > 0} />
                    <strong>Select all</strong>
                  </label>
                  <div className="jobpost-options-grid">
                    {categoryOptions.map(cat => (
                      <label key={cat} className="jobpost-option-item">
                        <input type="checkbox" checked={formData.category.includes(cat)} onChange={() => handleCheckboxChange('category', cat)} /> {cat}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Dropdown */}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Experience</label>
              <div className={`jobpost-dropdown ${openDropdown === 'experience' ? 'jobpost-is-active' : ''}`}>
                <div className="jobpost-dropdown-trigger" onClick={() => toggleDropdown('experience')}>
                  {/* Logic to show if either checkbox or manual text is selected */}
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
                        /> {exp}
                      </label>
                    ))}

                    {/* Manual Input Section - Positioned as per your image */}
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

            {/* Education Dropdown */}
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
                        <input type="checkbox" checked={formData.education.includes(edu)} onChange={() => handleCheckboxChange('education', edu)} /> {edu}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Key skills</label>
              <input className="jobpost-input" type="text" name="skills" placeholder="React, Node.js, etc." onChange={handleChange} />
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Industry</label>
              <input className="jobpost-input" type="text" name="industry" placeholder="IT Services" onChange={handleChange} />
            </div>

            {/* Job Type */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Job type</label>
              <div className="jobpost-checkbox-group">
                {['Full time', 'Part time', 'Hybrid', 'Remote'].map(type => (
                  <label key={type} className="jobpost-checkbox-label">
                    <input type="checkbox" name="jobType" value={type} onChange={handleChange} /> {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Salary</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item"><span>From</span><input className="jobpost-input" type="text" name="salaryMin" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>To</span><input className="jobpost-input" type="text" name="salaryMax" onChange={handleChange} /></div>
              </div>
            </div>

            {/* Location */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Location</label>
              <div className="jobpost-boxed-container jobpost-grid-2-rows">
                <div className="jobpost-grid-item"><span>City</span><input className="jobpost-input" type="text" name="city" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>State</span><input className="jobpost-input" type="text" name="state" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>Country</span><input className="jobpost-input" type="text" name="country" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>Pin</span><input className="jobpost-input" type="text" name="pin" onChange={handleChange} /></div>
              </div>
            </div>

            {/* Training and Vacancy */}
            <div className="jobpost-form-row">
              <label className="jobpost-label">Training period</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item"><span>From</span><input className="jobpost-input" type="date" name="trainingMin" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>To</span><input className="jobpost-input" type="date" name="trainingMax" onChange={handleChange} /></div>
              </div>
            </div>

            <div className="jobpost-form-row">
              <label className="jobpost-label">Vacancy duration</label>
              <div className="jobpost-boxed-container jobpost-grid-2">
                <div className="jobpost-grid-item"><span>From</span><input className="jobpost-input" type="date" name="vacancyMin" onChange={handleChange} /></div>
                <div className="jobpost-grid-item"><span>To</span><input className="jobpost-input" type="date" name="vacancyMax" onChange={handleChange} /></div>
              </div>
            </div>

            {/* Description */}
            <div className="jobpost-form-row jobpost-top-align">
              <label className="jobpost-label">Job description</label>
              <textarea className="jobpost-textarea" name="description" placeholder="Describe the role..." onChange={handleChange}></textarea>
            </div>

            <div className="jobpost-actions">
              <button type="button" className="jobpost-btn-cancel" onClick={() => navigate('/jobportal')}>Cancel</button>
              <button type="submit" className="jobpost-btn-post">Preview</button>
            </div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
