package com.cdr.dq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.dq.model.DqJobRunStatistics;
import com.cdr.dq.model.DqMatrix;
import com.cdr.dq.repository.DqJobRunRepository;
import com.cdr.dq.repository.DqMatrixRepository;

@Service
public class DqCheckServiceImpl implements DqCheckService {
	
	@Autowired
	DqMatrixRepository dqMatrixRepository;
	
	@Autowired
	DqJobRunRepository dqJobRunRepository;

	@Override
	public List<DqMatrix> getDqMatrixDetails() {
		return dqMatrixRepository.findAll();
	}

	@Override
	public List<DqJobRunStatistics> getDqJobRunDetails() {
		return dqJobRunRepository.findAll();
	}

}
