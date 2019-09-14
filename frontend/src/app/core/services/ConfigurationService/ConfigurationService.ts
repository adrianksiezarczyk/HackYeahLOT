import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { ConfigurationModel } from './models'

@Injectable()
export class ConfigurationService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(): Observable<any> {
        return this.http.get<any>('admin/settings')
    }
    
    getCountries(): Observable<any> {
        return this.http.get<any>('admin/country')
    }
    getLanguages(): Observable<any> {
        return this.http.get<any>('admin/language')
    }

    update(settings: Array<any>): any {
        return this.http.put('admin/settings', settings)
    }
    changeDomain(name: String): any {
        return this.http.put('admin/configuration/domain', { name })
    }
    updateNotificationEmail(email){
        return this.http.put('admin/configuration/notificationEmail', { email })
    }
}
