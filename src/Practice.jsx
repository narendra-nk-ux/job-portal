const postJob = (newJobData, userType) => {

        const newId = jobs.length > 0 ? Math.max(...jobs.map(j => Number(j.id))) + 1 : 1;
        const stringId = String(newId);
        
        const postingSource = userType === "employer" ? "Company Jobs" : "Consultant Jobs";
        const tagsource = newJobData.jobCategory || "Full-time";

        const industryList = Array.isArray(newJobData.industry) ? newJobData.industry : ["IT Services"];
        const deptList = Array.isArray(newJobData.department) ? newJobData.department : ["Engineering"];
        const eduList = Array.isArray(newJobData.education) ? newJobData.education : ["Any Graduate"];
        const skillsList = Array.isArray(newJobData.skills) ? newJobData.skills : [];
        const highlightsList = Array.isArray(newJobData.highlights) ? newJobData.highlights : [];
        const responsibilitiesList = Array.isArray(newJobData.responsibilities) ? newJobData.responsibilities : [];
 
        const title = newJobData.jobTitle || "Untitled Position";
        const company = newJobData.companyName || "Your Company";
        const companyId = newJobData.companyId || `COMP${newId}`;
        const logo = newJobData.companyLogo || null;
        const workType = newJobData.workMode || "On-site";
        const shift = newJobData.shift || "General";
        const duration = newJobData.employmentType || "Full-time";
        const salary = newJobData.salaryRange || "Not Disclosed";
        const exp = newJobData.expRequired || "0";
        const loc = newJobData.jobLocation || "Remote";
        const openings = parseInt(newJobData.vacancies) || 1;
        const companyOverview = newJobData.aboutCompany || "No overview provided.";
        const description = newJobData.description || "No description provided.";

       //properties 
        const newJob = {
            id: stringId,
            title: title,
            company: company,
            companyId: companyId,
            logo: logo, 
            posted: getFormattedDate(),
            PostedBy: postingSource,

            IndustryType: industryList,
            Department: deptList,
            WorkType: workType,
            Shift: shift,
            duration: duration,

            ratings: 0, 
            reviewNo: 0,
            salary: salary,
            experience: exp,
            location: loc,
            openings: openings,
            applicants: 0,
            tags: [tagsource],

            EducationRequired: eduList,
            KeySkills: skillsList,

            JobHighlights: highlightsList,
            companyOverview: companyOverview,
            jobDescription: description,
            Responsibilities: responsibilitiesList
        };

        //  STATE UPDATE 
        setJobs((prev) => [newJob, ...prev]);
        
        
        alert('Job "${title}" posted successfully!');
    };