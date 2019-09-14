import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models'
import { GetCommissionRequest, CommissionModel } from './models'

@Injectable()
export class CommissionService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetCommissionRequest>): Observable<PaginationResponseModel<CommissionModel>> {
        const requestString = this.createSearchParams(request)

        return this.http.get<PaginationResponseModel<CommissionModel>>(`admin/commission?${requestString}`);
    }

    saveRate(rate: CommissionModel): Observable<Response> {
        return rate.id
            ? this.http.put<Response>('admin/commission', rate)
            : this.http.post<Response>('admin/commission', rate)
    }

    deleteRate(rateId: number): any {
        return this.http.delete<Response>(`admin/commission/${rateId}`)
    }
}
