import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DisputesComponent } from './disputes.component';

export const routes: Routes = [
    {
        path: '',
        component: DisputesComponent,
        data: {
            pageTitle: 'Disputy'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

