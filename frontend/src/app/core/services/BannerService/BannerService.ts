import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { ConfigurationModel } from './models'

@Injectable()
export class BannerService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(): Observable<any> {
        return this.http.get<any>('admin/banner/current')
    }

    add(model): any {
        return this.http.post('admin/banner/current', model)
    }
    delete(bannerId): any {
        return this.http.delete(`admin/banner/current/${bannerId}`)
    }
    update(banner): any {
        return this.http.put('admin/banner/current', banner)
    }
}
