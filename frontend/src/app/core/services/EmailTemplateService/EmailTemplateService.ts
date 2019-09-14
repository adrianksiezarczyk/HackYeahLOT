import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { create } from 'domain'

@Injectable()
export class EmailTemplateService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    getSummary() {
        return this.http.get<Array<any>>('admin/emailTemplate/summary')
    }
    get(id) {
        return this.http.get<any>(`admin/emailTemplate/${id}`)
    }
    createContent(model) {
        return this.http.post<any>(`admin/emailTemplate/content`, model)
    }
    save(template): Observable<Response> {
        return this.http.put<Response>('admin/emailTemplate', template)
    }
    create(model) {
        return this.http.post<any>(`admin/emailTemplate`, model)
    }
    delete(id) {
        return this.http.delete<any>(`admin/emailTemplate/${id}`)
    }
}
