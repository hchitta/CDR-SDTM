package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.DomainStatus;
import com.cdr.sdtm.model.FormVariablesMetaData;
import com.cdr.sdtm.model.StudyPhase;
import com.cdr.sdtm.model.StudySource;
import com.cdr.sdtm.model.StudyStatus;
import com.cdr.sdtm.model.StudyType;
import com.cdr.sdtm.service.SdtmMetaDataService;

@RestController
@RequestMapping("/api/CDR")
public class SdtmMetaDataController {
	
	@Autowired
	SdtmMetaDataService sdtmMetaDataService;
	
	/**
	 * Method fetches study phase metadata
	 * @return
	 */
	@GetMapping("/study/phases")
	public List<StudyPhase> getPhaseMetaData() {
		List<StudyPhase> phases = new ArrayList<StudyPhase>();
		phases = sdtmMetaDataService.getStudyPhaseMetaData();
		return phases;
	}
	
	/**
	 * Method fetches study sources
	 * @return
	 */
	@GetMapping("/study/sources")
	public List<StudySource> getSourceMetaData() {
		List<StudySource> sources = new ArrayList<StudySource>();
		sources = sdtmMetaDataService.getStudySourceMetaData();
		return sources;
	}
	
	/**
	 * Method fetches study types
	 * @return
	 */
	@GetMapping("/study/types")
	public List<StudyType> getTypeMetaData() {
		List<StudyType> types = new ArrayList<StudyType>();
		types = sdtmMetaDataService.getStudyTypeMetaData();
		return types;
	}
	
	/**
	 * Method fetches study statuses
	 * @return
	 */
	@GetMapping("/study/statuses")
	public List<StudyStatus> getStausMetaData() {
		List<StudyStatus> statues = new ArrayList<StudyStatus>();
		statues = sdtmMetaDataService.getStudyStatusMetaData();
		return statues;
	}
	
	
	/**
	 * Method fetches available source forms from form_variables_metadata table
	 * @return
	 */
	@GetMapping("/lookup/sourceForms")
	public List<FormVariablesMetaData> getAllSourceFiles() {
		List<FormVariablesMetaData> formData = new ArrayList<FormVariablesMetaData>();
		formData = sdtmMetaDataService.findDistinctForms();
		return formData;
	}
	
	
	/**
	 * Method fetches source variables based on source form from form_variables_metadata table
	 * @param formName
	 * @return
	 */
	@GetMapping("/lookup/sourceVariables/{formName}")
	public List<FormVariablesMetaData> findDomainByStudy(@PathVariable String formName) {
		List<FormVariablesMetaData> formVariables = new ArrayList<FormVariablesMetaData>();
		formVariables = sdtmMetaDataService.findFieldsByForm(formName);
		return formVariables;
	}
	
	/**
	 * Method fetches study statuses
	 * @return
	 */
	@GetMapping("/domain/statuses")
	public List<DomainStatus> getDomainStausMetaData() {
		List<DomainStatus> statues = new ArrayList<DomainStatus>();
		statues = sdtmMetaDataService.getDomainStatusMetaData();
		return statues;
	}
	

}
