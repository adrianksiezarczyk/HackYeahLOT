import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { BuyShopComponent } from './buy-shop.component';

export const routes: Routes = [
    {
        path: '',
        component: BuyShopComponent,
        data: {
            pageTitle: 'Buy shop',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
