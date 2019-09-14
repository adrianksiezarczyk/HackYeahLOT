import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { PaymentHistoryComponent } from './payment-history.component';

export const routes: Routes = [
    {
        path: '',
        component: PaymentHistoryComponent,
        data: {
            pageTitle: 'Payment history',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
