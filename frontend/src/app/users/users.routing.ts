import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { UsersComponent } from './users.component'
import { UsersDetailsComponent } from './details/users.details.component'

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        data: {
            pageTitle: 'Użytkownicy',
        },
    },
    {
        path: ':id',
        component: UsersDetailsComponent,
        data: {
            pageTitle: 'Edycja',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
