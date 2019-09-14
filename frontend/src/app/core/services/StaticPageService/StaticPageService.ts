import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { StaticPageModel } from './models'

@Injectable()
export class StaticPageService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get() {
        return this.http.get<Array<any>>('admin/staticPage')
    }

    save(page: StaticPageModel): Observable<any> {
        if (page.id) return this.http.put<StaticPageModel>('admin/staticPage', page)
        return this.http.post<StaticPageModel>('admin/staticPage', page)
    }

    delete(pageId: number): Observable<Response> {
        return this.http.delete<Response>(`admin/staticPage/${pageId}`)
    }
}
