import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http'
import { config } from '../../shared/smartadmin.config'
import { environment } from 'environments/environment'
import { Http, RequestOptions, Response } from '@angular/http'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { _throw } from 'rxjs/observable/throw'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'
import { CurrentSetService } from '../services/CurrentSetService/CurrentSetService';

declare var $: any

@Injectable()
export class ApiService {
    constructor(private http: HttpClient, private router: Router) {}

    get<T>(url: string): Observable<T> {
        return this.http.get(this.getUrl(url), this.getRequestOptions()).catch(this.handleError)
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.http.post(this.getUrl(url), body, this.getRequestOptions()).catch(this.handleError)
    }

    put<T>(url: string, body: any): Observable<T> {
        return this.http.put(this.getUrl(url), body, this.getRequestOptions()).catch(this.handleError)
    }

    path<T>(url: string, body: any): Observable<T> {
        return this.http.patch(this.getUrl(url), body, this.getRequestOptions()).catch(this.handleError)
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete(this.getUrl(url), this.getRequestOptions()).catch(this.handleError)
    }

    private getUrl(url) {
        var shop = CurrentSetService.currentShop
        if (shop) {
            if (!url.includes('?')) url += '?'
            else url += '&'
            url += `shopId=${CurrentSetService.currentShop.id}`
        }
        if (url.includes('http')) return url
        return `${environment.apiUrl}/${url}`
    }

    private getRequestOptions(): any {
        let shopId = ''
        const currentShop = CurrentSetService.currentShop
        if (currentShop) shopId = currentShop.id
        return {
            headers: new HttpHeaders()
                .set('Authorization', `Bearer ${StorageService.getItem(StorageKeys.authToken)}`)
                .set('ShopId', `${shopId}`),
        }
    }

    private handleError = (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
            this.router.navigate(['login'])
            return
        }
        let error = errorResponse.error
        if (!error) error = { message: `${errorResponse.status} ${errorResponse.statusText}` }
        return _throw(error)
    }
}
