import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { ProductsComponent } from 'app/products/products.component'
import { ExportComponent } from './export/export.component'
import { EditProductComponent } from './edit/edit.product.component'

export const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        data: {
            pageTitle: 'All products',
        },
    },
    {
        path: ':id',
        component: EditProductComponent,
        data: {
            pageTitle: 'Edit product',
        },
    },
]

export const productsRouting: ModuleWithProviders = RouterModule.forChild(routes)
