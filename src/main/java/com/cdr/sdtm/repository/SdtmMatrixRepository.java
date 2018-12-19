package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cdr.sdtm.model.PathToSdtmDashBoard;
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
			" Domain_Label,CONCAT(Domain_Label, ' (', Domain_Name, ') ') AS SDTM_DOMAIN, CONCAT(Form_Label, ' (', Form_Name, ') ') AS SOURCE_FORM ,MAX(Join_Criteria) AS JOIN_LOGIC" + 
			" FROM SDTM.path_to_sdtm_matrix_2 a " + 
			" WHERE Form_Label <> ''" + 
			" AND Study_Title=:study and Domain_Name=:domain " + 
			" GROUP BY Domain_Label,CONCAT(Form_Label, ' (', Form_Name, ') ')" + 
			" ORDER BY MAX(Join_Criteria)  ASC")
	List<Object[]> fetchObjectLevelByStudyAndDomain(@Param("study") String study,@Param("domain") String domain);
	
	
	
	@Query(nativeQuery=true,value="Select \r\n" + 
			"               DISTINCT\r\n" + 
			"               a.Study_ID AS studyID,a.Study_Title AS studyTitle,a.Study_Description AS studyDescription,a.Study_Phase AS studyPhase, a.Db_Lock_Date AS dbLockDate,a.Study_Analyst AS studyAnalyst,a.Study_Manager as studyManager \r\n" + 
			"               ,a.Initial_Creation_Date AS studySetUpdate, a.Study_Status AS studyStatus,b.Domain_Name as domainName,b.Domain_Status as domainStatus,b.Current_Domain_Version AS currentDomainVersion,f.Latest_Domain_Version AS lastDomainVersion \r\n" + 
			"               , e.Count_Of_Domains AS countOfDomains, f.Count_Of_All_Domains AS countOfAllDomains \r\n" + 
			"               ,CASE WHEN c.domain is NOT NULL THEN b.Domain_Label END AS jobDomainName,c.job_status AS jobStatus\r\n" + 
			"               ,d.Last_job_Run AS lastJobRun \r\n" + 
			"               , CASE WHEN c.status = 'Y' THEN 'Enabled' \r\n" + 
			"                       WHEN c.status = 'N' THEN 'Disabled' \r\n" + 
			"               END AS jobEnablementStatus \r\n" + 
			"\r\n" + 
			"        from SDTM.study_metadata a\r\n" + 
			"\r\n" + 
			"        left outer join\r\n" + 
			"        (\r\n" + 
			"        Select a.Study_Title,a.Domain_Name,a.Domain_label,a.Domain_Status,MAX(a.Version) AS Current_Domain_Version \r\n" + 
			"        from SDTM.path_to_sdtm_matrix_2 a\r\n" + 
			"        group by a.Study_Title,a.Domain_Name,a.Domain_label,a.Domain_Status\r\n" + 
			"        )b\r\n" + 
			"        on a.Study_Title =b.Study_Title\r\n" + 
			"\r\n" + 
			"        left outer join\r\n" + 
			"        (\r\n" + 
			"        Select distinct a.study,a.domain,a.job_status,a.status-- ,a.job_end_timestamp as Job_Run_DateTime\r\n" + 
			"        from SDTM.job_run_statistics a\r\n" + 
			"        )c\r\n" + 
			"        on a.Study_Title = c.study\r\n" + 
			"        and b.Domain_Name = c.domain \r\n" + 
			"\r\n" + 
			"        left outer join\r\n" + 
			"        (       \r\n" + 
			"        Select study , MAX(job_end_timestamp) as Last_job_Run from SDTM.job_run_statistics group by study       \r\n" + 
			"        )d\r\n" + 
			"        on a.Study_Title = d.study\r\n" + 
			"\r\n" + 
			"        left outer join\r\n" + 
			"        (\r\n" + 
			"        Select a.Study_Title,count(distinct a.Domain_Name) as Count_Of_Domains\r\n" + 
			"        from SDTM.path_to_sdtm_matrix_2 a\r\n" + 
			"        where Domain_Status = 'Approved'\r\n" + 
			"        group by a.Study_Title\r\n" + 
			"        )e\r\n" + 
			"        on a.Study_Title = e.Study_title\r\n" + 
			"\r\n" + 
			"        inner join\r\n" + 
			"        (\r\n" + 
			"        Select COUNT(DISTINCT Domains) AS Count_Of_All_Domains,MAX(Version) AS Latest_Domain_Version from SDTM.study_domain_metadata\r\n" + 
			"        )f\r\n" + 
			"        on 1=1;\r\n" + 
			"")
	List<PathToSdtmDashBoard> fetchDashBoardData();
	

}
