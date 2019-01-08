package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.DqJobRunStatistics;

@Repository
public interface DqJobRunRepository extends JpaRepository<DqJobRunStatistics, Integer>  {

}
