import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { DiscountModel, GetDiscountModel } from './models'
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models'

@Injectable()
export class DiscountService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetDiscountModel>): Observable<PaginationResponseModel<DiscountModel>> {
        const requestString = this.createSearchParams(request)

        return this.http.get<PaginationResponseModel<DiscountModel>>(`admin/discount?${requestString}`)
    }
    getSpecial(request: PaginationRequestModel<GetDiscountModel>): Observable<PaginationResponseModel<DiscountModel>> {
        const requestString = this.createSearchParams(request)

        return this.http.get<PaginationResponseModel<DiscountModel>>(`admin/discount/special?${requestString}`)
    }

    add(model) {
        return this.http.post<Array<DiscountModel>>('admin/discount', model)
    }
    udpate(model) {
        return this.http.put<Array<DiscountModel>>('admin/discount', model)
    }
    updateSpecial(model) {
        return this.http.put<Array<DiscountModel>>('admin/discount/special', model)
    }
    delete(id: number) {
        return this.http.delete<Array<DiscountModel>>(`admin/discount/${id}`)
    }
}
