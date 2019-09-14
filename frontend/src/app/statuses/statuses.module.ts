import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './statuses.routing';
import { SmartadminModule } from "../shared/smartadmin.module";
import { StatusesComponent } from "./statuses.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxModule } from '../shared/ui/error-box/error.box.module';
import { LoaderModule } from '../shared/ui/loader/loader.module';
import { StatusDetailsModalComponent } from './details/status.details.modal.component';
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
    LoaderModule
  ],
  declarations: [StatusesComponent,StatusDetailsModalComponent]
})
export class StatusesModule { }
