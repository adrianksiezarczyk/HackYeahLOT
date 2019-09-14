import { Injectable } from '@angular/core'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { ShopModel, GetShopsRequest, AliExpressShopModel, GetImportsShopsRequest, ImportShopModel } from './models'
import { Observable } from 'rxjs'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class ShopsService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    getAliExpressShops(
        request: PaginationRequestModel<GetShopsRequest>,
    ): Observable<PaginationResponseModel<AliExpressShopModel>> {
        const requestString = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<AliExpressShopModel>>(`admin/shops/aliexpress?${requestString}`)
    }

    getShops(request: PaginationRequestModel<GetShopsRequest>): Observable<PaginationResponseModel<ShopModel>> {
        const requestString = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<ShopModel>>(`admin/shops?${requestString}`)
    }

    getSets(): Observable<Response> {
        return this.http.get<Response>(`admin/shops/sets`)
    }

    getImports(
        request: PaginationRequestModel<GetImportsShopsRequest>,
    ): Observable<PaginationResponseModel<ImportShopModel>> {
        const requestString = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<ImportShopModel>>(`admin/shopImporter?${requestString}`)
    }

    reset(id: number): Observable<Response> {
        return this.http.put(`admin/shopImporter/reset/${id}`, {})
    }

    toggleDisabled(id: any): any {
        return this.http.put(`admin/shopImporter/toggleDisabled/${id}`, {})
    }

    getAliExpressShopsCategories(aliexpressShopId: number): Observable<any> {
        return this.http.get(`admin/shops/categories/${aliexpressShopId}`)
    }
    addToImportQueue(model): Observable<Response> {
        return this.http.post(`admin/shopImporter`, model)
    }

    getDetails(id: any): any {
        return this.http.get(`admin/shops/${id}`)
    }
    put(model: any): any {
        return this.http.put(`admin/shops`, model)
    }
    addBanner(model: any): any {
        return this.http.post(`admin/shop/banner`, model)
    }
    saveLogo(request: any): any {
        return this.http.post(`admin/shops/logo`, request)
    }
    saveCurrentShopLogo(request: any): any {
        return this.http.post(`admin/shops/current/logo`, request)
    }
    saveCurrentShopFavicon(request: any): any {
        return this.http.post(`admin/shops/current/favicon`, request)
    }
    deleteBanner(id: any): any {
        return this.http.delete(`admin/shop/banner/${id}`)
    }
    getAll(): Observable<Response> {
        return this.http.get(`admin/shops/all`)
    }
    assignShopToSet(request: any): any {
        return this.http.put(`admin/shops/assign`, request)
    }
    saveCurrentShopMetaImage(request: any): any {
        return this.http.post(`admin/shops/current/metaImage`, request)
    }
    getUserShopsDetails(): any {
        return this.http.get(`v2/admin/shops/`)
    }
    getAccountValidity(): any {
        return this.http.get(`v2/admin/shopSets/validity`)
    }

    
}
