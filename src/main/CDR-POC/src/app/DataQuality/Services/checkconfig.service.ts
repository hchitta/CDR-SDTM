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

}
