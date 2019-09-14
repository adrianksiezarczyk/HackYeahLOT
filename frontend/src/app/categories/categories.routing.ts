import { Routes, RouterModule } from '@angular/router'
import { CategoriesComponent } from './categories.component'
import { ModuleWithProviders } from '@angular/core'

export const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        data: {
            pageTitle: 'Categories',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
