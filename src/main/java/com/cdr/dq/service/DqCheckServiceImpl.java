package com.cdr.dq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import com.cdr.dq.model.DqJobRunStatistics;
import com.cdr.dq.model.DqMatrix;
import com.cdr.dq.repository.DqJobRunRepository;
import com.cdr.dq.repository.DqMatrixRepository;

@Service
public class DqCheckServiceImpl implements DqCheckService {
	
	public static final String ALL = "all";
	
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

	@Override
	public List<DqJobRunStatistics> getDqJobRunDetails(DqJobRunStatistics jobRunStat) {
		if(ALL.equalsIgnoreCase(jobRunStat.getStudy())) {
			jobRunStat.setStudy(null);
		}
		if(ALL.equalsIgnoreCase(jobRunStat.getForm())) {
			jobRunStat.setForm(null);
		}
		if(ALL.equalsIgnoreCase(jobRunStat.getCategory())) {
			jobRunStat.setCategory(null);
		}
		if(ALL.equalsIgnoreCase(jobRunStat.getCheck())) {
			jobRunStat.setCheck(null);
		}
		if(ALL.equalsIgnoreCase(jobRunStat.getVariable())) {
			jobRunStat.setVariable(null);
		}
		if(ALL.equalsIgnoreCase(jobRunStat.getJobStatus())) {
			jobRunStat.setJobStatus(null);
		}
		
		ExampleMatcher matcher = ExampleMatcher.matching()
											   .withIgnoreNullValues()
											   .withStringMatcher(StringMatcher.CONTAINING)
											   .withIgnorePaths("uniqueId");
		
		Example<DqJobRunStatistics> example = Example.of(jobRunStat, matcher);
		
		return dqJobRunRepository.findAll(example);
	}

}
