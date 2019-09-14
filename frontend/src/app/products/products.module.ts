import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { productsRouting } from './products.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SmartadminInputModule } from '../shared/forms/input/smartadmin-input.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { SmartadminFormsModule } from '../shared/forms/smartadmin-forms.module'
import { SmartadminEditorsModule } from '../shared/forms/editors/smartadmin-editors.module'
import { ErrorBoxModule } from 'app/shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { CombinationsComponent } from './edit/combinations.component/combinations.component'
import { ProductsComponent } from './products.component'
import { EditProductComponent } from './edit/edit.product.component'
import { PriceComponent } from './edit/price.component/price.component'
import { GeneralComponent } from './edit/general.component/general.component'
import { DescriptionComponent } from './edit/description.component/description.component'
import { PhotosComponent } from './edit/photos.component/photos.component'
import { FeauturesComponent } from './edit/feautures.component/feautures.component'
import { GroupUpdateComponent } from './group-update/group.update.component'
import { CategoriesComponent } from './edit/categories.component/categories.component'
import { CategoryFilterModalComponent } from './category-filter/products.category.filter.modal.component'
import { ProductImportModalComponent } from './import-modal/product.import.modal.component'
import { NotAvailableUpdateModalComponent } from './not-available-update-modal/notAvailable.update.modal.component'
import { AddPhotoModalComponent } from './edit/photos.component/add-photo-modal/add.photo/add.photo.modal.component';

@NgModule({
    imports: [
        CommonModule,
        productsRouting,
        SmartadminModule,
        SmartadminInputModule,
        NgxPaginationModule,
        FormsModule,
        ModalModule,
        ReactiveFormsModule,
        TabsModule,
        SmartadminFormsModule,
        SmartadminEditorsModule,
        ErrorBoxModule,
        LoaderModule,
        PaginationModule,
    ],
    declarations: [
        ProductsComponent,
        EditProductComponent,
        PriceComponent,
        GeneralComponent,
        DescriptionComponent,
        PhotosComponent,
        FeauturesComponent,
        CombinationsComponent,
        GroupUpdateComponent,
        CategoriesComponent,
        CategoryFilterModalComponent,
        ProductImportModalComponent,
        NotAvailableUpdateModalComponent,
        AddPhotoModalComponent
    ],
})
export class ProductsModule {}
