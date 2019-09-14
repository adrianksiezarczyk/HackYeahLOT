import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { ProfileComponent } from './profile.component';

export const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        data: {
            pageTitle: 'Profil'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

