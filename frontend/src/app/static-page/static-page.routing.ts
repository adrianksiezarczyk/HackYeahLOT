import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { StaticPageComponent } from './static-page.component';

export const routes: Routes = [
    {
        path: '',
        component: StaticPageComponent,
        data: {
            pageTitle: 'Strony statyczne'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

