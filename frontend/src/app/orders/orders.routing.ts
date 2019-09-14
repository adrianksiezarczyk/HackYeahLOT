import { Routes, RouterModule } from '@angular/router'
import { OrdersComponent } from './orders.component'
import { ModuleWithProviders } from '@angular/core'
import { OrderDetailsComponent } from './order.details/order.details.component'
import { I18nPipe } from 'app/shared/i18n'
import { OrderFailComponent } from './order.fail/order.fail.component';

export const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        data: {
            pageTitle: 'Orders',
        },
    },
    {
        path: 'fail',
        component: OrderFailComponent,
        data: {
            pageTitle: 'Order details',
        },
    },
    {
        path: ':id',
        component: OrderDetailsComponent,
        data: {
            pageTitle: 'Order details',
        },
    }
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
