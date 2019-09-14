import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './shops.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ShopsComponent } from './shops.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module'
import { SmartadminFormsModule } from 'app/shared/forms/smartadmin-forms.module'
import { AliExpressShopsComponent } from './aliexpress-shops/aliexpress.shops.component'
import { AliExpressShopDetailsModalComponent } from './aliexpress-shops/details/aliexpress.shop.details.modal.component'
import { YoursShopsComponent } from './yours-shops/yours.shops.component'
import { ImportsShopsComponent } from './imports/imports.shops.component';
import { ShopsDetailsComponent } from './details/shops.details.component';

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        SmartadminInputModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorBoxModule,
        LoaderModule,
        PaginationModule,
        ModalModule,
        TabsModule,
        SmartadminFormsModule,
        SmartadminEditorsModule,
    ],
    declarations: [
        ShopsComponent,
        ShopsDetailsComponent,
        AliExpressShopDetailsModalComponent,
        AliExpressShopsComponent,
        YoursShopsComponent,
        ImportsShopsComponent
    ],
})
export class ShopsModule {}
