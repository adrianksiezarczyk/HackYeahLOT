import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { StatusesComponent } from './statuses.component';

export const routes: Routes = [
    {
        path: '',
        component: StatusesComponent,
        data: {
            pageTitle: 'Statusy'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

