import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './payment-history.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { PaymentHistoryComponent } from './payment-history.component';

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
    declarations: [PaymentHistoryComponent],
})
export class PaymentHistoryModule {}
