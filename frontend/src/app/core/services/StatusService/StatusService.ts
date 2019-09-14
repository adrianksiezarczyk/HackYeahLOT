import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { StatusModel } from './models';

@Injectable()
export class StatusService extends BaseService {



    constructor(private http: ApiService) {
        super();
    }

    get() {
        return this.http.get<Array<StatusModel>>("admin/status");
    }  
    save(status: StatusModel): Observable<StatusModel> {
        if (status.id)
            return this.http.put<StatusModel>("admin/status", status);
        return this.http.post<StatusModel>("admin/status", status);
    }

    delete(statusId: number): Observable<Response> {
        return this.http.delete<Response>(`admin/status/${statusId}`);
    }
}