package com.cdr.sdtm.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity(name="job_run_statistics")
@Table(name="job_run_statistics")
public class JobRunStatus {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="UNIQUE_ID")
	private Long job_id;
	
	@Column(name="STUDY")
	private String study;
	
	@Column(name="DOMAIN")
	private String domain;
	
	@Column(name="JOB_STATUS")
	private String job_status;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name="JOB_START_TIMESTAMP")
	private Timestamp job_start_timestamp;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name="JOB_END_TIMESTAMP")
	private Timestamp job_end_timestamp;
	
	@Column(name="MESSAGE")
	private String message;
	
	@Column(name="status")
	private String jobDisabled;
	
	
	public String getJobDisabled() {
		return jobDisabled;
	}

	public void setJobDisabled(String jobDisabled) {
		this.jobDisabled = jobDisabled;
	}

	public Long getJob_id() {
		return job_id;
	}

	public void setJob_id(Long job_id) {
		this.job_id = job_id;
	}

	public String getStudy() {
		return study;
	}

	public void setStudy(String study) {
		this.study = study;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getJob_status() {
		return job_status;
	}

	public void setJob_status(String job_status) {
		this.job_status = job_status;
	}

	public Timestamp getJob_start_timestamp() {
		return job_start_timestamp;
	}

	public void setJob_start_timestamp(Timestamp job_start_timestamp) {
		this.job_start_timestamp = job_start_timestamp;
	}

	public Timestamp getJob_end_timestamp() {
		return job_end_timestamp;
	}

	public void setJob_end_timestamp(Timestamp job_end_timestamp) {
		this.job_end_timestamp = job_end_timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	
	
}
