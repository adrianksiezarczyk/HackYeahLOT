import { NgModule, ApplicationRef, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha'
import { FormsModule } from '@angular/forms'
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component'
import { APP_RESOLVER_PROVIDERS } from './app.resolver'
import { AppState, InternalStateType } from './app.service'

// Core providers
import { CoreModule } from './core/core.module'
import { SmartadminLayoutModule } from './shared/layout/layout.module'

import { ModalModule } from 'ngx-bootstrap/modal'
import { AuthModule } from 'app/auth/auth.module'
import { registerLocaleData } from '@angular/common'
import localePl from '@angular/common/locales/pl'
import { TabsModule } from 'ngx-bootstrap'
import { DashboardModule } from './dashboard/dashboard.module'

const TEST_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
const SITE_KEY_CAPTCHA = '6Ld885UUAAAAAL1-6pc4j_tXsa6ukMlbYqjkYZBl'
registerLocaleData(localePl, 'pl')
// Application wide providers

const getCaptchaKey = () => {
    if (window.location.host.includes('localhost')) return TEST_SITE_KEY

    return SITE_KEY_CAPTCHA
}
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    { provide: LOCALE_ID, useValue: 'pl' },
    {
        provide: RECAPTCHA_SETTINGS,
        useValue: { siteKey: getCaptchaKey() } as RecaptchaSettings,
    },
]

type StoreType = {
    state: InternalStateType
    restoreInputValues: () => void
    disposeOldHosts: () => void
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        // import Angular's modules
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ModalModule.forRoot(),
        AuthModule,
        CoreModule,
        SmartadminLayoutModule,
        TabsModule.forRoot(),
        routing,
        RecaptchaModule.forRoot(),
    ],
    exports: [],
    providers: [
        // expose our Services and Providers into Angular's dependency injection
        // ENV_PROVIDERS,
        APP_PROVIDERS,
    ],
})
export class AppModule {
    constructor(public appRef: ApplicationRef, public appState: AppState) {}
}
