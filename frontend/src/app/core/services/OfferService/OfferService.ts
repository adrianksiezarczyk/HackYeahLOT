import { Observable } from 'rxjs/Observable'
import { Injectable, AnimationKeyframe } from '@angular/core'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { PaginationRequestModel, PaginationResponseModel } from 'app/core/base/models'

@Injectable()
export class OfferService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(request: PaginationRequestModel<any>): Observable<any> {
        const searchParams = this.createSearchParams(request)
        return this.http.get<PaginationResponseModel<any>>(`admin/offer?${searchParams}`)
    }

    update(offer: any): Observable<any> {
        if (offer.id) return this.http.put<any>('admin/offer', offer)
        else return this.http.post<any>('admin/offer', offer)
    }

    delete(id: number): Observable<Response> {
        return this.http.delete<Response>(`admin/offer/${id}`);
    }

    getTags(): Observable<any> {
        return this.http.get('admin/offer/tags');
    }

}
