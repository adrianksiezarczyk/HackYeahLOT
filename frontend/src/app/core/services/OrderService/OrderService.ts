import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { GetOrdersRequest, OrderModel, OrderDetailsModel, OrderFailModel, GetOrderFailRequest } from './models'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class OrderService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetOrdersRequest>): Observable<PaginationResponseModel<OrderModel>> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<OrderModel>>(`admin/order?${searchParams}`)
    }
    getPayments(orderId): Observable<any> {
        return this.http.get<any>(`admin/order/payments/${orderId}`)
    }

    getDetails(id: number): Observable<OrderDetailsModel> {
        return this.http.get<OrderDetailsModel>(`admin/order/details/${id}`)
    }
    getExportData(request: GetOrdersRequest): Observable<Array<any>> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<Array<any>>(`admin/order/export?${searchParams}`)
    }
    resentOrder(model: any): Observable<Response> {
        return this.http.post<Response>(`admin/order/reorder`, model)
    }

    collect(orderId: number): Observable<Response> {
        return this.http.get<Response>(`admin/order/collect/${orderId}`)
    }
    sentToBl(orderId: number): Observable<Response> {
        return this.http.post<Response>(`admin/order/sentToBaselinker/${orderId}`, {})
    }
    changeStatus(model): Observable<Response> {
        return this.http.put<Response>(`admin/order/changeStatus/`, model)
    }

    update(model): Observable<Response> {
        return this.http.put<Response>(`admin/order/`, model)
    }
    updateOrderProduct(model): Observable<Response> {
        return this.http.put<Response>(`admin/order/product`, model)
    }
    updateOrderAmountReceived(model): Observable<Response> {
        return this.http.put<Response>(`admin/order/amountReceived`, model)
    }

    getComments(orderId): Observable<Response> {
        return this.http.get<Response>(`admin/order/comments/${orderId}`)
    }

    addComment(model): Observable<Response> {
        return this.http.post<Response>(`admin/order/comments`, model)
    }

    deleteComment(id): Observable<Response> {
        return this.http.delete<Response>(`admin/order/comments/${id}`)
    }
    placeOrder(model: any): any {
        return this.http.post<Response>(`admin/order/addToQueue`, model)
    }
    placeOrderByBl(model) {
        return this.http.post<Response>(`admin/order/addToQueue/baselinker`, model)
    }
    setAsPaid(id: any) {
        return this.http.post<Response>(`admin/order/payment/paid/${id}`, {})
    }
    addPaymentHistory(model) {
        return this.http.post<Response>(`admin/order/payment/history/new`, model)
    }

    getFailedOrderProducts(request: PaginationRequestModel<GetOrderFailRequest>) {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<OrderFailModel>>(`admin/orderProductFail?${searchParams}`)
    }

    getMatchingCombinations(productId): Observable<any> {
        return this.http.get<Response>(`admin/orderProductFail/combination/${productId}`)
    }

    updateCombination(request): Observable<any> {
        return this.http.put<Response>(`admin/orderProductFail/combination/`, request)
    }
    getFailDetails(orderProductId): Observable<any> {
        return this.http.get<Response>(`admin/orderProductFail/details/${orderProductId}`)
    }

    deleteFail(failId: any) {
        return this.http.delete<Response>(`admin/orderProductFail/${failId}/`)
    }
    deleteFailWithMatchingId(failId: any) {
        return this.http.delete<Response>(`admin/orderProductFail/${failId}/withMatchingProducts`)
    }

    getAliTransfers(): Observable<Array<any>> {
        return this.http.get<Array<any>>(`admin/order/aliexpress/payments`)
    }
}
