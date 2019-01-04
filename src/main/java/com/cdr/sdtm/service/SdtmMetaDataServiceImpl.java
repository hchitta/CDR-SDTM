package com.cdr.sdtm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.DomainStatus;
import com.cdr.sdtm.model.FormVariablesMetaData;
import com.cdr.sdtm.model.StudyPhase;
import com.cdr.sdtm.model.StudySource;
import com.cdr.sdtm.model.StudyStatus;
import com.cdr.sdtm.model.StudyType;
import com.cdr.sdtm.repository.DomainStatusRepository;
import com.cdr.sdtm.repository.FormVariableRepository;
import com.cdr.sdtm.repository.StudyPhaseRepository;
import com.cdr.sdtm.repository.StudySourceRepository;
import com.cdr.sdtm.repository.StudyStatusRepository;
import com.cdr.sdtm.repository.StudyTypeRepository;

@Service
public class SdtmMetaDataServiceImpl implements SdtmMetaDataService{
	
	@Autowired
	StudyTypeRepository studyTypeRepository;
	
	@Autowired
	StudyStatusRepository studyStatusRepository;
	
	@Autowired
	StudyPhaseRepository studyPhaseRepository;
	
	@Autowired
	StudySourceRepository studySourceRepository;
	
	@Autowired
	FormVariableRepository formVariableRepository;
	
	@Autowired
	DomainStatusRepository domainStatusRepository;

	@Override
	public List<StudyType> getStudyTypeMetaData() {
		return studyTypeRepository.findAll();
	}

	@Override
	public List<StudyStatus> getStudyStatusMetaData() {
		return studyStatusRepository.findAll();
	}

	@Override
	public List<StudySource> getStudySourceMetaData() {
		return studySourceRepository.findAll();
	}

	@Override
	public List<StudyPhase> getStudyPhaseMetaData() {
		return studyPhaseRepository.findAll();
	}

	@Override
	public List<FormVariablesMetaData> findFieldsByForm(String name) {
		return formVariableRepository.findFieldsByForm(name);
	}

	@Override
	public List<FormVariablesMetaData> findDistinctForms() {
		return formVariableRepository.findDistinctForms();
	}

	@Override
	public List<DomainStatus> getDomainStatusMetaData() {
		return domainStatusRepository.findAll();
	}
	
	

}
