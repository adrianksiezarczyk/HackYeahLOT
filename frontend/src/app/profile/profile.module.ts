import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './profile.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { ProfileComponent } from './profile.component'
import { ErrorBoxModule } from 'app/shared/ui/error-box/error.box.module'
import { LoaderModule } from 'app/shared/ui/loader/loader.module'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module'
import { SmartadminFormsModule } from 'app/shared/forms/smartadmin-forms.module'
import { TabsModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { PaymentModule } from 'app/payment/payment.module'

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        ReactiveFormsModule,
        ErrorBoxModule,
        LoaderModule,
        SmartadminModule,
        SmartadminInputModule,
        FormsModule,
        TabsModule,
        ModalModule,
        SmartadminFormsModule,
        SmartadminEditorsModule,
        BsDropdownModule,
        PaymentModule,
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule {}
