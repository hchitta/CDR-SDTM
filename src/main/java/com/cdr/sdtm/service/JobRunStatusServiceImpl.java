package com.cdr.sdtm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.IJobRunStatus;
import com.cdr.sdtm.model.JobRunStatus;
import com.cdr.sdtm.repository.JobRunStatusRepository;

@Service
public class JobRunStatusServiceImpl implements JobRunStatusService {
	
	@Autowired
	JobRunStatusRepository jobRunStatusRepository;

	@Override
	public List<JobRunStatus> findByStudyAndDomain(String study, String domain) {
		return jobRunStatusRepository.findByStudyAndDomain(study, domain);
	}

	@Override
	public List<JobRunStatus> findByStudyAndDomains(String study, List<String> domains) {
		return jobRunStatusRepository.findByStudyAndDomains(study, domains);
	}

	@Override
	public List<IJobRunStatus> findByStudy(String study) {
		return jobRunStatusRepository.findByStudy(study);
	}
	
	@Override
	public int updateJobs(Long uniqueId,String jobDisabled) {
		return jobRunStatusRepository.updateJobs(uniqueId,jobDisabled); 
	}

}
