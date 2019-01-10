import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobItem } from '../Model/JobItem';

@Injectable({
  providedIn: 'root'
})
export class CheckconfigService {

  constructor(private http: HttpClient) {

  }

  getJobs() {
    return this.http.get<JobItem[]>(`/api/CDR/DQ/dqMatrix/jobs`);
  }

  public fetchDomainStatuses(): any {
    return this.http.get<any[]>(`/api/CDR/domain/statuses`);
}
  public fetchTherapeuticAreas(): any {
  return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
}
public fetchStudyTitles() {
  return this.http.get<any[]>(`/api/CDR/study/dropdown`);
}
public fetchStudyCategory() {
  return this.http.get<any[]>(`/api/CDR/DQ/quality/categories`);
}
public fetchStudyCheck() {
  return this.http.get<any[]>(`/api/CDR/DQ/quality/checks`);
}
public fetchStatus() {
  return this.http.get<any[]>('api/CDR/DQ/quality/dqJobStatuses');
}
public fetchForm() {
  return this.http.get<any[]>('api/CDR/lookup/sourceForms');
}
public fetchVariables(table: any) {
  return this.http.get<any[]>(`api/CDR/lookup/sourceVariables/${table}`);
}

public fetchStudiessBytherapeuticArea(therapeuticArea: any) {
  let params = new HttpParams();
  params =  params.set('therapeuticArea', therapeuticArea);
  return this.http.get<any[]>(`/api/CDR/study/ByTherapeuticArea`, {params: params});
}

filterDqChecks(searchDqChecks: any): any {
  let params = new HttpParams();
  if (searchDqChecks.study) {
    params =  params.set('study', searchDqChecks.study);
    }
    if (searchDqChecks.form) {
    params =  params.set('form', searchDqChecks.form);
    }
    if (searchDqChecks.category) {
    params =  params.set('category', searchDqChecks.category);
    }
    if (searchDqChecks.check) {
    params =  params.set('check', searchDqChecks.check);
    }
    if (searchDqChecks.variable) {
    params =  params.set('variable', searchDqChecks.variable);
    }
    if (searchDqChecks.status) {
        params =  params.set('status', searchDqChecks.status);
    }
return this.http.get<any[]>(`/api/CDR/DQ/dqMatrix/filter/jobs`, { params: params });
 }
}
