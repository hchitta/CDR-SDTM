package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="ta_metadata")
@Table(name="ta_metadata")
public class TherapeuticAreas {
	
	@Id
	@Column(name="Therapeutic_Area_Code")
	private String therapeuticCode;
	
	@Column(name="Therapeutic_Area_Description")
	private String therapeuticDescription;

	public String getTherapeuticCode() {
		return therapeuticCode;
	}

	public void setTherapeuticCode(String therapeuticCode) {
		this.therapeuticCode = therapeuticCode;
	}

	public String getTherapeuticDescription() {
		return therapeuticDescription;
	}

	public void setTherapeuticDescription(String therapeuticDescription) {
		this.therapeuticDescription = therapeuticDescription;
	}

	
	
	
	

}
