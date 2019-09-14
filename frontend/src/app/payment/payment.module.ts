import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './payment.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { ModalModule, TabsModule, BsDropdownModule } from 'ngx-bootstrap'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { SmartadminEditorsModule } from '../shared/forms/editors/smartadmin-editors.module'
import { ProcessingPaymentComponent } from './processing.payment.component'
import { SuccessPaymentComponent } from './success.payment.component'
import { FailurePaymentComponent } from './failure.payment.component'
import { PaymentModalComponent } from './payment-modal/payment.modal.component'

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
        SmartadminEditorsModule,
        BsDropdownModule,
    ],
    declarations: [ProcessingPaymentComponent, PaymentModalComponent],
    exports: [PaymentModalComponent],
})
export class PaymentModule {}
