package com.cdr.sdtm.service;

import java.util.List;

import com.cdr.sdtm.model.DomainStatus;
import com.cdr.sdtm.model.FormVariablesMetaData;
import com.cdr.sdtm.model.StudyPhase;
import com.cdr.sdtm.model.StudySource;
import com.cdr.sdtm.model.StudyStatus;
import com.cdr.sdtm.model.StudyType;

public interface SdtmMetaDataService {
	
	List<StudyType> getStudyTypeMetaData();
	
	List<StudyStatus> getStudyStatusMetaData();
	
	List<StudySource> getStudySourceMetaData();
	
	List<StudyPhase> getStudyPhaseMetaData();
	
	List<FormVariablesMetaData> findDistinctForms();
	
	List<FormVariablesMetaData> findFieldsByForm(String formName);

	List<DomainStatus> getDomainStatusMetaData();
}
