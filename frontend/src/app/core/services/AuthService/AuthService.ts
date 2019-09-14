import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http'
import { ApiService } from 'app/core/api/api.service'
import { StorageService } from 'app/core/services/StorageService/StorageService'
import { StorageKeys } from 'app/core/services/StorageService/StorageKeys'
import { TokenModel, LoginUserModel, RegisterUserModel } from 'app/core/services/AuthService/models'
import { Observable } from 'rxjs/Observable'
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false

    constructor(private http: ApiService, private router: Router) {
        const token = StorageService.getItem(StorageKeys.authToken)
        const expiryDate = StorageService.getItem(StorageKeys.tokenExpiryDate)

        if (token && new Date(expiryDate) > new Date()) {
            this.isLoggedIn = true
        }
    }

    login(model: LoginUserModel): Observable<TokenModel> {
        return this.http.post<TokenModel>('v2/admin/auth', model)
    }

    register(model: RegisterUserModel): Observable<TokenModel> {
        return this.http.post<TokenModel>(`auth/register/admin?captchaToken=${model.captchaToken}`, model)
    }

    verify(token: string): Observable<string> {
        return this.http.get(`auth/verify/admin/${token}`)
    }
    resetPassword(model): Observable<string> {
        return this.http.post(`auth/admin/resetPassword/${model.email}`, {})
    }
    setNewPassword(model): Observable<string> {
        return this.http.post(`auth/admin/setPassword`, model)
    }
    
    storeToken(authModel: TokenModel): void {
         var tokenModel = jwt_decode( authModel.token);
         console.log("tokenModel", tokenModel);
         
        let shopIds = tokenModel.shopsIds.split(",");
        console.log("SHOPIDS", shopIds)
        let shops = shopIds.map(id=>{ return {id}});
        console.log("asdasdad", shops)
        StorageService.saveItem(StorageKeys.shops, shops)
        StorageService.saveItem(StorageKeys.authToken, authModel.token)
        StorageService.saveItem(StorageKeys.email, tokenModel.email)
        StorageService.saveItem(StorageKeys.permissions, tokenModel['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
        StorageService.saveItem(StorageKeys.tokenExpiryDate, tokenModel.expiryDate)

        this.isLoggedIn = true
    }

    changePassword(changePasswordModel): any {
        return this.http.post<Response>('auth/admin/changePassword', changePasswordModel)
    }

    logout(): void {
        this.isLoggedIn = false
        localStorage.clear()
        this.router.navigate(['login'])
    }

    isTokenValid(): boolean {
        const authToken = StorageService.getItem(StorageKeys.authToken)
        const tokenExpirtDate = new Date(StorageService.getItem(StorageKeys.tokenExpiryDate))
        const now = new Date()
        const isTokenValid = authToken && now < tokenExpirtDate

        return isTokenValid
    }

    checkToken(): Observable<boolean> {
        return Observable.timer(0, 1000)
            .delay(1000)
            .map(() => {
                return this.isTokenValid()
            })
    }
}
