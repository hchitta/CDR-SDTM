import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'delete';
const IMPORT_ACTION = 'import';
const STATUS_ACTION = 'status';
const FLAG_ACTION = 'flag';

@Injectable()
export class BusinessEditService extends BehaviorSubject<any[]> {

    public fetchDomainStatuses(): any {
        return this.http.get<any[]>(`/api/CDR/domain/statuses`);
    }
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];
    public searchBRStudy: any = {};
    private res: any[] = [];

    public read(searchBRStudy) {
        this.fetch(searchBRStudy)
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public fetchStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/study/dropdown`);
    }
    public fetchMatrixStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/matrix/importStudy`);
    }
    public fetchDomainsByStudy(study: any) {
        return this.http.get<any[]>(`/api/CDR/busRules/domains/${study}`);
    }

    public fetchTransformationTypes() {
        return this.http.get<any[]>(`/api/CDR/matrix/transformations`);
    }

    public fetchLookUpData() {
        return this.http.get<any[]>(`/api/CDR/lookup/sourceForms`);
    }

    public fetchLookUpVariables(formName) {
        return this.http.get<any[]>(`/api/CDR/lookup/sourceVariables/${formName}`);
    }

    public fetchSDTMVariables() {
        return this.http.get<any[]>(`/api/CDR/matrix/targetVariables`);
    }

    public fetchTherapeuticAreas() {
        return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
    }

    public kendoDataFetch(study: any, domain: any) {
        return this.http.get<any[]>(`/api/CDR/ObjectMatrices/${study}/${domain}`);
    }

    public fetchStudiessBytherapeuticArea(therapeuticArea: any) {
        let params = new HttpParams();
        params =  params.set('therapeuticArea', therapeuticArea);
        return this.http.get<any[]>(`/api/CDR/study/ByTherapeuticArea`, {params: params});
    }

    public save(data: any, searchBRStudy, isNew?: any ) {
        let action = '';
        if (isNew === 'add') {
            action = CREATE_ACTION;
        } else if (isNew === 'edit') {
            action = UPDATE_ACTION;
        } else if (isNew === 'import') {
            action = IMPORT_ACTION;
        }
        this.reset();
        this.fetch(data, action)
          .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
    }

    public remove(data: any, searchBRStudy) {
        this.reset();
        this.fetch(data, REMOVE_ACTION)
            .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
    }

    private reset() {
        this.data = [];
    }

    private fetch(searchBRStudy, action: string = '', data?: any): Observable<any> {
        let params = new HttpParams();
        if (action === 'create') {
            const searchUrl = '/api/CDR/matrix/create';
            const url = `${searchUrl}`;
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
              return this.http.post(url, searchBRStudy, {headers: headers});
          } else if (action === 'update') {
                const updateUrl = '/api/CDR/matrix/update';
                const url = `${updateUrl}/${searchBRStudy.id}`;
                const body = JSON.stringify(searchBRStudy);
                const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                return this.http.put(url, searchBRStudy, {headers: headers});
        } else if (action === 'delete') {
                const deleteUrl = '/api/CDR/matrix/delete';
                const url = `${deleteUrl}/${searchBRStudy.id}`;
                const body = JSON.stringify(searchBRStudy);
                const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                return this.http.delete(url, searchBRStudy);
        } else if (searchBRStudy === 'clear') {
                params =  params.set('StudId', 'xxx');
            return this.http.get<any[]>(`/api/CDR/matrix/search`, { params: params })
            .pipe(map(res => <any[]>res));
        } else if (action === 'import') {
            const importUrl = '/api/CDR/matrix/fetchOrInsert';
                return this.http.get<any[]>(`${importUrl}/${searchBRStudy.study}/${searchBRStudy.matrixStudy}/${searchBRStudy.domain}`)
                .pipe(map(res => <any[]>res));
        } else if (action === 'status') {
            const updateUrl = '/api/CDR/matrix/updateDomainStatus';
            const url = `${updateUrl}/${searchBRStudy.study}/${searchBRStudy.domain}/${searchBRStudy.domainStatus}`;
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.put(url, searchBRStudy, {headers: headers})
                   .pipe(map(res => <any[]>res));
        } else if (action === 'flag') {
            const updateUrl = '/api/CDR/matrix/updateRuleFlag';
            const url = `${updateUrl}/${searchBRStudy.id}/${searchBRStudy.ruleFlag}`;
            const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.put(url, searchBRStudy, {headers: headers})
                   .pipe(map(res => <any[]>res));
        } else {
               /* if (searchBRStudy.brStudy) {
                    params =  params.set('StudId', searchBRStudy.brStudy);
                    }
                    if (searchBRStudy.brSdtmDomain) {
                    params =  params.set('StudDomain', searchBRStudy.brSdtmDomain);
                    }
                return this.http.get<any[]>(`/api/CDR/matrix/search`, { params: params })
                    .pipe(map(res => <any[]>res));*/
            return this.http.get<any[]>(`/api/CDR/ObjectMatrices/${searchBRStudy.brStudy}/${searchBRStudy.brSdtmDomain}`)
                   .pipe(map(res => <any[]>res));
        }}

        public updateDomainStatus(data: any, searchBRStudy) {
            this.fetch(data, STATUS_ACTION)
            .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
        }

        public updateBusinessRuleFlag(data: any, searchBRStudy) {
            this.fetch(data, FLAG_ACTION)
            .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
        }
}
