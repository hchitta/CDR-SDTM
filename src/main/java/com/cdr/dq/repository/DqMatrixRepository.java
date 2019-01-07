package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.DqMatrix;

@Repository
public interface DqMatrixRepository extends JpaRepository<DqMatrix, String> {

}
