package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="dq_job_run_statistics")
@Table(name="dq_job_run_statistics")
public class DqJobRunStatistics {
	
	@Id
	@Column(name="unique_id")
	private int uniqueId;
	
	@Column(name="study")
	private String study;
	
	@Column(name="form")
	private String form;
	
	@Column(name="category")
	private String category;
	
	@Column(name="check")
	private String check;
	
	@Column(name="variable")
	private String variable;
	
	@Column(name="input")
	private String input; 
	
	@Column(name="job_status")
	private String jobStatus;
	
	@Column(name="job_start_timestamp")
	private String jobStartTimestamp;
	
	@Column(name="job_end_timestamp")
	private String jobEndTimestamp;
	
	@Column(name="message")
	private String message;

	public int getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(int uniqueId) {
		this.uniqueId = uniqueId;
	}

	public String getStudy() {
		return study;
	}

	public void setStudy(String study) {
		this.study = study;
	}

	public String getForm() {
		return form;
	}

	public void setForm(String form) {
		this.form = form;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCheck() {
		return check;
	}

	public void setCheck(String check) {
		this.check = check;
	}

	public String getVariable() {
		return variable;
	}

	public void setVariable(String variable) {
		this.variable = variable;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getJobStatus() {
		return jobStatus;
	}

	public void setJobStatus(String jobStatus) {
		this.jobStatus = jobStatus;
	}

	public String getJobStartTimestamp() {
		return jobStartTimestamp;
	}

	public void setJobStartTimestamp(String jobStartTimestamp) {
		this.jobStartTimestamp = jobStartTimestamp;
	}

	public String getJobEndTimestamp() {
		return jobEndTimestamp;
	}

	public void setJobEndTimestamp(String jobEndTimestamp) {
		this.jobEndTimestamp = jobEndTimestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	

}
