package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.DqJobStatusMetadata;

@Repository
public interface DqJobStatusRepository extends JpaRepository<DqJobStatusMetadata, String>  {

}
