package com.cdr.dq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="dq_matrix")
@Table(name="dq_matrix")
public class DqMatrix {
	
	@Id
	@Column(name="library")
	private String library;
	
	@Column(name="category")
	private String category;
	
	@Column(name="check")
	private String check;
	
	@Column(name="form")
	private String form; 
	
	@Column(name="variable")
	private String variable;
	
	@Column(name="input")
	private String input;
	
	@Column(name="dq_status")
	private String dq_status;
	
	@Column(name="create_date")
	private String createDate;
	
	@Column(name="update_date")
	private String updateDate;

	public String getLibrary() {
		return library;
	}

	public void setLibrary(String library) {
		this.library = library;
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

	public String getForm() {
		return form;
	}

	public void setForm(String form) {
		this.form = form;
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

	public String getDq_status() {
		return dq_status;
	}

	public void setDq_status(String dq_status) {
		this.dq_status = dq_status;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	

}
