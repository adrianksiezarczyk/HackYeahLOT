import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models'
import {
    GetProductRequest,
    ProductModel,
    AddProductToShopRequest,
    ShopProductModel,
    ShopProductDetailsModel,
    ProductPhoto,
    FeautureModel,
} from './models'

@Injectable()
export class ProductService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    getGlobal(request: PaginationRequestModel<GetProductRequest>): Observable<PaginationResponseModel<ProductModel>> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<ProductModel>>(`admin/product?${searchParams}`)
    }

    addProductsToShop(products: Array<number>): Observable<Response> {
        return this.http.post<Response>(`admin/product/shop`, products)
    }
    deleteProductFromShop(id: number): Observable<Response> {
        return this.http.delete<Response>(`admin/product/shop/${id}`)
    }
    deleteManyProductFromShop(ids: Array<number>): Observable<Response> {
        return this.http.delete<Response>(`admin/product/shop/many/${ids}`)
    }
    deleteGlobal(id: number): Observable<Response> {
        return this.http.delete<Response>(`admin/product/${id}`)
    }
    deleteGlobalMany(ids: Array<number>): Observable<Response> {
        return this.http.delete<Response>(`admin/product/many/${ids}`)
    }
    getGlobalProductDetails(id: number): Observable<ShopProductDetailsModel> {
        return this.http.get<ShopProductDetailsModel>(`admin/product/${id}`)
    }

    saveGlobalProductDetails(model: ShopProductDetailsModel): Observable<Response> {
        return this.http.put<Response>(`admin/product`, model)
    }

    updatePhotoVisibility(photo: ProductPhoto): any {
        if (photo.isVisible) return this.http.delete<Response>(`admin/product/photo/${photo.id}`)
        else return this.http.post<Response>(`admin/product/photo/${photo.id}`, {})
    }

    updateFeautureVisibility(feauture: FeautureModel): any {
        if (feauture.isVisible) return this.http.delete<Response>(`admin/product/feauture/${feauture.id}`)
        else return this.http.post<Response>(`admin/product/feauture/${feauture.id}`, {})
    }
    deleteAliExpressOffer(aliExpressId: string): Observable<Response> {
        return this.http.delete<Response>(`admin/product/aliExpressOffer/${aliExpressId}`)
    }

    saveNewAliExpressOffer(model: any): any {
        return this.http.post<Response>(`admin/product/aliExpressOffer/`, model)
    }

    updateSelectedOffer(model: any): Observable<Response> {
        return this.http.put<Response>(`admin/product/aliExpressOffer/`, model)
    }
    updateCategory(model: any): Observable<Response> {
        return this.http.put<Response>(`admin/product/category/`, model)
    }

    globalProductsGroupUpdate(model: any): Observable<Response> {
        return this.http.path<Response>(`admin/product`, model)
    }

    forceUpdate(productId) {
        return this.http.put<Response>(`admin/product/forceUpdate/${productId}`, {})
    }
    forceHardUpdate(productId) {
        return this.http.put<Response>(`admin/product/forceUpdate/${productId}/reset`, {})
    }

    generateDisplayName(productId) {
        return this.http.put<Response>(`admin/product/generateDisplayName/${productId}`, {})
    }

    getLocalizedDetails(productId): Observable<Array<any>> {
        return this.http.get<Array<any>>(`admin/product/localizedDetails/${productId}`)
    }
    saveLocalizedDetails(request): Observable<Response> {
        return this.http.put(`admin/product/localizedDetails`, request)
    }
    setDefaultLocalizedDetails(productId, languageId): Observable<Response> {
        return this.http.put(`admin/product/localizedDetails/default/${productId}/lang/${languageId}`, null)
    }

    updateAdditionalMargin(model: any): Observable<Response> {
        return this.http.put<Response>(`admin/product/additionalMargin/`, model)
    }

    getCombinations(model: any): Observable<Response> {
        const searchParams = this.createSearchParams(model)
        return this.http.get<any>(`admin/product/combinations?${searchParams}`)
    }

    updateMany(ids: Array<number>): Observable<Response> {
        return this.http.put<Response>(`admin/product/updateMany/${ids}`, null)
    }

    importProduct(model) {
        return this.http.post(`chrome/product`, model)
    }
    addPhoto(model){
        return this.http.post(`admin/product/photo`, model)
    }

    changeDescriptionPhotosVisibility(productId): Observable<Array<any>> {
        return this.http.put<Array<any>>(`admin/product/description/photos/visibility/${productId}`,{})
    }
}
