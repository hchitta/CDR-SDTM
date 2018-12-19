package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

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

}
