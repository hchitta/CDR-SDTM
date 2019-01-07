package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="dq_status_metadata")
@Table(name="dq_status_metadata")
public class DqStatusMetadata {
	
	@Id
	@Column(name="dq_status_name")
	private String dqStatusName;
	
	@Column(name="dq_status_description")
	private String dqStatusDescription;

	public String getDqStatusName() {
		return dqStatusName;
	}

	public void setDqStatusName(String dqStatusName) {
		this.dqStatusName = dqStatusName;
	}

	public String getDqStatusDescription() {
		return dqStatusDescription;
	}

	public void setDqStatusDescription(String dqStatusDescription) {
		this.dqStatusDescription = dqStatusDescription;
	}
	
	

}
