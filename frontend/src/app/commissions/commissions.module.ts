import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { routing } from './commissions.routing'
import { SmartadminModule } from '../shared/smartadmin.module'
import { CommissionsComponent } from './commissions.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { TextMaskModule } from 'angular2-text-mask'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { CommissionsDetailsModalComponent } from './details/commissions.details.modal.component';
import { ModalModule } from 'ngx-bootstrap';

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
        PaginationModule,
    ],
    declarations: [CommissionsComponent, CommissionsDetailsModalComponent],
})
export class CommissionsModule {}
