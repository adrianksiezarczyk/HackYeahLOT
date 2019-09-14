import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmartadminModule } from '../shared/smartadmin.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { routing } from './discount.routing'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { SmartadminInputModule } from '../shared/forms/input/smartadmin-input.module'
import { DiscountComponent } from './discount.component'
import { NewDiscountModalComponent } from './discount-codes/newdiscount/newdiscount.modal.component'
import { DiscountCodesComponent } from './discount-codes/discount-codes.component'
import { SpecialDiscountComponent } from './special-discount/special-discount.component'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorBoxModule,
        LoaderModule,
        ModalModule,
        SmartadminInputModule,
        PaginationModule,
        TabsModule,
    ],
    declarations: [DiscountComponent, NewDiscountModalComponent, DiscountCodesComponent, SpecialDiscountComponent],
})
export class DiscountModule {}
