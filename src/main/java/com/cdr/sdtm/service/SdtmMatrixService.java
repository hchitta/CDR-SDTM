package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.PathVariable;

import com.cdr.sdtm.model.Domain;
import com.cdr.sdtm.model.PathToSdtmDashBoard;
import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.model.TherapeuticAreas;
import com.cdr.sdtm.model.Transformation;

public interface SdtmMatrixService {

	PathToSdtmMatrix saveMatrix(PathToSdtmMatrix pathToSdtmMatrix);
	
	public List<PathToSdtmMatrix> saveMatrixForDomain(List<PathToSdtmMatrix> matrices);
	
	List<PathToSdtmMatrix> findByStudyAndDomain(String study, String domain);

	boolean updateMatrix(PathToSdtmMatrix pathToSdtmMatrix, Long id);
	
	public Optional<PathToSdtmMatrix> findById(Long id);

	boolean deleteById(Long matrixId);
	
	int deleteMatricesByStudyandDomain(String study, String domain); 
	
	List<Transformation> getTransTypes();
	
	List<String> findDistinctStudies();
	
	List<Domain> findDomainByStudy(String study); 
	
	List<String> findDistinctSDTMVariables();

	List<PathToSdtmMatrix> findAll(PathToSdtmMatrix matrix);

	PathToSdtmMatrix createMatrix(PathToSdtmMatrix matrix);
	
	List<TherapeuticAreas> getAllTherapeuticAreas();
	
	List<Object[]> fetchObjectLevelByStudyAndDomain(String study, String domain);
	
	List<PathToSdtmDashBoard> fetchDashBoardData();

	int updateDomainStatus(String study, String domain, String status);

	int updateRuleFlag(Long id, String flag);

	int updateNotesForRules(String study, String domain, List<Long> selectedRules, boolean isAllRulesSelected,
			String notes);

	int updateFlagsForRules(String study, String domain, List<Long> selectedRules, boolean isAllRulesSelected,
			String notes);
	
	List<PathToSdtmMatrix> importBusinessRules(String newStudy, String study, List<String> domains);
	
	List<String> checkForDomains(String newStudy, List<String> domains);

}
