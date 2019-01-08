package com.cdr.dq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdr.dq.model.CategoryMetadata;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryMetadata, String> {

}
