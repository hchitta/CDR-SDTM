package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="study_type_metadata")
@Table(name="study_type_metadata")
public class StudyType {
	
	@Id
	@Column(name="Study_Type")
	private String type;
	
	@Column(name="Study_Type_Description")
	private String typeDescription;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTypeDescription() {
		return typeDescription;
	}

	public void setTypeDescription(String typeDescription) {
		this.typeDescription = typeDescription;
	}

}
