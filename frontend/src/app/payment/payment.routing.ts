import { Routes, RouterModule } from '@angular/router'
import { OrdersComponent } from './orders.component'
import { ModuleWithProviders } from '@angular/core'
import { ProcessingPaymentComponent } from './processing.payment.component'
import { I18nPipe } from 'app/shared/i18n'
import { SuccessPaymentComponent } from './success.payment.component'
import { FailurePaymentComponent } from './failure.payment.component'

export const routes: Routes = [
    {
        path: 'processing',
        component: ProcessingPaymentComponent,
        data: {
            pageTitle: 'Processing payment',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
