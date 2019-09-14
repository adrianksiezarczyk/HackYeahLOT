import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from 'app/auth/register/register.component'
import { VerificationComponent } from './verification/verification.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SetPasswordComponent } from './set-password/set-password.component'

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            pageTitle: 'Logowanie',
        },
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            pageTitle: 'Rejestracja',
        },
    },
    {
        path: 'verification/:token',
        component: VerificationComponent,
        data: {
            pageTitle: 'Weryfikacja',
        },
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: {
            pageTitle: 'Reset hasła',
        },
    },
    {
        path: 'set-password/:token',
        component: SetPasswordComponent,
        data: {
            pageTitle: 'Ustawienie nowego hasła',
        },
    },
]

export const routing = RouterModule.forChild(routes)
