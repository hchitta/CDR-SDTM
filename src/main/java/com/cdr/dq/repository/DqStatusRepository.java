package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.DqStatusMetadata;

@Repository
public interface DqStatusRepository  extends JpaRepository<DqStatusMetadata, String> {

}
