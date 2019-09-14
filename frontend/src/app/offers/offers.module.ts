import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './offers.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { OffersComponent } from './offers.component'
import { OfferDetailsModalComponent } from './details/offer.details.modal.component'
import { PaymentModalComponent } from 'app/profile/payment-modal/payment.modal.component'
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
    ],
    declarations: [OffersComponent, OfferDetailsModalComponent],
})
export class OffersModule {}
