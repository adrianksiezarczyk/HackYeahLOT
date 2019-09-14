import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpService } from 'app/core/api/http.service'
import { BaseService } from 'app/core/base/base.service'
import { ApiService } from 'app/core/api/api.service'
import { Response } from '@angular/http'
import { ConfigurationModel } from './models'

@Injectable()
export class ThemeService extends BaseService {
    constructor(private http: ApiService) {
        super()
    }

    get(): Observable<any> {
        return this.http.get<any>('admin/theme')
    }

    update(theme: Array<any>): any {
        return this.http.put('admin/theme', theme)
    }
    setDefaultTheme(): any {
        return this.http.put('admin/theme/default', {})
    }
}
