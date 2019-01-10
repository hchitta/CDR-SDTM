package com.cdr.dq.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.dq.model.DqJobRunStatistics;
import com.cdr.dq.model.DqMatrix;
import com.cdr.dq.service.DqCheckService;

@RestController
@RequestMapping("/api/CDR/DQ")
public class DqCheckController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DqCheckController.class);
	
	@Autowired
	DqCheckService dqCheckService;
	
	
	@RequestMapping(value = "/dqMatrix/search", method = RequestMethod.GET)
	public List<DqMatrix> getDqMatrices(@RequestParam(value="form",required=false) String form,
			@RequestParam(value="study",required=false) String study,
			@RequestParam(value="category",required=false) String category,
			@RequestParam(value="check",required=false) String check,
			@RequestParam(value="status",required=false) String status,
			@RequestParam(value="therapeuticArea",required=false) String therapeuticArea) {
		LOGGER.info("DQ  Matrix search method - STARTS");
		List<DqMatrix> dqMatrices = new ArrayList<DqMatrix>();
		dqMatrices = dqCheckService.getDqMatrixDetails();
		LOGGER.info("DQ  Matrix search method - ENDS");
		return dqMatrices;	
	}
	
	
	@RequestMapping(value = "/dqMatrix/jobs", method = RequestMethod.GET)
	public List<DqJobRunStatistics> getDqJobs() {
		LOGGER.info("DQ  Matrix jobs method - STARTS");
		List<DqJobRunStatistics> dqMatrixJobs = new ArrayList<DqJobRunStatistics>();
		dqMatrixJobs = dqCheckService.getDqJobRunDetails();
		LOGGER.info("DQ  Matrix jobs method - ENDS");
		return dqMatrixJobs;	
	}
	
	@RequestMapping(value = "/dqMatrix/filter/jobs", method = RequestMethod.GET)
	public List<DqJobRunStatistics> getDqFilterJobs(@RequestParam(value="form",required=false) String form,
			@RequestParam(value="study",required=false) String study,
			@RequestParam(value="category",required=false) String category,
			@RequestParam(value="check",required=false) String check,
			@RequestParam(value="status",required=false) String status,
			@RequestParam(value="variable",required=false) String variable) {
		LOGGER.info("DQ  Matrix filter jobs method - STARTS");
		List<DqJobRunStatistics> dqMatrixJobs = new ArrayList<DqJobRunStatistics>();
		DqJobRunStatistics jobRunStat = new DqJobRunStatistics(study, form, category, check, variable, status);
		dqMatrixJobs = dqCheckService.getDqJobRunDetails(jobRunStat);
		LOGGER.info("DQ  Matrix filter jobs method - ENDS");
		return dqMatrixJobs;	
	}


}
