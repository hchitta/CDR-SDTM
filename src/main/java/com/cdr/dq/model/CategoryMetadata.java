package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="category_metadata")
@Table(name="category_metadata")
public class CategoryMetadata {
	
	@Id
	@Column(name="category_name")
	private String categoryName;
	
	@Column(name="category_description")
	private String categoryDescription;

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	
	
}
