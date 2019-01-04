package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.Domain;
import com.cdr.sdtm.model.LookUp;
import com.cdr.sdtm.model.PathToSdtmDashBoard;
import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.model.TherapeuticAreas;
import com.cdr.sdtm.model.Transformation;
import com.cdr.sdtm.service.LookUpService;
import com.cdr.sdtm.service.SdtmMatrixService;

@RestController
@RequestMapping("/api/CDR")
public class SdtmMatrixController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SdtmMatrixController.class);
	
	@Autowired
	SdtmMatrixService sdtmMatrixService;
	@Autowired
	LookUpService lookUpService; 
	
	
	@PostMapping("/matrix/create")
	public ResponseEntity<String> saveMatrix(@RequestBody PathToSdtmMatrix matrix) {
		PathToSdtmMatrix newMatrix = sdtmMatrixService.createMatrix(matrix);
		if(newMatrix != null) {
			LOGGER.info("matrix created successfully.");
			return new ResponseEntity<>("matrix has been created", HttpStatus.OK);
		} else {
			LOGGER.info("Error while creating matrix.");
			return new ResponseEntity<>("Error while matrix creation",HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/matrix/update/{id}")
	public ResponseEntity<String> updateMatrix(@PathVariable Long id, @RequestBody PathToSdtmMatrix pathToSdtmMatrix) {
		boolean isUpdated = sdtmMatrixService.updateMatrix(pathToSdtmMatrix, id);
		if(isUpdated) {
			LOGGER.info("Matrix updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@RequestMapping(value = "/matrix/delete/{matrixId}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStudy(@PathVariable Long matrixId) {
		boolean isDeleted = sdtmMatrixService.deleteById(matrixId);
		if(isDeleted) {
			LOGGER.info("Matrix deleted successfully.");
			return new ResponseEntity<>("Matrix has been deleted", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while deleting Matrix.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/matrix/{study}/{domain}")
	public List<PathToSdtmMatrix> findByDomain(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Method Starts requested template for domain " + domain +" And Study " + study);
		List<PathToSdtmMatrix> matrices = new ArrayList<PathToSdtmMatrix>();
		 matrices = sdtmMatrixService.findByStudyAndDomain(study,domain);
		LOGGER.info("Method Ends."+ matrices.size());
		return matrices;
		
	}
	
	@RequestMapping(value = "/matrix/search", method = RequestMethod.GET)
	public List<PathToSdtmMatrix> getmatrices(@RequestParam(value="StudId",required=false) String studyID,
			@RequestParam(value="StudDomain",required=false) String domain) {
		LOGGER.info("Search matrix method - STARTS");
		List<PathToSdtmMatrix> matrices = new ArrayList<PathToSdtmMatrix>();
		PathToSdtmMatrix matrix = new PathToSdtmMatrix(studyID,domain);
		matrices = sdtmMatrixService.findAll(matrix);
		LOGGER.info("Search matrix method - ENDS");
		return matrices;	
	}
	
	/**
	 * Method fetches available transformation types for business rules config 
	 *        screen from Transformation table
	 * @return
	 */
	@GetMapping("/matrix/transformations")
	public List<Transformation> getAllTransformations() {
		List<Transformation> transTypes = new ArrayList<Transformation>();
		transTypes = sdtmMatrixService.getTransTypes();
		return transTypes;
	}
	
	/**
	 * Method fetches available transformation types for business rules config 
	 *        screen from Transformation table
	 * @return
	 */
	@GetMapping("/matrix/therapeutics")
	public List<TherapeuticAreas> getAllTherapeuticAreas() {
		List<TherapeuticAreas> therapeuticAreas = new ArrayList<TherapeuticAreas>();
		therapeuticAreas = sdtmMatrixService.getAllTherapeuticAreas();
		return therapeuticAreas;
	}
	
	/**
	 * Method fetches distinct studies from path_to_sdtm_matrix table 
	 *       for business rules config screen - import study dropdown.
	 * @return
	 */
	@RequestMapping(value = "/matrix/importStudy", method = RequestMethod.GET)
	public List<String> getDistinctStudies() {
		LOGGER.info("Distinct Study method - STARTS");
		List<String> studies = new ArrayList<String>();
		studies = sdtmMatrixService.findDistinctStudies();
		LOGGER.info("Search Study method - ENDS"); 
		return studies;
	}
	
	@GetMapping("/busRules/domains/{study}")
	public List<Domain> findDomainByStudy(@PathVariable String study) {
		List<Domain> domains = new ArrayList<Domain>();
		domains = sdtmMatrixService.findDomainByStudy(study);
		return domains;
	}

	@GetMapping("/matrix/checkOverride/{newStudy}/{study}/{domains}")
	public ResponseEntity<List<String>> checkForDomains(@PathVariable String newStudy, @PathVariable String study, @PathVariable List<String> domains) {
		List<String> existingDomains = new ArrayList<String>();
		List<PathToSdtmMatrix> matrices = null;
		for(String domain : domains) {
			matrices = sdtmMatrixService.findByStudyAndDomain(newStudy,domain);
				if(matrices != null && matrices.size() > 0) {
					existingDomains.add(domain);
				} 
		}
		return new ResponseEntity<>(existingDomains, HttpStatus.OK);
	}
	
	
	@GetMapping("/matrix/fetchOrInsert/{newStudy}/{study}/{domains}")
	public List<PathToSdtmMatrix> importData(@PathVariable String newStudy, @PathVariable String study, @PathVariable List<String> domains) {
		List<PathToSdtmMatrix> matrices,insertMatrices = null;
		List<PathToSdtmMatrix> allMatrices = new ArrayList<PathToSdtmMatrix>();
		PathToSdtmMatrix matrix = null;
		
		for(String domain : domains) { 
				matrices = sdtmMatrixService.findByStudyAndDomain(newStudy,domain);
					if(matrices != null && matrices.size() > 0) {
						   int deleted = sdtmMatrixService.deleteMatricesByStudyandDomain(newStudy, domain);
						   LOGGER.info("Business rules deleted for study " + newStudy + " and domain " + domain + ". Deleted entries:" + deleted);
						   matrices = null;
						   //allMatrices.addAll(matrices); 
					} //else {
							matrices = sdtmMatrixService.findByStudyAndDomain(study,domain);
							if(matrices != null && matrices.size() > 0) {
									insertMatrices = new ArrayList<PathToSdtmMatrix>();
									for(PathToSdtmMatrix template : matrices) {
										matrix = new PathToSdtmMatrix();
										matrix.setStudy(newStudy);
										matrix.setDomain(template.getDomain());
										matrix.setDomainLabel(template.getDomainLabel());
										matrix.setDomainNameExt(template.getDomainNameExt());
										matrix.setSubDomain(template.getSubDomain());
										matrix.setFormName(template.getFormName());
										matrix.setFormLable(template.getFormLable());
										matrix.setFormExt(template.getFormExt());
										matrix.setTargetField(template.getTargetField());
										matrix.setTargetFile(template.getTargetFile());
										matrix.setSourceFile(template.getSourceFile());
										matrix.setSourceField(template.getSourceField());
										matrix.setJoinLogic(template.getJoinLogic());
										matrix.setTransformation_type(template.getTransformation_type());
										matrix.setTransformation_logic(template.getTransformation_logic());
										matrix.setBack_transformation_logic(template.getBack_transformation_logic());
										matrix.setDomainStatus("Not Started");
										matrix.setRuleFlag(template.getRuleFlag());
										matrix.setNotes(template.getNotes());
										insertMatrices.add(matrix);
									}
									allMatrices.addAll(sdtmMatrixService.saveMatrixForDomain(insertMatrices));
							}
				  // }
		}
		return allMatrices;
	}
	
	
	/**
	 * Method fetches available source files and source variables from LOOK UP table
	 * @return
	 */
	@GetMapping("/lookup/sourcetables")
	public List getAllSourceFiles() {
		List lookup = new ArrayList<>();
		List<LookUp> sourceTables = new ArrayList<LookUp>();
		List<String> tables = new ArrayList<String>();
		sourceTables = lookUpService.findAll();
		tables = lookUpService.findDistinctTables();
		lookup.add(sourceTables);
		lookup.add(tables);
		return lookup;
	}
	
	
	/**
	 * Method fetches distinct target variables from path_to_sdtm_matrix table 
	 *       for business rules config screen edit -  SDTM variables dropdown.
	 * @return
	 */
	@RequestMapping(value = "/matrix/targetVariables", method = RequestMethod.GET)
	public List<String> getDistinctSDTMVariables() {
		LOGGER.info("Distinct SDTM Variables method - STARTS");
		List<String> targetVariables = new ArrayList<String>();
		targetVariables = sdtmMatrixService.findDistinctSDTMVariables();
		LOGGER.info("Distinct SDTM Variables method - ENDS"); 
		return targetVariables;
	}
	
	
	@GetMapping("/ObjectMatrices/{study}/{domain}")
	public List findObjectandVariableMatrices(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Method Starts requested template for domain " + domain +" And Study " + study);
		List lookup = new ArrayList<>();
		List<Object[]> matrices = new ArrayList<Object[]>();
		matrices = sdtmMatrixService.fetchObjectLevelByStudyAndDomain(study, domain);
		lookup.add(matrices);
		List<PathToSdtmMatrix> matricesTwo = new ArrayList<PathToSdtmMatrix>();
		PathToSdtmMatrix matrix = new PathToSdtmMatrix(study,domain);
		matricesTwo = sdtmMatrixService.findAll(matrix);
		lookup.add(matricesTwo);
		return lookup;
	}
	
	@GetMapping("/pathToSdtmDashBoard")
	public List<PathToSdtmDashBoard> fetchPathToSdtmHomeDashBoard() {
		return sdtmMatrixService.fetchDashBoardData();
	}
	
	@PutMapping("/matrix/updateDomainStatus/{study}/{domain}/{status}")
	public ResponseEntity<String> updateDomainStatus(@PathVariable String study, @PathVariable String domain, @PathVariable String status) {
		int isUpdated = sdtmMatrixService.updateDomainStatus(study, domain, status);
		if(isUpdated > 0) {
			LOGGER.info("Matrix Status updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix status.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/matrix/updateRuleFlag/{id}/{flag}")
	public ResponseEntity<String> updateRuleFlag(@PathVariable Long id, @PathVariable String flag) {
		int isUpdated = sdtmMatrixService.updateRuleFlag(id, flag);
		if(isUpdated > 0) {
			LOGGER.info("Matrix Flag updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix flag.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PutMapping("/matrix/updateNotesForRules")
	public ResponseEntity<String> updateNotesForRules(@RequestParam(value="study",required=false) String study,
			@RequestParam(value="domain",required=false) String domain,
			@RequestParam(value="selectedRules",required=false) List<Long> selectedRules,
			@RequestParam(value="isAllRulesSelected",required=false) boolean isAllRulesSelected,
			@RequestParam(value="notes",required=false) String notes) {
		int isUpdated = sdtmMatrixService.updateNotesForRules(study,domain,selectedRules,isAllRulesSelected,notes);
		if(isUpdated > 0) {
			LOGGER.info("Matrix notes updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix notes.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/matrix/updateFlagsForRules")
	public ResponseEntity<String> updateFlagsForRules(@RequestParam(value="study",required=false) String study,
			@RequestParam(value="domain",required=false) String domain,
			@RequestParam(value="selectedRules",required=false) List<Long> selectedRules,
			@RequestParam(value="isAllRulesSelected",required=false) boolean isAllRulesSelected,
			@RequestParam(value="notes",required=false) String notes) {
		int isUpdated = sdtmMatrixService.updateFlagsForRules(study,domain,selectedRules,isAllRulesSelected,notes);
		if(isUpdated > 0) {
			LOGGER.info("Matrix Flags updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix flags.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}

}
