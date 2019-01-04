package com.cdr.sdtm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.DomainStatus;

public interface DomainStatusRepository extends JpaRepository<DomainStatus, String> {

}
