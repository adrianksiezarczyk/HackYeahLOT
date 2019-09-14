import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SmartadminModule } from '../shared/smartadmin.module'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module'
import { LoaderModule } from '../shared/ui/loader/loader.module'
import { routing } from './static-page.routing'
import { ModalModule, TabsModule } from 'ngx-bootstrap'
import { SmartadminInputModule } from '../shared/forms/input/smartadmin-input.module'
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module'
import { StaticPageComponent } from './static-page.component';
import { StaticPageDetailsModalComponent } from './details/static-page.details.modal.component';
import { SmartadminFormsModule } from '../shared/forms/smartadmin-forms.module';
import { SmartadminEditorsModule } from '../shared/forms/editors/smartadmin-editors.module';

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
        SmartadminInputModule,
        SmartadminFormsModule,
        SmartadminEditorsModule,
        PaginationModule,
        TabsModule,
    ],
    declarations: [StaticPageComponent, StaticPageDetailsModalComponent],
})
export class StaticPageModule {}
