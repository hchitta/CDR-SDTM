package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="domain_status_metadata")
@Table(name="domain_status_metadata")
public class DomainStatus {
	
	@Id
	@Column(name="Domain_Status")
	private String domainStatus;
	
	@Column(name="Domain_Status_Description")
	private String domainStatusDescription;

	public String getDomainStatus() {
		return domainStatus;
	}

	public void setDomainStatus(String domainStatus) {
		this.domainStatus = domainStatus;
	}

	public String getDomainStatusDescription() {
		return domainStatusDescription;
	}

	public void setDomainStatusDescription(String domainStatusDescription) {
		this.domainStatusDescription = domainStatusDescription;
	}
	
	
}
