package com.cdr.dq.service;

import java.util.List;

import com.cdr.dq.model.DqJobRunStatistics;
import com.cdr.dq.model.DqMatrix;

public interface DqCheckService {
	
	List<DqMatrix> getDqMatrixDetails();
	
	List<DqJobRunStatistics> getDqJobRunDetails();

	List<DqJobRunStatistics> getDqJobRunDetails(DqJobRunStatistics jobRunStat);

}
