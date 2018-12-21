package com.cdr.sdtm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.IJobRunStatus;
import com.cdr.sdtm.model.JobRunStatus;
import com.cdr.sdtm.service.JobRunStatusService;

@RestController
@RequestMapping("/api/CDR")
public class JobRunStatusController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JobRunStatusController.class);
	
	@Autowired
	JobRunStatusService jobRunStatusService;
	
	@GetMapping("/jobs/{study}/{domain}")
	public List<JobRunStatus> findByStudyAndDomain(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Jobs requested for study: " + study + "And  Domain: " + domain);
		return jobRunStatusService.findByStudyAndDomain(study, domain);
	}
	
	@GetMapping("/jobStatus/{study}/{domains}")
	public List<JobRunStatus> findByStudyAndDomains(@PathVariable String study, @PathVariable List<String> domains) {
		return jobRunStatusService.findByStudyAndDomains(study, domains);
	}
	
	@GetMapping("/jobsForStudy/{study}")
	public List<IJobRunStatus> findByStudy(@PathVariable String study) {
		LOGGER.info("Jobs requested for study: " + study);
		return jobRunStatusService.findByStudy(study);
	}
	
	@PutMapping("/updateJobs/{uniqueId}/{jobDisabled}")
	public ResponseEntity<String> updateJobs(@PathVariable Long uniqueId,@PathVariable String jobDisabled, @RequestBody JobRunStatus jobRunStatus) {
		LOGGER.info("Jobs to be updated for uniqueId " + uniqueId + " and jobDisabled "+ jobDisabled);
		int isUpdated = jobRunStatusService.updateJobs(uniqueId,jobDisabled);
		if(isUpdated > 0) {
			LOGGER.info("Job updated successfully.");
			return new ResponseEntity<>("Job has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating job.");
			return new ResponseEntity<>("Job not found", HttpStatus.NOT_FOUND); 
		}
	}


}
