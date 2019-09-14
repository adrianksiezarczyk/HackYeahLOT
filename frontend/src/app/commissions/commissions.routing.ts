import { Routes, RouterModule } from '@angular/router'
import { CommissionsComponent } from './commissions.component'
import { ModuleWithProviders } from '@angular/core'

export const routes: Routes = [
    {
        path: '',
        component: CommissionsComponent,
        data: {
            pageTitle: 'Commissions',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
