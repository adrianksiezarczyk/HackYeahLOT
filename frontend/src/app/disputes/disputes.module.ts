import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './disputes.routing';
import { SmartadminModule } from "../shared/smartadmin.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SmartadminInputModule } from 'app/shared/forms/input/smartadmin-input.module';
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module';
import { LoaderModule } from '../shared/ui/loader/loader.module';
import { DisputesComponent } from './disputes.component';
import { PaginationModule } from 'app/shared/ui/pagination/pagination.module';

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
    PaginationModule
  ],
  declarations: [DisputesComponent]
})
export class DisputesModule { }
