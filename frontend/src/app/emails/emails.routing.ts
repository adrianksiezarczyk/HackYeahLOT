import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { EmailsComponent } from './emails.component';
import { EmailDetailsComponent } from './details/email.details.component';

export const routes: Routes = [
    {
        path: '',
        component: EmailsComponent,
        data: {
            pageTitle: 'Emaile'
        }
    },
    {
        path: ':id',
        component: EmailDetailsComponent,
        data: {
            pageTitle: 'Szczegóły szablonu'
        }
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

