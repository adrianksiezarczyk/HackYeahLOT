import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmartadminModule } from '../shared/smartadmin.module'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { VerificationComponent } from './verification/verification.component'
import { SetPasswordComponent } from './set-password/set-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { routing } from './auth.routing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from 'app/auth/auth.service'
import { LoadersCssModule } from 'angular2-loaders-css'
import { ErrorBoxModule } from 'app/shared/ui/error-box/error.box.module'
import { LoaderModule } from 'app/shared/ui/loader/loader.module'
import { RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha';

@NgModule({
    imports: [
        CommonModule,
        SmartadminModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        LoadersCssModule,
        ErrorBoxModule,
        LoaderModule,
        RecaptchaModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        ResetPasswordComponent,
        SetPasswordComponent,
    ],
})
export class AuthModule {}
