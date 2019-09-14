import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { SettingsComponent } from './settings.component'
import { DocumentDetailsComponent } from './details/document.details.component'

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        data: {
            pageTitle: 'Ustawienia',
        },
    },
    {
        path: ':id',
        component: DocumentDetailsComponent,
        data: {
            pageTitle: 'Szczegóły dokumentu',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
