package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="study_source_metadata")
@Table(name="study_source_metadata")
public class StudySource {
	
	@Id
	@Column(name="Study_Source")
	private String source;
	
	@Column(name="Study_Source_Description")
	private String sourceDescription;

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getSourceDescription() {
		return sourceDescription;
	}

	public void setSourceDescription(String sourceDescription) {
		this.sourceDescription = sourceDescription;
	}
	
	

}
