import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'

@Injectable()
export class PaymentService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    getPaymentTypes() {
        return this.http.get<any>(`admin/payment/paymentType`)
    }
    updatePaymentType(model) {
        return this.http.put<any>(`admin/payment/paymentType`, model)
    }
    getPaymentStatus(paymentHistoryId) {
        return this.http.get<any>(`payment/status?paymentHistoryId=${paymentHistoryId}`)
    }

    createPayment(model): Observable<any> {
        if (model.offerId) return this.http.post<any>(`admin/offer/buy`, model)
        if (model.planId) return this.http.post<any>(`admin/plan`, model)

        throw 'UNEXPECTED PRODUCT'
    }
    createInternalOrder(model) {
        return this.http.post<any>(`v2/admin/plan/internalOrder`, model)
    }
}
