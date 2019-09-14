import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { ShopsComponent } from './shops.component';
import { ShopsDetailsComponent } from './details/shops.details.component';

export const routes: Routes = [
    {
        path: '',
        component: ShopsComponent,
        data: {
            pageTitle: 'Sklepy'
        }
    },
    {
        path: 'details/:id',
        component: ShopsDetailsComponent,
        data: {
            pageTitle: 'Sklepy'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

