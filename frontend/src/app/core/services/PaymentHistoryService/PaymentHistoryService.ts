import { Observable } from 'rxjs/Observable'
import { Injectable, AnimationKeyframe } from '@angular/core'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class PaymentHistoryService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<any>): Observable<any> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<any>>(`admin/paymentHistory?${searchParams}`)
    }

}
