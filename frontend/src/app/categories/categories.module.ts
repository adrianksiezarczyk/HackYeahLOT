import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './categories.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { CategoriesComponent } from './categories.component'
import { FormsModule } from '@angular/forms'
import { CategoryTreeViewComponent } from 'app/categories/category-tree-view/category.tree-view.component'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { CategoryDetailsModalComponent } from './details/category.details.modal.component'
import { ModalModule } from 'ngx-bootstrap'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        FormsModule,
        LoaderModule,
        ErrorBoxModule,
        ModalModule,
        SmartadminEditorsModule,
        NgxPaginationModule,
        PaginationModule,
        SmartadminInputModule,
    ],
    declarations: [CategoriesComponent, CategoryDetailsModalComponent],
})
export class CategoriesModule {}
