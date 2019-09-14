import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ThemeComponent } from './theme.component'

export const routes: Routes = [
    {
        path: '',
        component: ThemeComponent,
        data: {
            pageTitle: 'Motywy',
        },
    },
  
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
