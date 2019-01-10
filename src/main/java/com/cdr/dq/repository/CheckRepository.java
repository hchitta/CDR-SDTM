package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.CheckMetadata;

@Repository
public interface CheckRepository extends JpaRepository<CheckMetadata, String> {

}