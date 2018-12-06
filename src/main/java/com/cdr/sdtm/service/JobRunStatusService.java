package com.cdr.sdtm.service;

import java.util.List;

import com.cdr.sdtm.model.JobRunStatus;

public interface JobRunStatusService {
	
	List<JobRunStatus> findByStudyAndDomain(String study, String domain);
	
	List<JobRunStatus> findByStudyAndDomains(String study, List<String> domains);

	List<JobRunStatus> findByStudy(String study);
	
	int updateJobs(Long uniqueId, String jobDisabled); 


}
