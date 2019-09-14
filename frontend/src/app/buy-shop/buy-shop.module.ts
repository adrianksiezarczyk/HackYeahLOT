import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './buy-shop.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { BuyShopComponent } from './buy-shop.component'
import { PaymentModule } from 'app/payment/payment.module'

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
        ModalModule,
        TabsModule,
        PaginationModule,
        PaymentModule,
    ],
    declarations: [BuyShopComponent],
})
export class BuyShopModule {}
