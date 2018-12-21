package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.cdr.sdtm.model.IJobRunStatus;
import com.cdr.sdtm.model.JobRunStatus;

public interface JobRunStatusRepository extends JpaRepository<JobRunStatus, Long>{
	
	List<JobRunStatus> findByStudyAndDomain(String study, String domain);
	
	@Query(nativeQuery=true,value="select * FROM job_run_statistics where study=:study and domain in (:domains)")
	List<JobRunStatus> findByStudyAndDomains(@Param("study") String study, @Param("domains") List<String> domains);

	@Query(nativeQuery=true,value="select b.Domain_Label as domain,a.unique_id as jobId,a.status as jobDisabled,a.study,a.job_end_timestamp as jobEndTimeStamp,a.job_start_timestamp as jobStartTimeStamp,a.job_status as jobStatus,a.message,a.domain as domainCode from SDTM.job_run_statistics a,SDTM.path_to_sdtm_matrix_2 b where \r\n" + 
			"a.study=b.study_title and\r\n" + 
			"a.domain=b.domain_name and\r\n" + 
			"a.study=:study\r\n" + 
			"group by b.domain_label")
	List<IJobRunStatus> findByStudy(String study);
	
	@Transactional
	@Modifying
	@Query(nativeQuery=true,value="update job_run_statistics set status=:jobDisabled where unique_id=:uniqueId")
	int updateJobs(@Param("uniqueId") Long uniqueId,@Param("jobDisabled") String jobDisabled); 

}
