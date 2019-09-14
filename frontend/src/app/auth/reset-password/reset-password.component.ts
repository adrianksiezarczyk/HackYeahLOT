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
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['reset-password.component.css'],
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
        super()
    }
    resetPasswordForm: FormGroup
    _email = ''
    emailSent = false

    get email() {
        return this.resetPasswordForm.get('email')
    }

    ngOnInit() {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl(this._email, [Validators.required, Validators.email]),
        })
        this.resetPasswordForm.valueChanges.subscribe(v => {
            this.serverError = ''
        })
    }

    reset() {
        this.serverError = null
        this.showLoader()
        this.authService.resetPassword(this.resetPasswordForm.value).subscribe(response => {
            this.emailSent = true
            this.hideLoader()
        }, this.handleError)
    }
}
