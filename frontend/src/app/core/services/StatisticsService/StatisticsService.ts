import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { Response } from '@angular/http';
import { DashboardStatistics } from './models';

@Injectable()
export class StatisticsService extends BaseService {

    constructor(private http: ApiService) {
        super();
    }

    get(): Observable<DashboardStatistics> {
        return this.http.get<DashboardStatistics>("admin/statistics/dashboard")
    }

    getUpdateStatistics(): Observable<any> {
        return this.http.get<any>("admin/statistics/update")
    }
}