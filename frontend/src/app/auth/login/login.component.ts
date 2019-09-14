import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from 'app/core/api/http.service'
import { BaseComponent } from 'app/core/base/base.component'
import { AuthService } from 'app/core/services/AuthService/AuthService'
import { LoginUserModel } from 'app/core/services/AuthService/models'
import { Observable } from 'rxjs/Observable'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CurrencyService } from '../../core/services/CurrencyService/CurrencyService'
import { StorageService } from '../../core/services/StorageService/StorageService'
import { StorageKeys } from '../../core/services/StorageService/StorageKeys'
import { ShopsService } from 'app/core/services/ShopsService/ShopsService'
import { SharedService } from '../../core/services/SharedService/SharedService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css'],
})
export class LoginComponent extends BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private shopsService: ShopsService, private sharedService: SharedService) {
        super()
    }

    loginForm: FormGroup

    get email() {
        return this.loginForm.get('email')
    }
    get password() {
        return this.loginForm.get('password')
    }

    userModel: LoginUserModel = <LoginUserModel>{}
    showPassword: boolean = false

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl(this.userModel.email, [Validators.required, Validators.email]),
            password: new FormControl(this.userModel.password),
        })
        this.loginForm.valueChanges.subscribe(v => {
            this.serverError = ''
        })
    }

    login() {
        this.serverError = null
        this.showLoader()
        this.authService.login(this.loginForm.value).subscribe(response => {
            this.authService.storeToken(response)
            this.router.navigate(['dashboard'])
        }, this.handleError)
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }
}
