import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { OffersComponent } from './offers.component';

export const routes: Routes = [
    {
        path: '',
        component: OffersComponent,
        data: {
            pageTitle: 'Offers',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
