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
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-set-password',
    templateUrl: './set-password.component.html',
    styleUrls: ['set-password.component.css'],
})
export class SetPasswordComponent extends BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
        super()
    }
    setPasswordForm: FormGroup
    _password = ''
    token = ''
    get password() {
        return this.setPasswordForm.get('password')
    }

    setPasswordModel = {}
    showPassword: boolean = false

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.token = params.token
        })
        this.setPasswordForm = new FormGroup({
            password: new FormControl(this._password, [Validators.required]),
        })
        this.setPasswordForm.valueChanges.subscribe(v => {
            this.serverError = ''
        })
    }

    setPassword() {
        this.showLoader()
        this.authService.setNewPassword({ newPassword: this.setPasswordForm.value.password, token: this.token }).subscribe(
            r => {
                this.hideLoader()
                setTimeout(() => {
                    alert('Nowe hasło zostało ustawione. Możesz się za jego pomocą zalogować.')
                    this.router.navigate(['login'])
                })
            },
            e => {
                this.handleError
            },
        )
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }

}
