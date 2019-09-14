import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { BaseComponent } from 'app/core/base/base.component'
import { AuthService } from 'app/core/services/AuthService/AuthService'
import { RegisterUserModel } from 'app/core/services/AuthService/models'
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { RecaptchaComponent } from 'ng-recaptcha'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.css'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
    constructor(private router: Router, private authService: AuthService) {
        super()
    }

    loginForm: FormGroup

    @ViewChild('captchaRef') captchaRef: RecaptchaComponent

    get email() {
        return this.loginForm.get('email')
    }
    get password() {
        return this.loginForm.get('password')
    }
    get firstName() {
        return this.loginForm.get('firstName')
    }
    get lastName() {
        return this.loginForm.get('lastName')
    }
    get phoneNumber() {
        return this.loginForm.get('phoneNumber')
    }

    userModel: RegisterUserModel = <RegisterUserModel>{}
    showPassword: boolean = false
    captchaResponse: string = ''

    ngOnInit() {
        this.captchaRef.reset()
        this.loginForm = new FormGroup({
            email: new FormControl(this.userModel.email, [Validators.required, Validators.email]),
            firstName: new FormControl(this.userModel.firstName, [Validators.required]),
            lastName: new FormControl(this.userModel.lastName, [Validators.required]),
            phoneNumber: new FormControl(this.userModel.phoneNumber),
            password: new FormControl(this.userModel.password, [Validators.required]),
        })
        this.loginForm.valueChanges.subscribe(v => {
            this.serverError = ''
        })
    }

    register() {
   
        this.authService.register({ ...this.loginForm.value, captchaToken: this.captchaResponse }).subscribe(r => {
            this.authService.storeToken(r)
            this.router.navigate(['dashboard'])
            //this.captchaRef.reset()
            this.hideLoader()
        }, this.handleError)
    }

    togglePassword() {
        this.showPassword = !this.showPassword
    }

    resolveAndRegister() {
        this.showLoader()
        try{
        this.captchaRef.execute()
        }catch(e){
            console.warn(e);
            this.hideLoader();
        }
    }

    resolveCaptcha(event) {
        this.captchaResponse = event
        this.loginForm.valid && this.register()
    }
}
