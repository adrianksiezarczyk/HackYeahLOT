import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './orders.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { OrdersComponent } from 'app/orders/orders.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { CustomerComponent } from './order.details/customer.component/customer.component'
import { ProductsComponent } from './order.details/products.component/products.component'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { AliExpressOrdersComponent } from './order.details/aliexpress.orders.component/aliexpress.orders.component'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { OrderDetailsComponent } from './order.details/order.details.component'
import { CommentsComponent } from './order.details/comments.component/comments.component';
import { AddCommentModalComponent } from './order.details/comments.component/add-comment-modal/add-comment.modal.component';
import { SmartadminEditorsModule } from '../shared/forms/editors/smartadmin-editors.module';
import { AddPaymentHistoryModalComponent } from './order.details/add-payment-history-modal/add.payment.history.modal.component';
import { OrderFailComponent } from './order.fail/order.fail.component';
import { EditFailModalComponent } from './order.fail/edit/edit.fail.modal.component';
import { CombinationModalComponent } from './combination/combination.modal.component';
import { OrderblModalComponent } from './orderer-bl/orderbl.modal.component';

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
    ],
    declarations: [
        OrdersComponent,
        OrderDetailsComponent,
        OrderFailComponent,
        CustomerComponent,
        ProductsComponent,
        CommentsComponent,
        AliExpressOrdersComponent,
        CombinationModalComponent,
        AddCommentModalComponent,
        AddPaymentHistoryModalComponent,
        OrderblModalComponent
    ],
})
export class OrdersModule {}
