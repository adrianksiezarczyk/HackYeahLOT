import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { GetCategoryRequest, CategoryModel, SaveShopCategory } from './models'
import 'rxjs/add/operator/publishReplay'
import { StorageService } from '../StorageService/StorageService'
import { StorageKeys } from '../StorageService/StorageKeys'
import { PaginationRequestModel, PaginationResponseModel } from '../../base/models'

@Injectable()
export class CategoryService extends BaseService {
    private categoriesCached: Observable<Array<CategoryModel>>
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<GetCategoryRequest>): Observable<PaginationResponseModel<CategoryModel>> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<CategoryModel>>(
            `admin/category?${searchParams}`,
        )
    }
    getAliexpressCategories(): Observable<Array<CategoryModel>> {
        if (this.categoriesCached) return this.categoriesCached
        this.categoriesCached = this.http
            .get<Array<CategoryModel>>('admin/category/aliexpress')
            .publishReplay(1)
            .refCount()

        return this.categoriesCached
    }

    update(category: any): Observable<CategoryModel> {
        if (category.id) return this.http.put<CategoryModel>('admin/category', category)
        else return this.http.post<CategoryModel>('admin/category', category)
    }
    saveCategoryImage(formData: FormData): any {
        return this.http.post('admin/category/image', formData)
    }
    delete(categoryId){
        return this.http.delete(`admin/category/${categoryId}`)
    }
    updateOrder(model){
        return this.http.put('admin/category/order', model)
    }
}
