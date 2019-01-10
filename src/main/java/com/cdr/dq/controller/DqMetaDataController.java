package com.cdr.dq.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.dq.model.CategoryMetadata;
import com.cdr.dq.model.CheckMetadata;
import com.cdr.dq.model.DqJobStatusMetadata;
import com.cdr.dq.model.DqStatusMetadata;
import com.cdr.dq.service.DqMetaDataService;

@RestController
@RequestMapping("/api/CDR/DQ")
public class DqMetaDataController {
	
	@Autowired
	DqMetaDataService dqMetaDataService;
	
	/**
	 * Method fetches data quality categories metadata
	 * @return
	 */
	@GetMapping("/quality/categories")
	public List<CategoryMetadata> getCategoryMetaData() {
		List<CategoryMetadata> categories = new ArrayList<CategoryMetadata>();
		categories = dqMetaDataService.getCategoryMetadata();
		return categories;
	}
	
	
	/**
	 * Method fetches data quality checks metadata
	 * @return
	 */
	@GetMapping("/quality/checks")
	public List<CheckMetadata> getCheckMetaData() {
		List<CheckMetadata> checks = new ArrayList<CheckMetadata>();
		checks = dqMetaDataService.getCheckMetadata();
		return checks;
	}

	/**
	 * Method fetches data quality job status metadata
	 * @return
	 */
	@GetMapping("/quality/dqJobStatuses")
	public List<DqJobStatusMetadata> getDqJobStatusMetadata() {
		List<DqJobStatusMetadata> dqJobStatuses = new ArrayList<DqJobStatusMetadata>();
		dqJobStatuses = dqMetaDataService.getDqJobStatusMetadata();
		return dqJobStatuses;
	}
	
	/**
	 * Method fetches data quality status metadata
	 * @return
	 */
	@GetMapping("/quality/dqStatuses")
	public List<DqStatusMetadata> getDqStatusMetadata() {
		List<DqStatusMetadata> dqStatuses = new ArrayList<DqStatusMetadata>();
		dqStatuses = dqMetaDataService.getDqStatusMetadata();
		return dqStatuses;
	}
}
