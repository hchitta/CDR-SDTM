package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.DomainStatus;

public interface DomainStatusRepository extends JpaRepository<DomainStatus, Integer> {
	
	 List<DomainStatus> findAllByOrderByIdAsc();

}
