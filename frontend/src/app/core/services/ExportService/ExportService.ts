import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { Response } from '@angular/http';
import { ExportProductRequest } from './models';

@Injectable()
export class ExportService extends BaseService {

    constructor(private http: ApiService) {
        super();
    }

    getProducts(request: ExportProductRequest): Observable<any> {
        const requestString = this.createSearchParams(request);
        return this.http.get<any>(`admin/export/products?${requestString}`);
    }
    getCombinations(request: ExportProductRequest): Observable<any> {
        const requestString = this.createSearchParams(request);
        return this.http.get<any>(`admin/export/combinations?${requestString}`);
    }
}