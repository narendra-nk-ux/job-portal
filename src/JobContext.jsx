import React, { createContext, useState, useContext } from 'react';
import { JobList } from './JobList';

const JobContext = createContext();

export const JobProvider = ({ children }) => {

    const [jobs, setJobs] = useState(JobList);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);

    const getFormattedDate = () => {
        return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    const isJobSaved = (jobId) => savedJobs.some((j) => j.id === jobId);



   // In postjob preview similar jobs
    const getSuggestedJobs = (currentTitle, currentCategory) => {
        if (!currentTitle && !currentCategory) return [];

        const targetTitle = typeof currentTitle === 'string' ? currentTitle.toLowerCase().trim() : "";
        const targetCategory = typeof currentCategory === 'object'
            ? (currentCategory?.label || (Array.isArray(currentCategory) ? currentCategory[0] : "") || "")
            : (currentCategory || "");
        const normalizedTargetCat = targetCategory.toString().toLowerCase().trim();

        
        const stopWords = ['and', 'the', 'for', 'with', 'from', 'senior', 'junior', 'lead'];
        const keywords = targetTitle
            .split(/[\s,/-]+/)
            .filter(word => word.length > 2 && !stopWords.includes(word));

        return jobs.map(job => {
            if (!job?.jobTitle) return { ...job, relevance: 0 };

            let score = 0;
            const jobTitle = job.jobTitle.toLowerCase();
            const jobCat = (job.category || "").toString().toLowerCase();

            
            if (jobTitle === targetTitle) return { ...job, relevance: 0 };

           
            if (normalizedTargetCat !== "" && jobCat.includes(normalizedTargetCat)) score += 15;

            
            keywords.forEach(word => {
                if (jobTitle.includes(word)) score += 10;
            });

            
            if (targetTitle !== "" && (jobTitle.includes(targetTitle) || targetTitle.includes(jobTitle))) score += 5;

            return { ...job, relevance: score };
        })
            .filter(job => job.relevance > 0) 
            .sort((a, b) => b.relevance - a.relevance) 
            .slice(0, 10);
    };


    //Company Overview 
    const [companyProfile, setCompanyProfile] = useState({
        name: "Wipro", // Default for now
        overview: "Leading global information technology, consulting and business process services company.",
        website: "www.wipro.com",
        logo: "W"
    });

    // 1. Post a New Job
    const postJob = (newJobData) => {
        const newJob = {
            ...newJobData,
            id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
            postedDate: getFormattedDate(),
            createdAt: new Date().toISOString(),
        };
        setJobs((prev) => [newJob, ...prev]);
        alert(`Job "${newJob.jobTitle}" posted successfully!`);
    };

    // 2. Edit an Existing Job
    const editJob = (jobId, updatedData) => {
        setJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job))
        );

        // Also update saved jobs if the edited job was saved
        setSavedJobs((prev) =>
            prev.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job))
        );
        alert(`Job "${updatedData.jobTitle}" updated successfully!`);
    };

    const applyForJob = (originalJob) => {
        const newAppliedJob = {
            ...originalJob,
            appliedDate: `Applied on ${getFormattedDate()}`,
            status: { text: 'Hiring in Progress', type: 'progress' },
            // other 2 options for Status:
            // status= {text: 'Reviewing Application', type: 'reviewing'},
            // status= {text: 'Hiring Done', type: 'done'},

            applicationStatus: [

                { label: 'Application Submitted', sub: "Your profile, resume, and cover letter have successfully entered the company's database, and an acknowledgment has been sent.", status: 'completed' },

                { label: 'Resume Screening', sub: "Your resume is currently being reviewed (either by an automated system or a screener) to ensure your skills and qualifications match the core job requirements.", status: 'pending' },

                { label: 'Recruiter Review', sub: "A hiring manager manually reviews your specific experience, portfolio, and background to determine potential fit for the role.", status: 'pending' },

                { label: 'Shortlisted', sub: "You have passed the initial review stages and have been flagged as a top contender among the applicant pool.", status: 'pending' },

                { label: 'Interview Called', sub: "The hiring team has officially reached out to schedule a meeting, moving your status from 'Review' to active 'Engagement.'", status: 'pending' },

            ]
        };

        setAppliedJobs((prev) => [...prev, newAppliedJob]);
        setJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));

        alert(`Successfully applied to ${originalJob.title} at ${originalJob.company}!`);
    };

    const toggleSaveJob = (originalJob) => {
        if (isJobSaved(originalJob.id)) {
            setSavedJobs((prev) => prev.filter((j) => j.id !== originalJob.id));
        } else {
            const newSavedJob = {
                ...originalJob,
                savedDate: `Saved on ${getFormattedDate()}`
            };
            setSavedJobs((prev) => [...prev, newSavedJob]);
        }
    };

    return (
        <JobContext.Provider value={{
            jobs,
            appliedJobs,
            savedJobs,
            setAppliedJobs,
            setJobs,
            applyForJob,
            toggleSaveJob,
            isJobSaved,

            postJob,
            editJob,

            getSuggestedJobs,
            companyProfile,
            setCompanyProfile
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);