import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { UserModel, GetUserRequest, InvoiceModel } from './models'
import { StorageService } from '../StorageService/StorageService'
import { StorageKeys } from '../StorageService/StorageKeys'
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models'

@Injectable()
export class UsersService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetUserRequest>): Observable<PaginationResponseModel<any>> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<any>>(`admin/administrator?${searchParams}`)
    }
    getCurrent() {
        return this.http.get<any>('admin/administrator/current')
    }
    updateCurrent(request) {
        return this.http.put<any>('admin/administrator/current', request)
    }
    getById(id) {
        return this.http.get<any>(`admin/administrator/${id}`)
    }
    getPermissions(): any {
        return this.http.get<any>(`admin/administrator/permissions`)
    }
    hasPermission(permission): boolean {
        return StorageService.getItem(StorageKeys.permissions).includes(permission)
    }
    save(user: any): any {
        return this.http.put<any>(`admin/administrator`, user)
    }
    delete(id: number) {
        return this.http.delete(`admin/administrator/${id}`)
    }
    getInvoice(): Observable<InvoiceModel> {
        return this.http.get<InvoiceModel>(`admin/administrator/invoice`)
    }
    updateInvoice(model) {
        return this.http.put<any>(`admin/administrator/invoice`, model)
    }
}
