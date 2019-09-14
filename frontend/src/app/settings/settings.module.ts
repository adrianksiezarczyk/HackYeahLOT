import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './settings.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { SettingsComponent } from './settings.component'
import { ErrorBoxModule } from 'app/shared/ui/error-box/error.box.module'
import { LoaderModule } from 'app/shared/ui/loader/loader.module'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module'
import { SmartadminFormsModule } from 'app/shared/forms/smartadmin-forms.module'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module'
import { DocumentDetailsComponent } from './details/document.details.component'
import { SettingsGroupFilter } from './settings.pipe'
import { PaymentSettingsModal } from './paymentModal/payment.settings.modal'
import { NotAvailableModalComponent } from './not-available-modal/notAvailable.modal.component'
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
        SmartadminFormsModule,
        SmartadminEditorsModule,
        ModalModule,
    ],
    declarations: [
        SettingsComponent,
        DocumentDetailsComponent,
        SettingsGroupFilter,
        PaymentSettingsModal,
        NotAvailableModalComponent,
    ],
})
export class SettingsModule {}
