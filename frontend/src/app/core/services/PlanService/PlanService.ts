import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { PlanPaymentResponse } from './models'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class PlanService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get() {
        return this.http.get('admin/plan/')
    }
}
