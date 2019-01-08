package com.cdr.dq.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.dq.model.CategoryMetadata;
import com.cdr.dq.model.CheckMetadata;
import com.cdr.dq.model.DqJobStatusMetadata;
import com.cdr.dq.model.DqStatusMetadata;
import com.cdr.dq.repository.CategoryRepository;
import com.cdr.dq.repository.CheckRepository;
import com.cdr.dq.repository.DqJobStatusRepository;
import com.cdr.dq.repository.DqStatusRepository;

@Service
public class DqMetaDataServiceImpl implements DqMetaDataService{
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	CheckRepository checkRepository;
	
	@Autowired
	DqJobStatusRepository dqJobStatusRepository;
	
	@Autowired
	DqStatusRepository dqStatusRepository;

	@Override
	public List<CategoryMetadata> getCategoryMetadata() {
		return categoryRepository.findAll();
	}

	@Override
	public List<CheckMetadata> getCheckMetadata() {
		return checkRepository.findAll();
	}

	@Override
	public List<DqJobStatusMetadata> getDqJobStatusMetadata() {
		return dqJobStatusRepository.findAll();
	}

	@Override
	public List<DqStatusMetadata> getDqStatusMetadata() {
		return dqStatusRepository.findAll();
	}

}
