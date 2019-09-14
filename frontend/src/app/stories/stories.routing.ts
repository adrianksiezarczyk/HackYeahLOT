import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { StoriesComponent } from './stories.component'
import { StoriesDetailsComponent } from './details/stories.details.component'

export const routes: Routes = [
    {
        path: '',
        component: StoriesComponent,
        data: {
            pageTitle: 'Stories',
        },
    },
    {
        path: ':id',
        component: StoriesDetailsComponent,
        data: {
            pageTitle: 'Stroy details',
        },
    },
    {
        path: 'new',
        component: StoriesDetailsComponent,
        data: {
            pageTitle: 'New story',
        },
    },
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
