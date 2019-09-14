import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpService } from "app/core/api/http.service";
import { BaseService } from 'app/core/base/base.service';
import { ApiService } from 'app/core/api/api.service';
import { Response } from '@angular/http';
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models';
import { GetDisputeModel, DisputeModel } from './models';

@Injectable()
export class DisputesService extends BaseService {

    constructor(private http: ApiService) {
        super();
    }

    get(request: PaginationRequestModel<GetDisputeModel>): Observable<PaginationResponseModel<DisputeModel>> {
        const requestString = this.createSearchParams(request);
        return this.http.get<PaginationResponseModel<DisputeModel>>(`admin/dispute?${requestString}`);
    }
    open(aliExpressId: string) {
        return this.http.post<Response>(`admin/dispute/${aliExpressId}`, {});
    }
    verify(disputeId: number) {
        return this.http.put<Response>(`admin/dispute/verify/${disputeId}`, {});
    }
}