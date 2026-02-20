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
            isJobSaved
        }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => useContext(JobContext);