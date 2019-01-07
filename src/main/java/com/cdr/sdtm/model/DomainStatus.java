package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="domain_status_metadata")
@Table(name="domain_status_metadata")
public class DomainStatus {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="Id")
	private Integer id;

	@Column(name="Domain_Status")
	private String domainStatus;
	
	@Column(name="Domain_Status_Description")
	private String domainStatusDescription;
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

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
