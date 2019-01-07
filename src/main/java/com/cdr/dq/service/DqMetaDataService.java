package com.cdr.dq.service;

import java.util.List;

import com.cdr.dq.model.CategoryMetadata;
import com.cdr.dq.model.CheckMetadata;
import com.cdr.dq.model.DqJobStatusMetadata;
import com.cdr.dq.model.DqStatusMetadata;

public interface DqMetaDataService {
	
	List<CategoryMetadata> getCategoryMetadata();
	
	List<CheckMetadata> getCheckMetadata();
	
	List<DqJobStatusMetadata> getDqJobStatusMetadata();
	
	List<DqStatusMetadata> getDqStatusMetadata();

}
