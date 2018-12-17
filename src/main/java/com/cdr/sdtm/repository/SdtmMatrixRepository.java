package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cdr.sdtm.model.PathToSdtmMatrix;

public interface SdtmMatrixRepository extends JpaRepository<PathToSdtmMatrix, Long>{
	 
	List<PathToSdtmMatrix> findByStudyAndDomain(String study, String domain);
	
	@Query(nativeQuery=true,value="select distinct Study_Title from path_to_sdtm_matrix_2 where Study_Title is not null order by Study_Title asc")
	List<String> findDistinctStudies();
	
	@Query(nativeQuery=true,value="select distinct Domain_Name,Domain_Label from path_to_sdtm_matrix_2 where Study_Title=:study and domain_name is not null and domain_label is not null order by Domain_Label asc")
	List<Object[]> findDomainByStudy(@Param("study") String study);
	
	@Query(nativeQuery=true,value="select distinct SDTM_Variable_Label from path_to_sdtm_matrix_2 where SDTM_Variable_Label is not null") 
	List<String> findDistinctSDTMVariables();
	
	@Transactional
	@Modifying
	@Query(nativeQuery=true,value="DELETE FROM path_to_sdtm_matrix_2 where study_title=:study and domain_name=:domain") 
	int deleteMatricesByStudyandDomain(@Param("study") String study,@Param("domain") String domain);
	
	List<PathToSdtmMatrix> findAll(Example exp);
	
	@Query(nativeQuery=true,value="Select distinct " + 
			" Domain_Label,CONCAT(Form_Label, ' (', Form_Name, ') ') AS FORM ,MAX(Join_Criteria)  AS JOIN_CRITERIA" + 
			" FROM SDTM.path_to_sdtm_matrix_2 a " + 
			" WHERE Form_Label <> ''" + 
			" AND Study_Title=:study and Domain_Name=:domain " + 
			" GROUP BY Domain_Label,CONCAT(Form_Label, ' (', Domain_Name, ') ')" + 
			" ORDER BY MAX(Join_Criteria)  ASC")
	List<Object[]> fetchObjectLevelByStudyAndDomain(@Param("study") String study,@Param("domain") String domain);

}
