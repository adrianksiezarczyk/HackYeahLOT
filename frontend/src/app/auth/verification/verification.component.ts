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
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['verification.component.css'],
})
export class VerificationComponent extends BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
        super()
    }

    isVerified = false

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.verify(params.token)
        })
    }

    setSuccess() {
        this.isVerified = true
    }

    verify(token) {
        this.authService.verify(token).subscribe(response => {
            this.setSuccess()
        }, this.handleError)
    }
}
