import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorBoxComponent } from './error.box.component';
import { I18nModule } from '../../i18n/i18n.module'

@NgModule({
    imports: [
        CommonModule,
        I18nModule
    ],
    declarations: [ErrorBoxComponent],
    exports: [ErrorBoxComponent],
})
export class ErrorBoxModule { }
