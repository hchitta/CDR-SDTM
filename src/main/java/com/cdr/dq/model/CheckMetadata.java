package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="check_metadata")
@Table(name="check_metadata")
public class CheckMetadata {
	

	@Id
	@Column(name="check_name")
	private String checkName;
	
	@Column(name="check_description")
	private String checkDescription;

	public String getCheckName() {
		return checkName;
	}

	public void setCheckName(String checkName) {
		this.checkName = checkName;
	}

	public String getCheckDescription() {
		return checkDescription;
	}

	public void setCheckDescription(String checkDescription) {
		this.checkDescription = checkDescription;
	}

	

}
