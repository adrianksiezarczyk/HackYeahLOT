import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'

@Injectable()
export class DocumentsService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    getSummary() {
        return this.http.get<Array<any>>('admin/documents/summary')
    }

    get(id) {
        return this.http.get<any>(`admin/documents/${id}`)
    }
    create(model) {
        return this.http.post<any>(`admin/documents`, model)
    }
    save(document): Observable<Response> {
        return this.http.put<Response>('admin/documents', document)
    }
}
