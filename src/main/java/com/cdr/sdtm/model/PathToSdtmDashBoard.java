package com.cdr.sdtm.model;

public interface PathToSdtmDashBoard {
	
	String getStudyID();
	
	String getStudyTitle();
	
	String getStudyDescription();
	
	String getStudyPhase();
	
	String getDbLockDate();
	
	String getStudyAnalyst();
	
	String getStudyManager();
	
	String getStudySetUpdate();
	
	String getStudyStatus();
	
	String getDomainName();
	
	String getDomainStatus();
	
	String getCurrentDomainVersion();
	
	String getLastDomainVersion();
	
	String getCountOfDomains();
	
	String getCountOfAllDomains();
	
	String getJobDomainName();
	
	String getJobStatus();
	
	String getLastJobRun();
	
	String getJobEnablementStatus();

}
