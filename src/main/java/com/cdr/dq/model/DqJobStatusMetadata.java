package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="dq_job_status_metadata")
@Table(name="dq_job_status_metadata")
public class DqJobStatusMetadata {
	
	@Id
	@Column(name="dq_job_status_name")
	private String dqJobStatusName;
	
	@Column(name="dq_job_status_description")
	private String dqJobStatusDescription;

	public String getDqJobStatusName() {
		return dqJobStatusName;
	}

	public void setDqJobStatusName(String dqJobStatusName) {
		this.dqJobStatusName = dqJobStatusName;
	}

	public String getDqJobStatusDescription() {
		return dqJobStatusDescription;
	}

	public void setDqJobStatusDescription(String dqJobStatusDescription) {
		this.dqJobStatusDescription = dqJobStatusDescription;
	}

	
}
