import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './emails.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { EmailsComponent } from './emails.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { EmailDetailsComponent } from './details/email.details.component'
import { ModalModule } from 'ngx-bootstrap'
import { SmartadminEditorsModule } from 'app/shared/forms/editors/smartadmin-editors.module';
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module';

@NgModule({
    imports: [
        CommonModule,
        routing,
        SmartadminModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorBoxModule,
        ModalModule,
        LoaderModule,
        SmartadminEditorsModule,
        SmartadminInputModule

    ],
    declarations: [EmailsComponent, EmailDetailsComponent],
})
export class EmailsModule {}
