import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { JobItem } from '../Model/JobItem';

@Injectable({
  providedIn: 'root'
})
export class CheckconfigService {

  baseUrl: string = "http://localhost:8090/CDR/DQ/dqMatrix/jobs";

  constructor(private http: HttpClient) {

  }

  getJobs() {
    return this.http.get<JobItem[]>(`/api/CDR/DQ/dqMatrix/jobs`);
  }

  public fetchDomainStatuses(): any {
    return this.http.get<any[]>(`/api/CDR/domain/statuses`);
}
  public fetchTherapeuticAreas():any {
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
public fetchStatus(){
  return this.http.get<any[]>('api/CDR/DQ/quality/dqJobStatuses')
}
public fetchForm(){
  return this.http.get<any[]>('api/CDR/lookup/sourceForms')
}
public fetchVariable(){
  return this.http.get<any[]>('api/CDR/lookup/sourceVariables/{formName}')
}
}
