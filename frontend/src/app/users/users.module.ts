import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmartadminModule } from '../shared/smartadmin.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { UsersComponent } from './users.component'
import { routing } from './users.routing'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { SmartadminInputModule } from '../shared/forms/input/smartadmin-input.module'
import { UsersDetailsComponent } from './details/users.details.component'
import { UserEditComponent } from './details/user-edit/users.details.edit.component'
import { UserInfoComponent } from './details/user-info/users.details.info.component'
import { UserShopsComponent } from './details/user-shops/users.details.shops.component'
import { UserShopsModalComponent } from './details/user-shops/users.shops.modal.component'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { PaymentModalComponent } from './create-payment-modal/payment.modal.component';
import { SmartadminFormsModule } from '../shared/forms/smartadmin-forms.module'

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
        TabsModule,
        SmartadminInputModule,
        SmartadminFormsModule,
        PaginationModule,
    ],
    declarations: [
        UsersComponent,
        UsersDetailsComponent,
        UserEditComponent,
        UserInfoComponent,
        UserShopsComponent,
        UserShopsModalComponent,
        PaymentModalComponent
    ],
})
export class UsersModule {}
