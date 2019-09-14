import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DiscountComponent } from './discount.component';

export const routes: Routes = [
    {
        path: '',
        component: DiscountComponent,
        data: {
            pageTitle: 'Rabaty'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

