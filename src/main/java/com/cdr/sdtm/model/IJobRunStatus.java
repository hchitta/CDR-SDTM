package com.cdr.sdtm.model;

import java.sql.Timestamp;

public interface IJobRunStatus {
	
	
	Long getJobId();
	
	String getStudy();
	
	String getDomain();
	
	String getJobStatus();
	
	Timestamp getJobStartTimestamp();
	
	Timestamp getJobEndTimestamp();
	
	String getMessage();
	
	String getJobDisabled();
	
	String getDomainCode();

}
